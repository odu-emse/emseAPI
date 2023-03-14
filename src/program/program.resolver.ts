import {
	AssignmentInput,
	CourseInput,
	ModuleEnrollmentInput,
	ModuleFeedbackUpdate,
	NewAssignment,
	NewAssignmentResult,
	UpdateModule,
	ModuleFields,
	CourseFields,
	AssignmentFields,
	ModFeedbackFields,
	AssignmentResFields,
	ContentFields,
	LessonFields,
	LessonInput,
	CreateCollectionArgs,
	CreateContentArgs,
	ModEnrollmentFields,
	NewModule,
	CollectionFields
} from "@/types/graphql";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProgramService } from "./program.service";
import { Prisma, UserRole } from "@prisma/client";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@/auth.guard";

@Resolver()
// @UseGuards(AuthGuard)
export class ProgramResolver {
	constructor(private readonly programService: ProgramService) {}

	// Get Module(s)
	@Query("module")
	async module(
		@Args("input") args: ModuleFields,
		@Args("memberRole") role?: UserRole
	) {
		const result = await this.programService.module(args);
		if (!result) {
			return new Error("Module not found");
		}
		if (!role) {
			return result;
		} else {
			return result.map((module) => {
				const thisModule = module;
				thisModule.members = module.members.filter(
					(value) => value.role === role
				);
				return thisModule;
			});
		}
	}

	// Get Course(s)
	@Query("course")
	async course(@Args("input") args: CourseFields) {
		return await this.programService.course(args);
	}

	@Query("assignment")
	async assignment(@Args("input") args: AssignmentFields) {
		return await this.programService.assignment(args);
	}

	@Query("moduleFeedback")
	async moduleFeedback(@Args("input") args: ModFeedbackFields) {
		return await this.programService.moduleFeedback(args);
	}

	@Query("assignmentResult")
	async assignmentResult(@Args("input") args: AssignmentResFields) {
		return await this.programService.assignmentResult(args);
	}

	@Query("moduleEnrollment")
	async moduleEnrollment(@Args("input") args: ModEnrollmentFields) {
		return await this.programService.moduleEnrollment(args);
	}

	@Query("collection")
	async collection(@Args("input") args: CollectionFields | null = null) {
		return await this.programService.collection(args);
	}

	@Query("content")
	async content(@Args("input") input: ContentFields) {
		return await this.programService.content(input);
	}

	@Query("lesson")
	async lesson(@Args("input") input: LessonFields) {
		return await this.programService.lesson(input);
	}

	// Mutations

	// Add a module to the db with all required initial fields
	@Mutation("addModule")
	async create(@Args("input") args: NewModule) {
		return await this.programService.addModule(args);
	}

	// Update a single module's data in the db
	@Mutation("updateModule")
	async update(@Args("input") args: UpdateModule) {
		return await this.programService.updateModule(args);
	}

	// Delete a module from db
	@Mutation("deleteModule")
	async delete(@Args("id") args: string) {
		return await this.programService.deleteModule(args);
	}

	// // Add a Course to the db with a course name
	@Mutation("addCourse")
	async createCourse(@Args("input") args: CourseInput) {
		return await this.programService.addCourse(args);
	}

	// Update a course name
	@Mutation("updateCourse")
	async updateCourse(@Args("id") id: string, @Args("input") args: CourseInput) {
		return await this.programService.updateCourse(id, args);
	}

	// Delete a course based on ID
	@Mutation("deleteCourse")
	async deleteCourse(@Args("id") args: string) {
		return await this.programService.deleteCourse(args);
	}

	// Add an assignment
	@Mutation("addAssignment")
	async addAssignment(@Args("input") input: NewAssignment) {
		return await this.programService.addAssignment(input);
	}

	// // Delete an assignment from DB
	@Mutation("deleteAssignment")
	async deleteAssignment(@Args("module") args: string, @Args("id") id: string) {
		return await this.programService.deleteAssignment(args, id);
	}

	// Update an assignment in the db
	@Mutation("updateAssignment")
	async updateAssignment(
		@Args("id") id: string,
		@Args("input") args: AssignmentInput
	) {
		return await this.programService.updateAssignment(id, args);
	}

