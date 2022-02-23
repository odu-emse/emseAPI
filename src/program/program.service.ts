import { AssignmentInput, CourseInput, ModuleFeedbackInput, ModuleFeedbackUpdate, NewAssignment, UpdateModule, NewAssignmentResult, ModuleEnrollmentInput } from "./../gql/graphql";
import { Injectable } from "@nestjs/common";
import { Module, Course, Assignment, ModuleInCourse, ModuleFeedback, AssignmentResult, ModuleEnrollment, CourseEnrollment } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";
import { float } from "aws-sdk/clients/lightsail";

@Injectable()
export class ProgramService {
	constructor(private prisma: PrismaService) {}

	/// Queries
	async modules(): Promise<Module[]> {
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

	async module(id: string): Promise<Module | null> {
		//find module based on id
		if (id.length === 24) {
			const res = await this.prisma.module.findFirst({
				where: {
					id,
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
		//find module based on CRN if we choose to implement such field
		// else if (id.length <= 12 && id.length >= 5) {
		// 	//return based on CRN if we will have CRNs
		// }
		//find module based on moduleNumber
		else {
			const res = await this.prisma.module.findFirst({
				where: {
					moduleNumber: parseInt(id),
				},
			});
			return res;
		}
	}

	async courses(): Promise<Course[]> {
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

	async assignments(): Promise<Assignment[]> {
		return this.prisma.assignment.findMany({
			include: {
				module: true
			}
		});
	}

	async assignment(id: string): Promise <Assignment | null> {
		const res = await this.prisma.assignment.findFirst({
			where: {
				id
			},
			include: {
				module: true,
			}
		});
		return res;
	}

	async moduleInCourses(): Promise<ModuleInCourse[]> {
		return this.prisma.moduleInCourse.findMany({
			// include: {
			// 	// module: true,
			// 	// course: true
			// }
		});
	}

	async moduleFeedbacks(): Promise<ModuleFeedback[]> {
		return this.prisma.moduleFeedback.findMany({
			include: {
				student: true,
				module: true	
			}
		})
	}

	async moduleFeedback(id: string): Promise<ModuleFeedback | null> {
		return this.prisma.moduleFeedback.findFirst({
			where: {
				id
			},
			include: {
				student: true,
				module: true
			}
		})
	}

	async assignmentResults(): Promise<AssignmentResult[]> {
		return this.prisma.assignmentResult.findMany({
			include: {
				student: true,
				gradedBy: true,
				assignment: true
			}
		})
	}

	async assignmentResult(id: string): Promise<AssignmentResult | null> {
		return this.prisma.assignmentResult.findFirst({
			where:{
				id
			},
			include: {
				student: true,
				gradedBy: true,
				assignment: true
			}
		})
	}

	/// Fetch all module enrollments in the database
	async moduleEnrollments(): Promise<ModuleEnrollment[]> {
		return this.prisma.moduleEnrollment.findMany({
			include: {
				plan: true,
				module: true
			}
		})
	}

	/// Fetch a moduleEnrollment by document ID
	async moduleEnrollment(id: string): Promise<ModuleEnrollment | null>{
		return this.prisma.moduleEnrollment.findFirst({
			where: {
				id
			},
		})
	}

	/// Fetch all CourseEnrollment records
	async courseEnrollments(): Promise<CourseEnrollment[]> {
		return this.prisma.courseEnrollment.findMany({
			include: {
				student: true,
				course: true
			}
		})
	}

	/// Fetch a CourseEnrollment Record by its ID
	async courseEnrollment(id: string): Promise<CourseEnrollment | null> {
		return this.prisma.courseEnrollment.findUnique({
			where: {
				id
			},
			include: {
				student: true,
				course: true
			}
		})
	}

	//Mutations

	/// Create a new module
	async addModule(data: Prisma.ModuleCreateInput): Promise<Module | Error> {
		//find out if there is a duplicate user
		const get = await this.prisma.module.findMany({
			where: {
				moduleNumber: data.moduleNumber,
			},
		});
		if (get.length !== 0) {
			throw new Error("Module already exisits.");
		} else {
			const {
				id,
				description,
				feedback,
				moduleName,
				moduleNumber,
				intro,
				keywords,
				assignments,
				members,
				createdAt,
				updatedAt,
				numSlides,
				duration,
			} = data;
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

	/// Modify a modules data or add an assignment here
	async updateModule(data: UpdateModule): Promise<Module> {
		const {
			id,
			moduleNumber,
			moduleName,
			description,
			duration,
			numSlides,
			keywords,
		} = data

		return this.prisma.module.update({
			where: {
				id: data.id,
			},
			data: {
				...(moduleNumber && {moduleNumber}),
				...(moduleName && {moduleName}),
				...(description && {description}),
				...(duration && {duration}),
				...(numSlides && {numSlides}),
				...(keywords && {keywords}),
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
	}

	/// Remove a module and all of its assignments
	async deleteModule(id: string) {
		await this.prisma.assignment.deleteMany({
			where: {
				moduleId: id
			}
		});

		return this.prisma.module.delete({
			where: {
				id: id
			},
		});
	}

	/// Create a course and assign an initial module to that course
	async addCourse(data: Prisma.CourseCreateInput): Promise<Course | Error> {
		//Probably need some error checking here to make sure the module actually exists
		
		//Make a new course
		return await this.prisma.course.create({
			data: {
				// Set the name
				name: data.name,
				
			}
		})
	} 

	async updateCourse(id: string, data: CourseInput): Promise<Course> {
		const {
			name
		} = data
		return this.prisma.course.update({
			where: {
				id: id,
			},
			data: {
				...(name && {name})
			}
		});
	}

	async deleteCourse(id: string): Promise<Course> {
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

	/// Remove an assignment from a module
	async deleteAssignment(module: string, id: string) {
		// Do something here to disconnect an assignment from a module
		return this.prisma.module.update({
			where: {
				id: module
			},
			data: {
				assignments: {
					deleteMany: [{id: id}]
				}
			}
		})
	}

	/// Create an assignment document
	async addAssignment(input: NewAssignment) {
		return this.prisma.assignment.create({
			data:{
				name: input.name,
				moduleId: input.module,
				dueAt: input.dueAt
				
			}
		})
	}

	/// Change an assignments data
	async updateAssignment(id: string, data: AssignmentInput) {
		const {
			name,
			dueAt,
			// Look into moving assignments between courses through this.
			module
		} = data;
		return this.prisma.assignment.update({
			where: {
				id: id,
			},
			data: {
				...(name && {name}),
				...(dueAt && {dueAt})
			}
		})
	}

	/// Create a module feedback and link it to the user and module
	async addModuleFeedback(moduleId: string, userId: string, input: Prisma.ModuleFeedbackCreateInput) {
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
		})
	}

	/// Update a module feedback
	async updateModuleFeedback(id: string, input: ModuleFeedbackUpdate): Promise<ModuleFeedback> {
		const {
			feedback,
			rating
		} = input
		return this.prisma.moduleFeedback.update({
			where: {
				id
			},
			data: {
				...(feedback && {feedback}),
				...(rating && {rating})
			}
		})
	}

	/// Delete a ModuleFeedback
	async deleteModuleFeedback(id: string): Promise<ModuleFeedback> {
		return this.prisma.moduleFeedback.delete({
			where: {
				id
			}
		})
	}

	/// Add an AssignmentResult
	async addAssignmentResult(input: NewAssignmentResult){
		return this.prisma.assignmentResult.create({
			data: {
				assignmentId: input.assignment,
				studentId: input.student,
				graderId: input.grader,
				result: input.result
			}
		})
	}

	/// Update an assignment result
	async updateAssignmentResult(id: string, result: float) {
		return this.prisma.assignmentResult.update({
			where: {
				id
			},
			data: {
				result: result
			}
		})
	}

	/// Delete an assignment result
	async deleteAssignmentResult(id: string) {
		return this.prisma.assignmentResult.delete({
			where: {
				id
			}
		})
	}

	/// Create a ModuleEnrollment Document
	async addModuleEnrollment(input: ModuleEnrollmentInput) {
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
		})
	}

	/// Update a ModuleEnrollment
	async updateModuleEnrollment(id: string, input: ModuleEnrollmentInput){
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
		})
	}

	async deleteModuleEnrollment(id: string){
		return this.prisma.moduleEnrollment.delete({
			where: {
				id
			}
		})
	}

	/// Create a new CourseEnrollment Record
	async addCourseEnrollment(planId: string, courseId: string): Promise<CourseEnrollment> {
		return this.prisma.courseEnrollment.create({
			data: {
				studentId: planId,
				courseId: courseId
			}
		})
	}

	/// Modify an existing CourseEnrollment Record
	async updateCourseEnrollment(id: string, planId: string, courseId: string) {
		return this.prisma.courseEnrollment.update({
			where: {
				id
			},
			data: {
				studentId: planId,
				courseId: courseId
			}
		})
	}

	/// Delete an existing record
	async deleteCourseEnrollment(id: string) {
		return this.prisma.courseEnrollment.delete({
			where: {
				id
			}
		})
	}

	// Link a course and a module
	async pairCourseModule(courseId: string, moduleId: string){
		return this.prisma.moduleInCourse.create({
			data:{
				moduleId: moduleId,
				courseId: courseId
			}
		})
	}

	async unpairCourseModule(courseId: string, moduleId: string) {
		return this.prisma.moduleInCourse.deleteMany({
			where: {
				moduleId: moduleId,
				courseId: courseId
			}
		})
	}

}
