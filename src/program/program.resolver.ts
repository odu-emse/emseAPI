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
import { isRequiredInputField } from "graphql";
import { async } from "rxjs/internal/scheduler/async";

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

	//Adds objective to the Module
	@Mutation("addObjectives")
	async addObjectives(@Args("id") id: string, @Args("input") input: string[]) {
		return await this.programService.addObjectives(id, input);
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

		// we get the lesson based on the parent ID of the content
		const lesson = await this.programService.lesson({
			id: input.parent
		});

		// we make a copy of the content array, so we can manipulate it
		let updatedContentArray = [...lesson[0].content];

		//checking the length of the array to see no two elements have same content type
		let len = updatedContentArray.filter(newArr => newArr.type === input.type).length;
		if(len == 0){
			return await this.programService.createContent(input);
		}
		else{
			throw new Error("Content type already exists, Please change the content type");
		}
	}

	@Mutation("updateContent")
	async updateContent(
		@Args("input") input: Omit<ContentFields, "id"> & { id: string }
	) {
		// since we need the ID to update a content, we need to make sure it's there
		if (!input.id) throw new Error("ID field is required");
		// we get the content based on the ID passed in, in order to get the parent lesson ID
		const original = await this.programService.content({
			id: input.id
		});
		// we get the lesson based on the parent ID of the content
		const lesson = await this.programService.lesson({
			id: original[0].parentID
		});

		// we make a copy of the content array, so we can manipulate it
		let updatedContentArray = [...lesson[0].content];

		// if the change is to make the content primary, we need to make sure there's only one primary content
		if (input.primary == true) {
			// we map through the array and make all the content secondary
			updatedContentArray = updatedContentArray.map((org) => {
				if (org.primary == true) {
					org.primary = false;
				}
				return org;
			});

			// we map through the array and make the content that was passed in primary
			updatedContentArray = updatedContentArray.map((org) => {
				if (org.id == input.id) {
					org.primary = true;
				}
				return org;
			});
		}

		// if the change is to make the content secondary, we need to make sure there's at least one primary content
		// if there is no primary content, we make the first content in the array primary
		if (input.primary == false) {
			// we map through the array and make the content that was passed in secondary
			updatedContentArray = updatedContentArray.map((org) => {
				if (org.id == input.id) {
					org.primary = false;
				}
				// we make all the content secondary
				if (org.primary == true) {
					org.primary = false;
				}
				return org;
			});
			// we make the first content in the array primary
			updatedContentArray[0].primary = true;
		}

		// we map through the array and update the content using the service
		const res = updatedContentArray.map(async (content) => {
			return await this.programService.updateContent({
				id: content.id,
				primary: content.primary
			});
		});

		// we resolve the promise and return the result
		return Promise.all(res)
			.then((res) => res)
			.catch((err) => new Error(err));
	}
	@Mutation("deleteContent")
	async deleteContent(@Args("contentID") contentID: string) {
		return await this.programService.deleteContent(contentID);
	}
}
