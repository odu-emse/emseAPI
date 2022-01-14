import { AssignmentInput, CourseInput, ModuleFeedbackInput, ModuleFeedbackUpdate, NewAssignment, NewModule, UpdateModule } from "./../gql/graphql";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProgramService } from "./program.service";
import { Prisma } from "@prisma/client";
import { query } from "express";

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

	// Get multiple Courses
	@Query("courses")
	async courses() {
		try {
			const res = this.programService.courses();
			return res;
		} catch (error) {
			throw new Error("An error occurred while trying to execute your query");
		}
	}

	// Get an assignment by its id
	@Query("assignment")
	async assignment(@Args("id") args: string) {
		try {
			const res = await this.programService.assignment(args);
			return res;
		} catch (error) {
			throw new Error("An error occurred while trying to execute your query");
		}
	}

	// Get multiple assignments from the db
	@Query("assignments")
	async assignments() {
		try {
			const res = this.programService.assignments();
			return res;
		} catch (error) {
			throw new Error("An error occurred while trying to execute your query");
		}
	}

	@Query("moduleInCourses")
	async moduleInCourses() {
		try {
			const res = await this.programService.moduleInCourses();
			return res;
		} catch (error) {
			throw new Error("Could not fetch moduleInCourses");
		}
	}

	@Query("moduleFeedbacks")
	async moduleFeedbacks() {
		try {
			const res = await this.programService.moduleFeedbacks();
			return res;
		} catch (error) {
			throw new Error("Could not fetch ModuleFeedback")
		}
	}

	@Query("moduleFeedback")
	async moduleFeedback(@Args("id") id: string) {
		try {
			const res = await this.programService.moduleFeedback(id);
			return res;
		} catch (error) {
			throw new Error("Could not fetch ModuleFeedback with id: " + id);
		}
	}

	// Mutations

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

	// // Add a Course to the db with a course name
	@Mutation("addCourse")
	async createCourse(@Args("module") id: string, @Args("input") args: CourseInput) {
		const res = await this.programService.addCourse(id, args);
		return res;
	}

	// Update a course name
	@Mutation("updateCourse")
	async updateCourse(@Args("id") id: string, @Args("input") args: CourseInput) {
		const res = await this.programService.updateCourse(id, args);
		return res;
	}

	// Delete a course based on ID
	@Mutation("deleteCourse")
	async deleteCourse(@Args("id") args: string) {
		const res = await this.programService.deleteCourse(args);
		return res;
	}

	// // Delete an assignment from DB
	@Mutation("deleteAssignment")
	async deleteAssignment(@Args("module") args: string, @Args("id") id: string) {
		const res = await this.programService.deleteAssignment(args, id);
		return res;
	}

	// Update an assignment in the db
	@Mutation("updateAssignment")
	async updateAssignment(@Args("id") id: string, @Args("input") args: AssignmentInput) {
		const res = await this.programService.updateAssignment(id, args);
		return res;
	}

	/// Add module feedback
	@Mutation("addModuleFeedback")
	async addModuleFeedback(@Args("moduleId") moduleId: string, @Args("userId") userId: string, @Args("input") data: Prisma.ModuleFeedbackCreateInput) {
		try {
			const res = await this.programService.addModuleFeedback(moduleId, userId, data);
			return res;
		} catch(error) {
			throw new Error("Could not add ModuleFeedback");
		}

	}

	/// Update a modulefeedback
	@Mutation("updateModuleFeedback")
	async updateModuleFeedback(@Args("id") id: string, @Args("input") data: ModuleFeedbackUpdate) {
		try {
			const res = await this.programService.updateModuleFeedback(id, data);
			return res;
		} catch (error) {
			throw new Error("Could not update ModuleFeedback with id: " + id);
		}
	}

	/// Delete a ModuleFeedback
	@Mutation("deleteModuleFeedback")
	async deleteModuleFeedback(@Args("id") id: string) {
		try {
			const res = await this.programService.deleteModuleFeedback(id);
			return res;
		} catch (error) {
			throw new Error("Could not delete ModuleFeedback with id: " + id);
		}
	}
}
