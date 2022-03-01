import { Resolver, Query, Args, Mutation, ResolveField } from "@nestjs/graphql";
import { NewUser, User, UpdateUser, LoginUser, SocialInput} from "gql/graphql";
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

	@Query("socials")
	async socials() {
		try {
			const res = await this.userService.socials();
			return res;
		} catch (error) {
			throw new Error("Could not fetch Socials");
		}
	}

	@Query("social")
	async social(@Args("id") id: string) {
		try {
			const res = await this.userService.social(id);
			return res;
		} catch (error) {
			throw new Error("Could not fetch social with id: " + id);
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

	@Mutation("addSocial")
	async addSocial(@Args("userId") user: string, @Args("input") input: SocialInput) {
		try {
			const res = await this.userService.addSocial(user, input);
			return res;
		} catch (error) {
			throw new Error("Could not add Social");
		}
	}

	@Mutation("updateSocial")
	async updateSocial(@Args("id") id: string, @Args("input") input: SocialInput) {
		try {
			const res = await this.userService.updateSocial(id, input);
		} catch(error) {
			throw new Error("Could not update Social with document id: " + id);
		}
	}

	@Mutation("updateUserSocial")
	async updateUserSocial(@Args("userId") user: string, @Args("input") input: SocialInput) {
		try {
			const res = await this.userService.updateUserSocial(user, input);
			return res;
		} catch (error) {
			throw new Error("Could not update social with user id: " + user);
		}
	}

	@Mutation("deleteSocial") 
	async deleteSocial(@Args("id") id: string) {
		try { 
			const res = await this.userService.deleteSocial(id);
			return res;
		} catch(error) {
			throw new Error("Could not delete social with document id: " + id);
		}
	}

	@Mutation("deleteUserSocial")
	async deleteUserSocial(@Args("userId") user: string) {
		try {
			const res = await this.userService.deleteUserSocial(user);
			return res;
		} catch (error) {
			throw new Error("Could not delete Socail with user id: " + user);
		}
	}
}
