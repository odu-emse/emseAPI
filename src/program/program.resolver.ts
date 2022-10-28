import {
	AssignmentInput,
	CourseInput,
	ModuleEnrollmentInput,
	ModuleFeedbackUpdate,
	NewAssignment,
	NewAssignmentResult,
	NewModule,
	UpdateModule,
	ModuleFields
} from "gql/graphql";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProgramService } from "./program.service";
import { Prisma } from "@prisma/client";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth.guard";

@Resolver()
// @UseGuards(AuthGuard)
export class ProgramResolver {
	constructor(private readonly programService: ProgramService) {}

	@Query("modules")
	async modules() {
		return await this.programService.modules();
	}

	// Get a single module based on module's ID
	@Query("module")
	async module(@Args("id") args: string) {
		return await this.programService.module(args);
	}

	@Query("modulesByParam")
	async modulesByParam(@Args("input") args: ModuleFields) {
		return await this.programService.modulesByParam(args);
	}

	// Get multiple Courses
	@Query("courses")
	async course(@Args("id") ID: string) {
		return await this.programService.course(ID);
	}

	// Get multiple Courses
	@Query("courses")
	async courses() {
		return await this.programService.courses();
	}

	// Get an assignment by its id
	@Query("assignment")
	async assignment(@Args("id") args: string) {
		return await this.programService.assignment(args);
	}

	// Get multiple assignments from the db
	@Query("assignments")
	async assignments() {
		return await this.programService.assignments();
	}

	@Query("moduleInCourses")
	async moduleInCourses() {
		return await this.programService.moduleInCourses();
	}

	@Query("moduleFeedbacks")
	async moduleFeedbacks() {
		return await this.programService.moduleFeedbacks();
	}

	@Query("moduleFeedback")
	async moduleFeedback(@Args("id") id: string) {
		return await this.programService.moduleFeedback(id);
	}

	@Query("assignmentResults")
	async assignmentResults() {
		return await this.programService.assignmentResults();
	}

	@Query("assignmentResult")
	async assignmentResult(@Args("id") id: string) {
		return await this.programService.assignmentResult(id);
	}

	@Query("moduleEnrollments")
	async moduleEnrollments() {
		return await this.programService.moduleEnrollments();
	}

	@Query("moduleEnrollment")
	async moduleEnrollment(@Args("id") id: string) {
		return await this.programService.moduleEnrollment(id);
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
	async updateCourse(
		@Args("id") id: string,
		@Args("input") args: CourseInput
	) {
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
	async deleteAssignment(
		@Args("module") args: string,
		@Args("id") id: string
	) {
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
		return await this.programService.addModuleFeedback(
			moduleId,
			userId,
			data
		);
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

	@Mutation("addRequirement")
	async addRequirment(
		@Args("parentId") parentId: string,
		@Args("childId") childId: string
	){
		return await this.programService.Addrequirement(parentId,childId)
	};

	@Mutation("removeRequirement")
	async removeRequirement(
		@Args("parentId")parentId: string,
		@Args("childId")childId: string
	){
		return await this.programService.Removerequirement(parentId,childId)
	}
}
