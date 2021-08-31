import {
	Resolver,
	Query,
	ResolveField,
	Parent,
	Mutation,
	Args,
} from "@nestjs/graphql";
import { PoSService } from "../pos/pos.service";
import { User, CreateUserInput } from "./user.schema";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
	constructor(
		private userService: UserService,
		private planService: PoSService
	) {}

	@Query(() => [User])
	async users() {
		return this.userService.findMany();
	}

	@Mutation(() => User)
	async createUser(@Args("input") input: CreateUserInput) {
		return this.userService.createUser(input);
	}

	// @ResolveField()
	// async plans(@Parent() parent: User) {
	// 	return this.planService.findByStudent(parent._id);
	// }
}
