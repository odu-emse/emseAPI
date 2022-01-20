import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma, User, Social } from "@prisma/client";
import { NewUser, UpdateUser, SocialInput } from "src/gql/graphql";
import { hash } from "bcryptjs";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	// Get all users
	async users(): Promise<User[]> {
		return this.prisma.user.findMany({
			include: {
				feedback: true,
				plan: true,
				assignmentGraded: true
			}
		});
	}

	// Get a single user based on ID
	async user(id: string): Promise<User | null> {
		const user = this.prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				feedback: true,
				plan: true,
				assignmentGraded: true
			}
		});
		
		return user;
	}


	/// Get all Social Records
	async socials(): Promise<Social[]> {
		return this.prisma.social.findMany({
			include: {
				account: true
			}
		})
	}

	/// Get a specific Social Record by ID
	async social(id: string): Promise<Social | null> {
		return this.prisma.social.findUnique({
			where: {
				id
			},
			include: {
				account: true
			}
		})
	}

	// Create a user
	async registerUser(data: Prisma.UserCreateInput): Promise<User | Error> {
		const {
			id,
			email,
			firstName,
			lastName,
			middleName,
			// prefix,
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
			// prefix,
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
			isAdmin,
			isActive
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
				...(isAdmin && {isAdmin}),
				...(isActive && {isActive})
			},
		});
	}

	// delete a user
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

	/// Create a social record for a User
	async addSocial(userId: string, input: SocialInput): Promise<Social> {
		return this.prisma.social.create({
			data: {
				twitter: input.twitter,
				github: input.github,
				linkedin: input.linkedin,
				facebook: input.facebook,
				portfolio: input.portfolio,
				accountID: userId
			}
		})
	}

	/// Update a social by document ID
	async updateSocial(id: string, input: SocialInput) {
		return this.prisma.social.update({
			where: {
				id
			},
			data: {
				twitter: input.twitter,
				github: input.github,
				linkedin: input.linkedin,
				facebook: input.facebook,
				portfolio: input.portfolio
			},
			include: {
				account: true
			}
		});
	}

	/// Update a social record by the owner (user) id
	async updateUserSocial(userId: string, input: SocialInput) {
		return this.prisma.social.updateMany({
			where: {
				accountID: userId
			},
			data: {
				twitter: input.twitter,
				github: input.github,
				linkedin: input.linkedin,
				facebook: input.facebook,
				portfolio: input.portfolio
			}
		})
	}

	/// Delete a social record by document ID
	async deleteSocial(id: string) {
		return this.prisma.social.delete({
			where: {
				id
			}
		})
	}

	/// Delete a social record by owner(user) id
	async deleteUserSocial(userId: string) {
		return this.prisma.social.deleteMany({
			where: {
				accountID: userId
			}
		})
	}
}
