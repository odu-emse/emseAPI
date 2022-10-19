import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import type { User, Social,  } from "@prisma/client";
import type {
	UpdateUser,
	SocialInput,
	InstructorProfile,
	Error,
	NewUser
} from 'gql/graphql';
import { JwtService } from "@nestjs/jwt";
import moment from "moment";

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private readonly jwtService: JwtService
	) {}

	// Get all users
	async users(): Promise<User[]> {
		return this.prisma.user.findMany({
			include: {
				feedback: true,
				plan: {
					include: {
						modules: {
							include: {
								module: true
							}
						}
					}
				},
				assignmentGraded: true,
				instructorProfile: true
			}
		});
	}

	// Get a single user based on ID
	async user(id: string): Promise<User | null> {
		const user = this.prisma.user.findFirst({
			where: {
				openID: id
			}, 
			include: {
				feedback: true,
				plan: {
					include: {
						modules: {
							include: {
								module: true
							}
						}
					}
				},
				assignmentGraded: true,
				instructorProfile: true
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
		});
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
		});
	}

	/// Get a specific Instructor's profile by user ID
	async instructorProfile(id: string): Promise<InstructorProfile | null> {
		
		return await this.prisma.instructorProfile.findUnique({
			where: {
				accountID: id
			},
		});
	}


	// Update a user
	async updateUser(params: UpdateUser): Promise<User | Error> {
		try {
			const {
				id,
				openID,
				email,
				picURL,
				firstName,
				lastName,
				middleName,
				dob,
				isAdmin,
				isActive,
				instructorProfile
			} = params;


			const res = await this.prisma.user.count({
				where: {
					openID
				}
			});

			if (res == 0) {
				throw new Error(`The user with ${openID}, does not exist`);
			}

			if (instructorProfile !== null || instructorProfile !== undefined) {
				try {
					await this.prisma.instructorProfile.update({
						where: {
							accountID: id
						},
						data: {
							...instructorProfile
						}
					});
				} catch (error:any) {
					return new Error(error.message);
				}
			}

			if (!moment(dob).isValid()) {
				return new Error("Invalid date of birth");
			}

			return await this.prisma.user.update({
				where: {
					openID
				},
				data: {
					...(email && { email }),
					...(picURL && { picURL }),
					...(firstName && { firstName }),
					...(lastName && { lastName }),
					...(middleName && { middleName }),
					...(dob && {
						dob: dob.toISOString()
					}),
					...(isAdmin && { isAdmin }),
					...(isActive && { isActive })
				},
				include: {
					instructorProfile: true
				}
			});
		} catch (error:any) {
			return new Error(error);
		}
	}

	// delete a user by id
	async deleteUser(id: string): Promise<User | Error> {
		const res = await this.user(id).then(data => {
			return data;
		});

		if (res === null) {
			return new Error(`The user with ${id}, does not exist`);
		}

		return this.prisma.user.delete({
			where: {
				id
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
		});
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
		});
	}

	/// Delete a social record by document ID
	async deleteSocial(id: string) {
		return this.prisma.social.delete({
			where: {
				id
			}
		});
	}

	/// Delete a social record by owner(user) id
	async deleteUserSocial(userId: string) {
		return this.prisma.social.deleteMany({
			where: {
				accountID: userId
			}
		});
	}
}
