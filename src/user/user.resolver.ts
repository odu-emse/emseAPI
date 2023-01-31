import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import {
	UpdateUser,
	SocialInput,
	UserFields,
	SocialFields,
	User
} from "gql/graphql";
import { UserService } from "./user.service";

@Resolver("User")
// @UseGuards(AuthGuard)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	// Get users by params in input
	@Query("user")
	async user(@Args("input") params: UserFields) {
		const account = await this.userService.usersByParam(params);
		if (!account) return new Error("User not found");
		return account;
	}

	@Query("socials")
	async socials() {
		return await this.userService.socials();
	}

	@Query("social")
	async social(@Args("id") id: string) {
		return await this.userService.social(id);
	}

	@Query("socialsByParam")
	async socialsByParam(@Args("input") params: SocialFields) {
		return await this.userService.socialsByParam(params);
	}

	@Query("instructorProfile")
	async instructorProfile(@Args("id") id: string) {
		const usr = await this.user({ id });
		if (usr instanceof Error) return new Error("User not found");
		else return await this.userService.instructorProfile(usr[0].id);
	}

	@Mutation("updateUser")
	async update(@Args("input") args: UpdateUser) {
		return await this.userService.updateUser(args);
	}

	@Mutation("deleteUser")
	async delete(@Args("id") args: string) {
		return this.userService.deleteUser(args);
	}

	@Mutation("addSocial")
	async addSocial(
		@Args("userId") user: string,
		@Args("input") input: SocialInput
	) {
		return await this.userService.addSocial(user, input);
	}

	@Mutation("updateSocial")
	async updateSocial(
		@Args("id") id: string,
		@Args("input") input: SocialInput
	) {
		return await this.userService.updateSocial(id, input);
	}

	@Mutation("updateUserSocial")
	async updateUserSocial(
		@Args("userId") user: string,
		@Args("input") input: SocialInput
	) {
		return await this.userService.updateUserSocial(user, input);
	}

	@Mutation("deleteSocial")
	async deleteSocial(@Args("id") id: string) {
		return await this.userService.deleteSocial(id);
	}

	@Mutation("deleteUserSocial")
	async deleteUserSocial(@Args("userId") user: string) {
		return await this.userService.deleteUserSocial(user);
	}
}
