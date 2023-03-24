import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import type { User, Social } from "@prisma/client";
import type {
	UpdateUser,
	SocialInput,
	InstructorProfile,
	Error,
	UserFields,
	SocialFields
} from "@/types/graphql";
import moment from "moment";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {
		this.prisma = prisma;
	}

	private includeUser = Prisma.validator<Prisma.UserInclude>()({
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
		instructorProfile: true,
		social: true
	});

	/**
	 * Get users by params in input. If `openID` or `id` fields are set in the input, the returned user is guaranteed to be unique. If no params are provided, all users are returned.
	 *
	 */
	async usersByParam(input: UserFields) {
		const {
			id,
			openID,
			email,
			picURL,
			createdAt,
			firstName,
			lastName,
			middleName,
			isAdmin,
			isActive,
			dob,
			social,
			plan,
			feedback,
			assignmentGraded,
			instructorProfile,
			biography,
			phoneNumber
		} = input;

		const where = Prisma.validator<Prisma.UserWhereInput>()({
			...(firstName && {
				firstName: {
					contains: firstName
				}
			}),
			...(lastName && {
				lastName: {
					contains: lastName
				}
			}),
			...(middleName && {
				middleName: {
					contains: middleName
				}
			}),
			...(email && {
				email: {
					contains: email
				}
			}),
			...(isAdmin && { isAdmin }),
			...(isActive && { isActive }),
			...(dob && { dob }),
			...(picURL && { picURL }),
			...(createdAt && { createdAt }),
			...(id && { id }),
			...(openID && { openID }),
			...(social && {
				social: {
					id: social
				}
			}),
			...(plan && {
				plan: {
					id: plan
				}
			}),
			...(feedback && {
				feedback: {
					some: {
						id: feedback
					}
				}
			}),
			...(assignmentGraded && {
				assignmentGraded: {
					some: {
						id: assignmentGraded
					}
				}
			}),
			...(instructorProfile && {
				instructorProfile: {
					id: instructorProfile
				}
			}),
			...(biography && { biography }),
			...(phoneNumber && { phoneNumber })
		});

		let result:
			| Array<
					Prisma.UserGetPayload<{
						include: Prisma.UserInclude;
					}>
			  >
			| Error;

		//find a unique user
		//returns a single user
		if (id || openID) {
			const unique = Prisma.validator<Prisma.UserWhereUniqueInput>()({
				...(id && { id }),
				...(openID && { openID })
			});
			const res = await this.prisma.user.findUnique({
				where: unique,
				include: this.includeUser
			});
			if (!res) return new Error("User not found");
			else result = [res];
		}

		//find many users by scalar fields
		//returns an array of users
		else {
			const res = await this.prisma.user.findMany({
				where,
				include: this.includeUser
			});
			if (!res) return new Error("User not found");
			result = res;
		}

		return result;
	}

	/// Get all Social Records
	async socials() {
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

	async socialsByParam(input: SocialFields): Promise<Social[] | null> {
		const { id, twitter, github, linkedin, facebook, portfolio, account } =
			input;

		const payload = {
			...(id && { id }),
			...(twitter && { twitter }),
			...(github && { github }),
			...(linkedin && { linkedin }),
			...(facebook && { facebook }),
			...(portfolio && { portfolio })
		};

		payload["accountId"] = account ? account : undefined;

		const where = Prisma.validator<Prisma.SocialWhereInput>()({
			...payload
		});

		return await this.prisma.social.findMany({
			where,
			include: {
				account: true
			}
		});
	}

	/// Get a specific Instructor's profile by user ID
	async instructorProfile(id: string) {
		return await this.prisma.instructorProfile.findUnique({
			where: {
				accountID: id
			},
			include: {
				account: true
			}
		});
	}

	// Update a user
	async updateUser(
		params: UpdateUser
	): Promise<User & { instructorProfile: InstructorProfile | null }> {
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
			instructorProfile,
			biography,
			phoneNumber
		} = params;

		const res = await this.prisma.user.count({
			where: {
				openID
			}
		});

		if (res === 0) {
			throw new Error(`The user with ${openID}, does not exist`);
		}

		if (instructorProfile && id !== null) {
			try {
				await this.prisma.instructorProfile.update({
					where: {
						accountID: id
					},
					data: {
						...instructorProfile
					}
				});
			} catch (error: any) {
				throw new Error(error.message);
			}
		}

		if (!moment(dob).isValid()) {
			throw new Error("Invalid date of birth");
		}

		const update = Prisma.validator<Prisma.UserUpdateInput>()({
			...(email && { email }),
			...(picURL && { picURL }),
			...(firstName && { firstName }),
			...(lastName && { lastName }),
			...(middleName && { middleName }),
			...(biography && { biography }),
			...(phoneNumber && { phoneNumber }),
			...(dob && {
				dob: dob.toISOString()
			}),
			...(isAdmin && { isAdmin }),
			...(isActive && { isActive })
		});

		return await this.prisma.user.update({
			where: {
				openID
			},
			data: update,
			include: this.includeUser
		});
	}

	// delete a user by id
	async deleteUser(id: string): Promise<User | Error> {
		const res = await this.usersByParam({
			id
		});

		if (res === null) {
			return new Error(`The user with ${id}, does not exist`);
		} else {
			return this.prisma.user.delete({
				where: {
					id
				}
			});
		}
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
		const update = Prisma.validator<Prisma.SocialUpdateArgs>()({
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

		return this.prisma.social.update(update);
	}

	/// Update a social record by the owner (user) id
	async updateUserSocial(userId: string, input: SocialInput) {
		const update = Prisma.validator<Prisma.SocialUpdateManyArgs>()({
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

		return this.prisma.social.updateMany(update);
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
