import { NewModule, UpdateModule } from "./../gql/graphql";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProgramService } from "./program.service";

@Resolver()
export class ProgramResolver {
	constructor(private readonly programService: ProgramService) {}

	@Query("modules")
	async modules() {
		try {
			const res = this.programService.modules();
			return res;
		} catch (error) {
			throw new Error(
				"An error occurred while trying to execute your query"
			);
		}
	}

	// Get a single module based on module's ID
	@Query("module")
	async module(@Args("id") args: string) {
		try {
			const res = await this.programService.module(args);
			return res;
		} catch (error) {
			if (error)
				throw new Error(
					"An error occurred while trying to execute your query"
				);
		}
	}

	// Add a module to the db with all required initial fields
	@Mutation("addModule")
	async create(@Args("input") args: NewModule) { 
		const res = await this.programService.addModule(args);
		return res;
	}

	// Update a single module's data in the db
	@Mutation("updateModule")
	async update(@Args("input") args: UpdateModule) {
		const res = await this.programService.updateModule(args);
		return res;
	}

	// Delete a module from db
	@Mutation("deleteModule")
	async delete(@Args("id") args: string) {
		const res = await this.programService.deleteModule(args);
		return res;
	}
}