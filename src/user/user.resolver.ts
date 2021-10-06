import { Resolver, Query, Args, Mutation, ResolveField } from "@nestjs/graphql";
import { NewUser, User, UpdateUser, LoginUser } from "gql/graphql";
import { UserService } from "./user.service";

@Resolver("User")
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	// Get all users
	@Query("users")
	async users() {
		try {
			const res = await this.userService.users();
			return res;
		} catch (error) {
			if (error)
				throw new Error(
					"An error occurred while trying to execute your query"
				);
		}
	}

	// Get a single user
	@Query("user")
	async user(@Args("id") args: string) {
		try {
			const res = await this.userService.user(args);
			return res;
		} catch (error) {
			if (error)
				throw new Error(
					"An error occurred while trying to execute your query"
				);
		}
	}
	//login user
	@Query("login")
	async login(@Args("input") args: LoginUser){
		try {
			const res = await this.userService.loginUser(args);
			return res
		} catch (error) {
			if(error)
				console.log(error)
				throw new Error(
					"An error occured while trying to executre your query"
				);
		}
	}

	@Mutation("createUser")
	async createUser(@Args("input") args: NewUser) {
		const res = await this.userService.registerUser(args);
		return res;
	}

	@Mutation("updateUser")
	async update(@Args("input") args: UpdateUser) {
		return this.userService.updateUser(args);
	}

	@Mutation("deleteUser")
	async delete(@Args("id") args: string) {
		return this.userService.deleteUser(args);
	}
}
