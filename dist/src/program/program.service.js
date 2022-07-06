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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProgramService = class ProgramService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async modules() {
        return this.prisma.module.findMany({
            include: {
                assignments: true,
                parentCourses: {
                    include: {
                        course: true
                    }
                },
                feedback: {
                    include: {
                        student: true
                    }
                },
                members: {
                    include: {
                        plan: true
                    }
                }
            }
        });
    }
    async module(id) {
        if (id.length === 24) {
            const res = await this.prisma.module.findFirst({
                where: {
                    id
                },
                include: {
                    assignments: true,
                    parentCourses: {
                        include: {
                            course: true
                        }
                    },
                    feedback: {
                        include: {
                            student: true
                        }
                    },
                    members: {
                        include: {
                            plan: true
                        }
                    }
                }
            });
            return res;
        }
        else {
            const res = await this.prisma.module.findFirst({
                where: {
                    moduleNumber: parseInt(id)
                }
            });
            return res;
        }
    }
    async courses() {
        return this.prisma.course.findMany({
            include: {
                modules: true,
                enrollment: {
                    include: {
                        student: true
                    }
                }
            }
        });
    }
    async assignments() {
        return this.prisma.assignment.findMany({
            include: {
                module: true
            }
        });
    }
    async assignment(id) {
        const res = await this.prisma.assignment.findFirst({
            where: {
                id
            },
            include: {
                module: true
            }
        });
        return res;
    }
    async moduleInCourses() {
        return this.prisma.moduleInCourse.findMany({});
    }
    async moduleFeedbacks() {
        return this.prisma.moduleFeedback.findMany({
            include: {
                student: true,
                module: true
            }
        });
    }
    async moduleFeedback(id) {
        return this.prisma.moduleFeedback.findFirst({
            where: {
                id
            },
            include: {
                student: true,
                module: true
            }
        });
    }
    async assignmentResults() {
        return this.prisma.assignmentResult.findMany({
            include: {
                student: {
                    include: {
                        student: true,
                        modules: true,
                        assignmentResults: true,
                        courses: true
                    }
                },
                gradedBy: true,
                assignment: true
            }
        });
    }
    async assignmentResult(id) {
        return this.prisma.assignmentResult.findFirst({
            where: {
                id
            },
            include: {
                student: true,
                gradedBy: true,
                assignment: true
            }
        });
    }
    async moduleEnrollments() {
        return this.prisma.moduleEnrollment.findMany({
            include: {
                plan: {
                    include: {
                        student: true
                    }
                },
                module: true
            }
        });
    }
    async moduleEnrollment(id) {
        return this.prisma.moduleEnrollment.findFirst({
            where: {
                id
            }
        });
    }
    async courseEnrollments() {
        return this.prisma.courseEnrollment.findMany({
            include: {
                student: {
                    include: {
                        student: true,
                        modules: true,
                        assignmentResults: true,
                        courses: true
                    }
                },
                course: true
            }
        });
    }
    async courseEnrollment(id) {
        return this.prisma.courseEnrollment.findUnique({
            where: {
                id
            },
            include: {
                student: {
                    include: {
                        student: true,
                        modules: true,
                        assignmentResults: true,
                        courses: true
                    }
                },
                course: true
            }
        });
    }
    async addModule(data) {
        const get = await this.prisma.module.findMany({
            where: {
                moduleNumber: data.moduleNumber
            }
        });
        if (get.length !== 0) {
            throw new Error("Module already exisits.");
        }
        else {
            const { id, description, feedback, moduleName, moduleNumber, intro, keywords, assignments, members, createdAt, updatedAt, numSlides, duration } = data;
            return this.prisma.module.create({
                data,
                include: {
                    assignments: true,
                    parentCourses: {
                        include: {
                            course: true
                        }
                    },
                    feedback: {
                        include: {
                            student: true
                        }
                    },
                    members: {
                        include: {
                            plan: true
                        }
                    }
                }
            });
        }
    }
    async updateModule(data) {
        const { id, moduleNumber, moduleName, description, duration, numSlides, keywords } = data;
        return this.prisma.module.update({
            where: {
                id: data.id
            },
            data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (moduleNumber && { moduleNumber })), (moduleName && { moduleName })), (description && { description })), (duration && { duration })), (numSlides && { numSlides })), (keywords && { keywords })),
            include: {
                assignments: true,
                parentCourses: {
                    include: {
                        course: true
                    }
                },
                feedback: {
                    include: {
                        student: true
                    }
                },
                members: {
                    include: {
                        plan: true
                    }
                }
            }
        });
    }
    async deleteModule(id) {
        await this.prisma.assignment.deleteMany({
            where: {
                moduleId: id
            }
        });
        return this.prisma.module.delete({
            where: {
                id: id
            }
        });
    }
    async addCourse(data) {
        return await this.prisma.course.create({
            data: {
                name: data.name
            }
        });
    }
    async updateCourse(id, data) {
        const { name } = data;
        return this.prisma.course.update({
            where: {
                id: id
            },
            data: Object.assign({}, (name && { name }))
        });
    }
    async deleteCourse(id) {
        await this.prisma.course.update({
            where: {
                id
            },
            data: {
                modules: {
                    deleteMany: {}
                }
            },
            include: {
                modules: true
            }
        });
        return await this.prisma.course.delete({
            where: {
                id
            }
        });
    }
    async deleteAssignment(module, id) {
        return this.prisma.module.update({
            where: {
                id: module
            },
            data: {
                assignments: {
                    deleteMany: [{ id: id }]
                }
            }
        });
    }
    async addAssignment(input) {
        return this.prisma.assignment.create({
            data: {
                name: input.name,
                moduleId: input.module,
                dueAt: input.dueAt
            }
        });
    }
    async updateAssignment(id, data) {
        const { name, dueAt, module } = data;
        return this.prisma.assignment.update({
            where: {
                id: id
            },
            data: Object.assign(Object.assign({}, (name && { name })), (dueAt && { dueAt }))
        });
    }
    async addModuleFeedback(moduleId, userId, input) {
        return this.prisma.module.update({
            where: {
                id: moduleId
            },
            data: {
                feedback: {
                    createMany: {
                        data: [
                            {
                                feedback: input.feedback,
                                rating: input.rating,
                                studentId: userId
                            }
                        ]
                    }
                }
            },
            include: {
                feedback: true
            }
        });
    }
    async updateModuleFeedback(id, input) {
        const { feedback, rating } = input;
        return this.prisma.moduleFeedback.update({
            where: {
                id
            },
            data: Object.assign(Object.assign({}, (feedback && { feedback })), (rating && { rating }))
        });
    }
    async deleteModuleFeedback(id) {
        return this.prisma.moduleFeedback.delete({
            where: {
                id
            }
        });
    }
    async addAssignmentResult(input) {
        return this.prisma.assignmentResult.create({
            data: {
                assignmentId: input.assignment,
                studentId: input.student,
                graderId: input.grader,
                result: input.result
            }
        });
    }
    async updateAssignmentResult(id, result) {
        return this.prisma.assignmentResult.update({
            where: {
                id
            },
            data: {
                result
            }
        });
    }
    async deleteAssignmentResult(id) {
        return this.prisma.assignmentResult.delete({
            where: {
                id
            }
        });
    }
    async addModuleEnrollment(input) {
        return this.prisma.moduleEnrollment.create({
            data: {
                moduleId: input.module,
                planId: input.plan,
                role: input.role
            },
            include: {
                module: true,
                plan: true
            }
        });
    }
    async updateModuleEnrollment(id, input) {
        return this.prisma.moduleEnrollment.update({
            where: {
                id
            },
            data: {
                moduleId: input.module,
                planId: input.plan,
                role: input.role
            },
            include: {
                module: true,
                plan: true
            }
        });
    }
    async deleteModuleEnrollment(id) {
        return this.prisma.moduleEnrollment.delete({
            where: {
                id
            }
        });
    }
    async addCourseEnrollment(planId, courseId) {
        return this.prisma.courseEnrollment.create({
            data: {
                studentId: planId,
                courseId: courseId
            },
            include: {
                student: {
                    include: {
                        student: true,
                        modules: true,
                        assignmentResults: true,
                        courses: true
                    }
                }
            }
        });
    }
    async updateCourseEnrollment(id, planId, courseId) {
        return this.prisma.courseEnrollment.update({
            where: {
                id
            },
            data: {
                studentId: planId,
                courseId: courseId
            }
        });
    }
    async deleteCourseEnrollment(id) {
        return this.prisma.courseEnrollment.delete({
            where: {
                id
            }
        });
    }
    async pairCourseModule(courseId, moduleId) {
        return this.prisma.moduleInCourse.create({
            data: {
                moduleId: moduleId,
                courseId: courseId
            }
        });
    }
    async unpairCourseModule(courseId, moduleId) {
        return this.prisma.moduleInCourse.deleteMany({
            where: {
                moduleId: moduleId,
                courseId: courseId
            }
        });
    }
};
ProgramService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProgramService);
exports.ProgramService = ProgramService;
//# sourceMappingURL=program.service.js.map