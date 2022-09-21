import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation, GraphQLExecutionContext, Context } from "@nestjs/graphql";
import { AuthGuard } from "../auth.guard";
import { NewUser, UpdateUser, LoginUser, SocialInput } from "gql/graphql";
import { GraphQLWrappingType } from "graphql";
import { UserService } from "./user.service";

@Resolver("User")
@UseGuards(AuthGuard)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	// Get all users
	@Query("users")
	async users() {
		return await this.userService.users();
	}

	// Get a single user
	@Query("user")
	async user(@Args("id") args: string) {
		return await this.userService.user(args);
	}
	//login user
	/*@Query("login")
	async login(@Args("input") args: LoginUser) {
		return await this.userService.loginUser(args);
	}*/

	@Query("socials")
	async socials() {
		return await this.userService.socials();
	}

	@Query("social")
	async social(@Args("id") id: string) {
		return await this.userService.social(id);
	}

	@Query("instructorProfile")
	async instructorProfile(@Args("id") id: string) {
		const usr = await this.userService.user(id);
		return await this.userService.instructorProfile(String(usr!.id));
	}

	@Mutation("createUser")
	async createUser(@Args("input") args: NewUser) {
		return await this.userService.registerUser(args);
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