	/// Add module feedback
	@Mutation("addModuleFeedback")
	async addModuleFeedback(
		@Args("moduleId") moduleId: string,
		@Args("userId") userId: string,
		@Args("input") data: Prisma.ModuleFeedbackCreateInput
	) {
		return await this.programService.addModuleFeedback(moduleId, userId, data);
	}

	/// Update a modulefeedback
	@Mutation("updateModuleFeedback")
	async updateModuleFeedback(
		@Args("id") id: string,
		@Args("input") data: ModuleFeedbackUpdate
	) {
		return await this.programService.updateModuleFeedback(id, data);
	}

	/// Delete a ModuleFeedback
	@Mutation("deleteModuleFeedback")
	async deleteModuleFeedback(@Args("id") id: string) {
		return await this.programService.deleteModuleFeedback(id);
	}

	@Mutation("addAssignmentResult")
	async addAssignmentResult(@Args("input") input: NewAssignmentResult) {
		return await this.programService.addAssignmentResult(input);
	}

	@Mutation("updateAssignmentResult")
	async updateAssignmentResult(
		@Args("id") id: string,
		@Args("result") result: number
	) {
		return await this.programService.updateAssignmentResult(id, result);
	}

	@Mutation("deleteAssignmentResult")
	async deleteAssignmentResult(@Args("id") id: string) {
		return await this.programService.deleteAssignmentResult(id);
	}

	@Mutation("addModuleEnrollment")
	async addModuleEnrollment(@Args("input") input: ModuleEnrollmentInput) {
		return await this.programService.addModuleEnrollment(input);
	}

	@Mutation("updateModuleEnrollment")
	async updateModuleEnrollment(
		@Args("id") id: string,
		@Args("input") input: ModuleEnrollmentInput
	) {
		return await this.programService.updateModuleEnrollment(id, input);
	}

	@Mutation("deleteModuleEnrollment")
	async deleteModuleEnrollment(@Args("id") id: string) {
		return await this.programService.deleteModuleEnrollment(id);
	}

	@Mutation("pairCourseModule")
	async pairCourseModule(
		@Args("courseId") courseId: string,
		@Args("moduleId") moduleId: string
	) {
		return await this.programService.pairCourseModule(courseId, moduleId);
	}

	@Mutation("unpairCourseModule")
	async unpairCourseModule(
		@Args("courseId") courseId: string,
		@Args("moduleId") moduleId: string
	) {
		return await this.programService.unpairCourseModule(courseId, moduleId);
	}

	@Mutation("createCollection")
	async createCollection(@Args("data") data: CreateCollectionArgs) {
		return await this.programService.createCollection(data);
	}

	@Mutation("updateCollection")
	async updateCollection(
		@Args("data") data: Prisma.CollectionUpdateInput,
		@Args("id") id: string
	) {
		return await this.programService.updateCollection(id, data);
	}

	@Mutation("createLesson")
	async createLesson(@Args("input") input: LessonInput) {
		return await this.programService.createLesson(input);
	}

	@Mutation("updateLesson")
	async updateLesson(@Args("input") input: LessonFields) {
		return await this.programService.updateLesson(input);
	}

	@Mutation("deleteLesson")
	async deleteLesson(@Args("id") id: string) {
		return await this.programService.deleteLesson(id);
	}

	@Mutation("createContent")
	async createContent(@Args("input") input: CreateContentArgs) {
		return await this.programService.createContent(input);
	}

	@Mutation("updateContent")
	/* Defined new argument inputArray below as an array of ContentFields inorder to check 
	whether any of the elements in content array has the primary attribute set as true */
	async updateContent(
		@Args("input") input: ContentFields,
		@Args("inputArray") inputArray: ContentFields[]
	) {
		/* Whenever user tries to update certain content's primary attribute in the front end, 
		that particular content's id is passed to the constant passedId defined below */
		const passedId = "";
		if (inputArray) {
			inputArray.map((item) => {
				item.primary = item.id === passedId;
			});
		}
		/* If the code implementation is as expected I will proceed to call the updatecontent method with the
		inputArray argument passed */
		return await this.programService.updateContent(input);
	}
	@Mutation("deleteContent")
	async deleteContent(@Args("contentID") contentID: string) {
		return await this.programService.deleteContent(contentID);
	}
}
