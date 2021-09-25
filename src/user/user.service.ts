import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma, User } from "@prisma/client";
import { NewUser, UpdateUser } from "src/gql/graphql";
import { hash } from "bcryptjs";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

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
		console.log(user)
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

	// delete a user
	async deleteUser(id: string): Promise<User| null> {
		//const res = this.user(id);
		//console.log(res.then(function(result)));
		console.log(this.user(id));
		return this.user(id);
		/*
		console.log(res);
		if( res == null){
			return `The user with ${id}, does not exit`;
			//return new Error(`The user with ${id}, does not exit` );
		}
		return "ste";
		
		return this.prisma.user.delete({
			where: {
				id,
			}
		});*/
	}
}
