"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramResolver = void 0;
const graphql_1 = require("../../gql/graphql");
const graphql_2 = require("@nestjs/graphql");
const program_service_1 = require("./program.service");
const client_1 = require("@prisma/client");
let ProgramResolver = class ProgramResolver {
    constructor(programService) {
        this.programService = programService;
    }
    async modules() {
        try {
            const res = this.programService.modules();
            return res;
        }
        catch (error) {
            throw new Error("An error occurred while trying to execute your query");
        }
    }
    async module(args) {
        try {
            const res = await this.programService.module(args);
            return res;
        }
        catch (error) {
            if (error)
                throw new Error("An error occurred while trying to execute your query");
        }
    }
    async courses() {
        try {
            const res = this.programService.courses();
            return res;
        }
        catch (error) {
            throw new Error("An error occurred while trying to execute your query");
        }
    }
    async assignment(args) {
        try {
            const res = await this.programService.assignment(args);
            return res;
        }
        catch (error) {
            throw new Error("An error occurred while trying to execute your query");
        }
    }
    async assignments() {
        try {
            const res = this.programService.assignments();
            return res;
        }
        catch (error) {
            throw new Error("An error occurred while trying to execute your query");
        }
    }
    async moduleInCourses() {
        try {
            const res = await this.programService.moduleInCourses();
            return res;
        }
        catch (error) {
            throw new Error("Could not fetch moduleInCourses");
        }
    }
    async moduleFeedbacks() {
        try {
            const res = await this.programService.moduleFeedbacks();
            return res;
        }
        catch (error) {
            throw new Error("Could not fetch ModuleFeedback");
        }
    }
    async moduleFeedback(id) {
        try {
            const res = await this.programService.moduleFeedback(id);
            return res;
        }
        catch (error) {
            throw new Error("Could not fetch ModuleFeedback with id: " + id);
        }
    }
    async assignmentResults() {
        try {
            const res = await this.programService.assignmentResults();
            return res;
        }
        catch (error) {
            throw new Error("Could not fetch assignmentResults");
        }
    }
    async assignmentResult(id) {
        try {
            const res = await this.programService.assignmentResult(id);
            return res;
        }
        catch (error) {
            throw new Error("Could not fetch assignment result with id: " + id);
        }
    }
    async moduleEnrollments() {
        try {
            const res = await this.programService.moduleEnrollments();
            return res;
        }
        catch (error) {
            throw new Error("Could not fetch moduleEnrollments");
        }
    }
    async moduleEnrollment(id) {
        try {
            const res = await this.programService.moduleEnrollment(id);
            return res;
        }
        catch (error) {
            throw new Error("Could not fetch moduleEnrollment with id: " + id);
        }
    }
    async courseEnrollments() {
        try {
            const res = await this.programService.courseEnrollments();
            return res;
        }
        catch (error) {
            throw new Error("Could not fetch CourseEnrollments");
        }
    }
    async courseEnrollment(id) {
        try {
            const res = await this.programService.courseEnrollment(id);
            return res;
        }
        catch (error) {
            throw new Error("Could not fetch CourseEnrollment with id: " + id);
        }
    }
    async create(args) {
        const res = await this.programService.addModule(args);
        return res;
    }
    async update(args) {
        const res = await this.programService.updateModule(args);
        return res;
    }
    async delete(args) {
        const res = await this.programService.deleteModule(args);
        return res;
    }
    async createCourse(args) {
        const res = await this.programService.addCourse(args);
        return res;
    }
    async updateCourse(id, args) {
        const res = await this.programService.updateCourse(id, args);
        return res;
    }
    async deleteCourse(args) {
        const res = await this.programService.deleteCourse(args);
        return res;
    }
    async addAssignment(input) {
        try {
            const res = await this.programService.addAssignment(input);
            return res;
        }
        catch (error) {
            throw new Error("Failed to create a new assignment");
        }
    }
    async deleteAssignment(args, id) {
        const res = await this.programService.deleteAssignment(args, id);
        return res;
    }
    async updateAssignment(id, args) {
        const res = await this.programService.updateAssignment(id, args);
        return res;
    }
    async addModuleFeedback(moduleId, userId, data) {
        try {
            const res = await this.programService.addModuleFeedback(moduleId, userId, data);
            return res;
        }
        catch (error) {
            throw new Error("Could not add ModuleFeedback");
        }
    }
    async updateModuleFeedback(id, data) {
        try {
            const res = await this.programService.updateModuleFeedback(id, data);
            return res;
        }
        catch (error) {
            throw new Error("Could not update ModuleFeedback with id: " + id);
        }
    }
    async deleteModuleFeedback(id) {
        try {
            const res = await this.programService.deleteModuleFeedback(id);
            return res;
        }
        catch (error) {
            throw new Error("Could not delete ModuleFeedback with id: " + id);
        }
    }
    async addAssignmentResult(input) {
        try {
            const res = await this.programService.addAssignmentResult(input);
            return res;
        }
        catch (error) {
            throw new Error("Could not add assignmentResult");
        }
    }
    async updateAssignmentResult(id, result) {
        try {
            const res = await this.programService.updateAssignmentResult(id, result);
            return res;
        }
        catch (error) {
            throw new Error("Could not update AssignmentResult with id: " + id);
        }
    }
    async deleteAssignmentResult(id) {
        try {
            const res = await this.programService.deleteAssignmentResult(id);
            return res;
        }
        catch (error) {
            throw new Error("Could not delete assignment with id: " + id);
        }
    }
    async addModuleEnrollment(input) {
        try {
            const res = await this.programService.addModuleEnrollment(input);
            return res;
        }
        catch (error) {
            throw new Error("Could not add ModuleEnrollment");
        }
    }
    async updateModuleEnrollment(id, input) {
        try {
            const res = await this.programService.updateModuleEnrollment(id, input);
            return res;
        }
        catch (error) {
            throw new Error("Could not update ModuleEnrollment with id: " + id);
        }
    }
    async deleteModuleEnrollment(id) {
        try {
            const res = await this.programService.deleteModuleEnrollment(id);
            return res;
        }
        catch (error) {
            throw new Error("Could not delete ModuleEnrollment with id: " + id);
        }
    }
    async addCourseEnrollment(plan, course) {
        try {
            const res = await this.programService.addCourseEnrollment(plan, course);
            return res;
        }
        catch (error) {
            throw new Error("Could not create new CourseEnrollment");
        }
    }
    async updateCourseEnrollment(id, plan, course) {
        try {
            const res = await this.programService.updateCourseEnrollment(id, plan, course);
            return res;
        }
        catch (error) {
            throw new Error("Could not update CourseEnrollment with id: " + id);
        }
    }
    async deleteCourseEnrollment(id) {
        try {
            const res = await this.programService.deleteCourseEnrollment(id);
            return res;
        }
        catch (error) {
            throw new Error("Could not delete CourseEnrollment with id: " + id);
        }
    }
    async pairCourseModule(courseId, moduleId) {
        try {
            const res = await this.programService.pairCourseModule(courseId, moduleId);
            return res;
        }
        catch (error) {
            throw new Error("Could not pair course " + courseId + " and module " + moduleId);
        }
    }
    async unpairCourseModule(courseId, moduleId) {
        try {
            const res = await this.programService.unpairCourseModule(courseId, moduleId);
            return res;
        }
        catch (error) {
            throw new Error("Could not unlink course " +
                courseId +
                " and module " +
                moduleId);
        }
    }
};
__decorate([
    (0, graphql_2.Query)("modules"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "modules", null);
__decorate([
    (0, graphql_2.Query)("module"),
    __param(0, (0, graphql_2.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "module", null);
__decorate([
    (0, graphql_2.Query)("courses"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "courses", null);
__decorate([
    (0, graphql_2.Query)("assignment"),
    __param(0, (0, graphql_2.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "assignment", null);
__decorate([
    (0, graphql_2.Query)("assignments"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "assignments", null);
__decorate([
    (0, graphql_2.Query)("moduleInCourses"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "moduleInCourses", null);
__decorate([
    (0, graphql_2.Query)("moduleFeedbacks"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "moduleFeedbacks", null);
__decorate([
    (0, graphql_2.Query)("moduleFeedback"),
    __param(0, (0, graphql_2.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "moduleFeedback", null);
__decorate([
    (0, graphql_2.Query)("assignmentResults"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "assignmentResults", null);
__decorate([
    (0, graphql_2.Query)("assignmentResult"),
    __param(0, (0, graphql_2.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "assignmentResult", null);
__decorate([
    (0, graphql_2.Query)("moduleEnrollments"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "moduleEnrollments", null);
__decorate([
    (0, graphql_2.Query)("moduleEnrollment"),
    __param(0, (0, graphql_2.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "moduleEnrollment", null);
__decorate([
    (0, graphql_2.Query)("courseEnrollments"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "courseEnrollments", null);
__decorate([
    (0, graphql_2.Query)("courseEnrollment"),
    __param(0, (0, graphql_2.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "courseEnrollment", null);
__decorate([
    (0, graphql_2.Mutation)("addModule"),
    __param(0, (0, graphql_2.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_1.NewModule]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "create", null);
__decorate([
    (0, graphql_2.Mutation)("updateModule"),
    __param(0, (0, graphql_2.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_1.UpdateModule]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "update", null);
__decorate([
    (0, graphql_2.Mutation)("deleteModule"),
    __param(0, (0, graphql_2.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "delete", null);
__decorate([
    (0, graphql_2.Mutation)("addCourse"),
    __param(0, (0, graphql_2.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_1.CourseInput]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "createCourse", null);
__decorate([
    (0, graphql_2.Mutation)("updateCourse"),
    __param(0, (0, graphql_2.Args)("id")),
    __param(1, (0, graphql_2.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, graphql_1.CourseInput]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "updateCourse", null);
__decorate([
    (0, graphql_2.Mutation)("deleteCourse"),
    __param(0, (0, graphql_2.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "deleteCourse", null);
__decorate([
    (0, graphql_2.Mutation)("addAssignment"),
    __param(0, (0, graphql_2.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_1.NewAssignment]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "addAssignment", null);
__decorate([
    (0, graphql_2.Mutation)("deleteAssignment"),
    __param(0, (0, graphql_2.Args)("module")),
    __param(1, (0, graphql_2.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "deleteAssignment", null);
__decorate([
    (0, graphql_2.Mutation)("updateAssignment"),
    __param(0, (0, graphql_2.Args)("id")),
    __param(1, (0, graphql_2.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, graphql_1.AssignmentInput]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "updateAssignment", null);
__decorate([
    (0, graphql_2.Mutation)("addModuleFeedback"),
    __param(0, (0, graphql_2.Args)("moduleId")),
    __param(1, (0, graphql_2.Args)("userId")),
    __param(2, (0, graphql_2.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "addModuleFeedback", null);
__decorate([
    (0, graphql_2.Mutation)("updateModuleFeedback"),
    __param(0, (0, graphql_2.Args)("id")),
    __param(1, (0, graphql_2.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, graphql_1.ModuleFeedbackUpdate]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "updateModuleFeedback", null);
__decorate([
    (0, graphql_2.Mutation)("deleteModuleFeedback"),
    __param(0, (0, graphql_2.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "deleteModuleFeedback", null);
__decorate([
    (0, graphql_2.Mutation)("addAssignmentResult"),
    __param(0, (0, graphql_2.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_1.NewAssignmentResult]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "addAssignmentResult", null);
__decorate([
    (0, graphql_2.Mutation)("updateAssignmentResult"),
    __param(0, (0, graphql_2.Args)("id")),
    __param(1, (0, graphql_2.Args)("result")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "updateAssignmentResult", null);
__decorate([
    (0, graphql_2.Mutation)("deleteAssignmentResult"),
    __param(0, (0, graphql_2.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "deleteAssignmentResult", null);
__decorate([
    (0, graphql_2.Mutation)("addModuleEnrollment"),
    __param(0, (0, graphql_2.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_1.ModuleEnrollmentInput]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "addModuleEnrollment", null);
__decorate([
    (0, graphql_2.Mutation)("updateModuleEnrollment"),
    __param(0, (0, graphql_2.Args)("id")),
    __param(1, (0, graphql_2.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, graphql_1.ModuleEnrollmentInput]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "updateModuleEnrollment", null);
__decorate([
    (0, graphql_2.Mutation)("deleteModuleEnrollment"),
    __param(0, (0, graphql_2.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "deleteModuleEnrollment", null);
__decorate([
    (0, graphql_2.Mutation)("addCourseEnrollment"),
    __param(0, (0, graphql_2.Args)("planId")),
    __param(1, (0, graphql_2.Args)("courseId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "addCourseEnrollment", null);
__decorate([
    (0, graphql_2.Mutation)("updateCourseEnrollment"),
    __param(0, (0, graphql_2.Args)("id")),
    __param(1, (0, graphql_2.Args)("planId")),
    __param(2, (0, graphql_2.Args)("courseId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "updateCourseEnrollment", null);
__decorate([
    (0, graphql_2.Mutation)("deleteCourseEnrollment"),
    __param(0, (0, graphql_2.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "deleteCourseEnrollment", null);
__decorate([
    (0, graphql_2.Mutation)("pairCourseModule"),
    __param(0, (0, graphql_2.Args)("courseId")),
    __param(1, (0, graphql_2.Args)("moduleId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "pairCourseModule", null);
__decorate([
    (0, graphql_2.Mutation)("unpairCourseModule"),
    __param(0, (0, graphql_2.Args)("courseId")),
    __param(1, (0, graphql_2.Args)("moduleId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "unpairCourseModule", null);
ProgramResolver = __decorate([
    (0, graphql_2.Resolver)(),
    __metadata("design:paramtypes", [program_service_1.ProgramService])
], ProgramResolver);
exports.ProgramResolver = ProgramResolver;
//# sourceMappingURL=program.resolver.js.map