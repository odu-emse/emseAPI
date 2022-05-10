import {
	AssignmentInput,
	CourseInput,
	ModuleEnrollmentInput,
	ModuleFeedbackInput,
	ModuleFeedbackUpdate,
	NewAssignment,
	NewAssignmentResult,
	NewModule,
	UpdateModule
} from "gql/graphql";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProgramService } from "./program.service";
import { Prisma } from "@prisma/client";

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
			throw new Error(
				"An error occurred while trying to execute your query"
			);
		}
	}

	// Get an assignment by its id
	@Query("assignment")
	async assignment(@Args("id") args: string) {
		try {
			const res = await this.programService.assignment(args);
			return res;
		} catch (error) {
			throw new Error(
				"An error occurred while trying to execute your query"
			);
		}
	}

	// Get multiple assignments from the db
	@Query("assignments")
	async assignments() {
		try {
			const res = this.programService.assignments();
			return res;
		} catch (error) {
			throw new Error(
				"An error occurred while trying to execute your query"
			);
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
			throw new Error("Could not fetch ModuleFeedback");
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

	@Query("assignmentResults")
	async assignmentResults() {
		try {
			const res = await this.programService.assignmentResults();
			return res;
		} catch (error) {
			throw new Error("Could not fetch assignmentResults");
		}
	}

	@Query("assignmentResult")
	async assignmentResult(@Args("id") id: string) {
		try {
			const res = await this.programService.assignmentResult(id);
			return res;
		} catch (error) {
			throw new Error("Could not fetch assignment result with id: " + id);
		}
	}

	@Query("moduleEnrollments")
	async moduleEnrollments() {
		try {
			const res = await this.programService.moduleEnrollments();
			return res;
		} catch (error) {
			throw new Error("Could not fetch moduleEnrollments");
		}
	}

	@Query("moduleEnrollment")
	async moduleEnrollment(@Args("id") id: string) {
		try {
			const res = await this.programService.moduleEnrollment(id);
			return res;
		} catch (error) {
			throw new Error("Could not fetch moduleEnrollment with id: " + id);
		}
	}

	@Query("courseEnrollments")
	async courseEnrollments() {
		try {
			const res = await this.programService.courseEnrollments();
			return res;
		} catch (error) {
			throw new Error("Could not fetch CourseEnrollments");
		}
	}

	@Query("courseEnrollment")
	async courseEnrollment(@Args("id") id: string) {
		try {
			const res = await this.programService.courseEnrollment(id);
			return res;
		} catch (error) {
			throw new Error("Could not fetch CourseEnrollment with id: " + id);
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
	async createCourse(@Args("input") args: CourseInput) {
		const res = await this.programService.addCourse(args);
		return res;
	}

	// Update a course name
	@Mutation("updateCourse")
	async updateCourse(
		@Args("id") id: string,
		@Args("input") args: CourseInput
	) {
		const res = await this.programService.updateCourse(id, args);
		return res;
	}

	// Delete a course based on ID
	@Mutation("deleteCourse")
	async deleteCourse(@Args("id") args: string) {
		const res = await this.programService.deleteCourse(args);
		return res;
	}

	// Add an assignment
	@Mutation("addAssignment")
	async addAssignment(@Args("input") input: NewAssignment) {
		try {
			const res = await this.programService.addAssignment(input);
			return res;
		} catch (error) {
			throw new Error("Failed to create a new assignment");
		}
	}

	// // Delete an assignment from DB
	@Mutation("deleteAssignment")
	async deleteAssignment(
		@Args("module") args: string,
		@Args("id") id: string
	) {
		const res = await this.programService.deleteAssignment(args, id);
		return res;
	}

	// Update an assignment in the db
	@Mutation("updateAssignment")
	async updateAssignment(
		@Args("id") id: string,
		@Args("input") args: AssignmentInput
	) {
		const res = await this.programService.updateAssignment(id, args);
		return res;
	}

	/// Add module feedback
	@Mutation("addModuleFeedback")
	async addModuleFeedback(
		@Args("moduleId") moduleId: string,
		@Args("userId") userId: string,
		@Args("input") data: Prisma.ModuleFeedbackCreateInput
	) {
		try {
			const res = await this.programService.addModuleFeedback(
				moduleId,
				userId,
				data
			);
			return res;
		} catch (error) {
			throw new Error("Could not add ModuleFeedback");
		}
	}

	/// Update a modulefeedback
	@Mutation("updateModuleFeedback")
	async updateModuleFeedback(
		@Args("id") id: string,
		@Args("input") data: ModuleFeedbackUpdate
	) {
		try {
			const res = await this.programService.updateModuleFeedback(
				id,
				data
			);
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

	@Mutation("addAssignmentResult")
	async addAssignmentResult(@Args("input") input: NewAssignmentResult) {
		try {
			const res = await this.programService.addAssignmentResult(input);
			return res;
		} catch (error) {
			throw new Error("Could not add assignmentResult");
		}
	}

	@Mutation("updateAssignmentResult")
	async updateAssignmentResult(
		@Args("id") id: string,
		@Args("result") result: number
	) {
		try {
			const res = await this.programService.updateAssignmentResult(
				id,
				result
			);
			return res;
		} catch (error) {
			throw new Error("Could not update AssignmentResult with id: " + id);
		}
	}

	@Mutation("deleteAssignmentResult")
	async deleteAssignmentResult(@Args("id") id: string) {
		try {
			const res = await this.programService.deleteAssignmentResult(id);
			return res;
		} catch (error) {
			throw new Error("Could not delete assignment with id: " + id);
		}
	}

	@Mutation("addModuleEnrollment")
	async addModuleEnrollment(@Args("input") input: ModuleEnrollmentInput) {
		try {
			const res = await this.programService.addModuleEnrollment(input);
			return res;
		} catch (error) {
			throw new Error("Could not add ModuleEnrollment");
		}
	}

	@Mutation("updateModuleEnrollment")
	async updateModuleEnrollment(
		@Args("id") id: string,
		@Args("input") input: ModuleEnrollmentInput
	) {
		try {
			const res = await this.programService.updateModuleEnrollment(
				id,
				input
			);
			return res;
		} catch (error) {
			throw new Error("Could not update ModuleEnrollment with id: " + id);
		}
	}

	@Mutation("deleteModuleEnrollment")
	async deleteModuleEnrollment(@Args("id") id: string) {
		try {
			const res = await this.programService.deleteModuleEnrollment(id);
			return res;
		} catch (error) {
			throw new Error("Could not delete ModuleEnrollment with id: " + id);
		}
	}

	@Mutation("addCourseEnrollment")
	async addCourseEnrollment(
		@Args("planId") plan: string,
		@Args("courseId") course: string
	) {
		try {
			const res = await this.programService.addCourseEnrollment(
				plan,
				course
			);
			return res;
		} catch (error) {
			throw new Error("Could not create new CourseEnrollment");
		}
	}

	@Mutation("updateCourseEnrollment")
	async updateCourseEnrollment(
		@Args("id") id: string,
		@Args("planId") plan: string,
		@Args("courseId") course: string
	) {
		try {
			const res = await this.programService.updateCourseEnrollment(
				id,
				plan,
				course
			);
			return res;
		} catch (error) {
			throw new Error("Could not update CourseEnrollment with id: " + id);
		}
	}

	@Mutation("deleteCourseEnrollment")
	async deleteCourseEnrollment(@Args("id") id: string) {
		try {
			const res = await this.programService.deleteCourseEnrollment(id);
			return res;
		} catch (error) {
			throw new Error("Could not delete CourseEnrollment with id: " + id);
		}
	}

	@Mutation("pairCourseModule")
	async pairCourseModule(
		@Args("courseId") courseId: string,
		@Args("moduleId") moduleId: string
	) {
		try {
			const res = await this.programService.pairCourseModule(
				courseId,
				moduleId
			);
			return res;
		} catch (error) {
			throw new Error(
				"Could not pair course " + courseId + " and module " + moduleId
			);
		}
	}

	@Mutation("unpairCourseModule")
	async unpairCourseModule(
		@Args("courseId") courseId: string,
		@Args("moduleId") moduleId: string
	) {
		try {
			const res = await this.programService.unpairCourseModule(
				courseId,
				moduleId
			);
			return res;
		} catch (error) {
			throw new Error(
				"Could not unlink course " +
					courseId +
					" and module " +
					moduleId
			);
		}
	}
}
