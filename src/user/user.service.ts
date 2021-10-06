import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma, User } from "@prisma/client";
import { NewUser, UpdateUser, LoginUser, Token} from "gql/graphql";
import { hash,compare } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private readonly jwtService: JwtService) {}

	// Get all users
	async users(): Promise<User[]> {
		return this.prisma.user.findMany({});
	}

	// Get a single user based on ID
	async user(id: string): Promise<User | null> {
		const user = this.prisma.user.findUnique({
			where: {
				id,
			},
		});
		
		return user;
	}
	
	// Create a user
	async registerUser(data: Prisma.UserCreateInput): Promise<User | Error> {
		const {
			id,
			email,
			firstName,
			lastName,
			middleName,
			prefix,
			password,
			passwordConf,
		} = data;

		const safeEmail = email.toLowerCase();
		//find out if there is a duplicate user
		const get = await this.prisma.user.findUnique({
			where: {
				email: safeEmail,
			},
		});

		

		if (password !== passwordConf) {
			throw new Error("Passwords provided are not matching...");
		}

		
		const hashedPassword = await hash(password, 10);
		const hashedPasswordConf = hashedPassword;

		const payload = {
			id,
			email: safeEmail,
			firstName,
			lastName,
			middleName,
			prefix,
			password: hashedPassword,
			passwordConf: hashedPasswordConf,
		};
		
		///Avoids duplicate value(email) if the exist already
		if (get === null){
			const res = await this.prisma.user.create({
				data: payload,
			});
			
			return res;
		}
		
		return new Error("User has an account already.");
	}

	// Update a user
	async updateUser(params: UpdateUser): Promise<User> {
		const {
			id,
			email,
			firstName,
			lastName,
			middleName,
			prefix,
			password,
			passwordConf,
		} = params;
		//check if passwords provided match
		//check if password from db is same as changing it to
		return this.prisma.user.update({
			where: {
				id,
			},
			data: {
				...(email && { email }),
				...(firstName && { firstName }),
				...(lastName && { lastName }),
				...(middleName && { middleName }),
				...(prefix && { prefix }),
				...(password && { password }),
				...(passwordConf && { passwordConf }),
			},
		});
	}

	// delete a user by id
	async deleteUser(id: string): Promise<User | Error> {

		const res = await this.user(id).then((data)=> {
			return data
		})
		
		if( res === null){
			return new Error (`The user with ${id}, does not exist`);
		}

		return this.prisma.user.delete({
			where:{
				id,
			}
		});
	}

	async loginUser(params: LoginUser ): Promise< Token | null| Error>{
		console.log(params)
		const { email,
			password,
		} = params;
		const safeEmail = email.toLowerCase();

		const res = await this.prisma.user.findUnique({
			where:{
				email:safeEmail,
			},
			
		});
		
		//Check if user exits
		if(res!==null){

			const val = await compare(password, res.password)
			if(val){
				// Call token function to genereate login token per id
				const { 
					id,
				}= res 
				const usrauth_token =  await this.jwtService.sign({id})
				const token =  {
					id: res.id,
					token: usrauth_token,	
				}
				return token
			}else{
				return new Error (`Password is incorrect please try again.`)
			}
			

		}

		return new Error (`This ${email}, does not exist`) ;
	}
}
