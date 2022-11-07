import {
	AssignmentInput,
	CourseInput,
	ModuleFeedbackInput,
	ModuleFeedbackUpdate,
	NewAssignment,
	UpdateModule,
	NewAssignmentResult,
	ModuleEnrollmentInput,
	ModuleFields,	
	CourseFields,
	AssignmentFields,
	ModFeedbackFields,
	AssignmentResFields,
	ModEnrollmentFields
} from "gql/graphql";
import { Injectable } from "@nestjs/common";
import {
	Module,
	Course,
	Assignment,
	ModuleInCourse,
	ModuleFeedback,
	AssignmentResult,
	ModuleEnrollment,
} from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProgramService {
	constructor(private prisma: PrismaService) {}

	/// Queries
	async modules(): Promise<Module[]> {
		return this.prisma.module.findMany({
			include: {
				assignments: true,
					// include: {
					// 	assignmentResults: {
					// 		include: {
					// 			gradedBy: {
					// 				include: {
					// 					social: true,
					// 					feedback: true,
					// 					assignmentGraded: true,
					// 					instructorProfile: true
					// 				}
					// 			}
					// 		}
					// 	}
					// },
				parentCourses: true,
				feedback: true,
					// include: {
					// 	student: {
					// 		include: {
					// 			social: true,
					// 			plan: {
					// 				include: {
					// 					modules: true,
					// 					assignmentResults: true,
					// 				}
					// 			},
					// 			instructorProfile: true
					// 		}
					// 	},
					// 	module: true
					// }
				members: true
					// include: {
					// 	plan: {
					// 		include: {
					// 			student: {
					// 				include: {
					// 					social: true,
					// 					feedback: true
					// 				}
					// 			},
					// 			modules: {
					// 				include: {
					// 					module: true
					// 				}
					// 			},
					// 		}
					// 	}
					// }
			}
		});
	}

	async module(id: string): Promise<Module | null> {
		//find module based on id
		if (id.length === 24) {
			return await this.prisma.module.findFirst({
				where: {
					id
				},
				include: {
					assignments: {
						include: {
							assignmentResults: {
								include: {
									gradedBy: {
										include: {
											social: true,
											feedback: true,
											assignmentGraded: true,
											instructorProfile: true
										}
									}
								}
							}
						}
					},
					parentCourses: true,
					feedback: {
						include: {
							student: {
								include: {
									social: true,
									plan: {
										include: {
											modules: true,
											assignmentResults: true,
										}
									},
									instructorProfile: true
								}
							},
							module: true
						}
					},
					members: {
						include: {
							plan: {
								include: {
									student: {
										include: {
											social: true,
											feedback: true
										}
									},
									modules: {
										include: {
											module: true
										}
									},
								}
							}
						}
					}
				}
			});
		} else {
			return await this.prisma.module.findFirst({
				where: {
					moduleNumber: parseInt(id)
				}
			});
		}
	}

	async modulesByParam(params: ModuleFields): Promise<Module[] | null> {
		const {
			id,
			moduleNumber,
			moduleName,
			description,
			intro,
			numSlides,
			keywords,
			createdAt,
			updatedAt,
			assignments,
			members,
			feedback,
			parentCourses,
			parentModules,
			childModules,
		} = params

		const payload = {
			...(id && {id}),
			...(moduleNumber && {moduleNumber}),
			...(moduleName && {moduleName}),
			...(description && {description}), 
			...(intro && {intro}),
			...(numSlides && {numSlides}),
			...(createdAt && {createdAt}),
			...(updatedAt && {updatedAt}),
		}

		if (assignments) {
			payload['assignments'] = {
				some: {
					id: assignments
				}
			}
		}

		if (members) {
			payload['members'] = {
				some: {
					id: members!
				}
			}
		}

		if (keywords) {
			payload['keywords'] = {
				hasEvery: keywords
			}
		}
		
		if (feedback) {
			payload['feedback'] = {
				some: {
					id: feedback!
				}
			}
		}

		if (parentCourses) {
			payload['parentCourses'] = {
				some: {
					id: parentCourses
				}
			}
		}

		if (parentModules) {
			payload['parentModules'] = {
				some: {
					id: parentModules
				}
			}
		}

		if (childModules) {
			payload['childModules'] = {
				some: {
					id: childModules
				}
			}
		}

		return await this.prisma.module.findMany({
			where: payload,
			include: {
				assignments: true,
				members: true,
				feedback: true,
				parentCourses: true,
				parentModules: true,
				childModules: true
			}
		})
	}

	async course(id: string): Promise<Course | null> {
		return this.prisma.course.findFirstOrThrow({
			where: {
				id
			},
			include: {
				modules: {
					include: {
						module: {
							include: {
								assignments: true,
								feedback: {
									include: {
										student: true,
										module: false
									}
								},
								parentCourses: {
									include: {
										course: true
									}
								},
								members: {
									include: {
										module: false,
										plan: true
									}
								}
							}
						},
						course: false
					}
				},
			}
		});
	}

	async courses(): Promise<Course[]> {
		return this.prisma.course.findMany({
			include: {
				modules: {
					include: {
						module: {
							include: {
								assignments: true,
								feedback: {
									include: {
										student: true,
										module: false
									}
								},
								parentCourses: {
									include: {
										course: true
									}
								},
								members: {
									include: {
										module: false,
										plan: true
									}
								}
							}
						},
						course: false
					}
				},
			}
		});
	}

	async courseByParam(params: CourseFields): Promise<Course[] | null> {
		const {
			id,
			name,
			module
		} = params

		const payload = {
			...(id && {id}),
			...(name && {name}),
		}

		if (module) {
			payload['module'] = {
				some: {
					id: module
				}
			}
		}

		return this.prisma.course.findMany({
			where: payload,
			include: {
				modules: true
			}
		})
	}

	async assignments(): Promise<Assignment[]> {
		return this.prisma.assignment.findMany({
			include: {
				module: true
			}
		});
	}

	async assignment(id: string): Promise<Assignment | null> {
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

	async assignmentByParam(params: AssignmentFields): Promise<Assignment[] | null> {
		const {
			id,
			updatedAt,
			name,
			dueAt,
			module,
			assignmentResult
		} = params

		const payload = {
			...(id && {id}),
			...(updatedAt && {updatedAt}),
			...(name && {name}),
			...(dueAt && {dueAt}),
		}

		payload['moduleId'] = module

		if (assignmentResult) {
			payload['assignmentResults'] = {
				some: {
					id: assignmentResult
				}
			}
		}

		return this.prisma.assignment.findMany({
			where: payload,
			include: {
				module: true,
				assignmentResults: true,
			}
		})

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
		});
	}

	async modFeedbackByParam(params: ModFeedbackFields): Promise<ModuleFeedback[] | null> {
		
		const {
			id,
			feedback,
			rating,
			student,
			module
		} = params

		const payload = {
			...(id && {id}),
			...(feedback && {feedback}),
			...(rating && {rating}),
		}

		payload['studentId'] = student
		payload['moduleId'] = module

		return this.prisma.moduleFeedback.findMany({
			where: payload,
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
		});
	}

	async assignmentResults(): Promise<AssignmentResult[]> {
		return this.prisma.assignmentResult.findMany({
			include: {
				student: {
					include: {
						student: true,
						modules: true,
						assignmentResults: true,
					}
				},
				gradedBy: true,
				assignment: true
			}
		});
	}

	async assignmentResult(id: string): Promise<AssignmentResult | null> {
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

	async assignmentResultByParam(params: AssignmentResFields): Promise<AssignmentResult[] | null>{
		const {
			id,
			submittedAt,
			result,
			feedback,
			student,
			gradedBy,
			assignment
		} = params

		const payload = {
			...(id && {id}),
			...(submittedAt && {submittedAt}),
			...(result && {result}),
			...(feedback && {feedback}),
		}

		payload['studentId'] = student
		payload['graderId'] = gradedBy
		payload['assignmentId'] = assignment

		return this.prisma.assignmentResult.findMany({
			where: payload,
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
				plan: {
					include: {
						student: true
					}
				},
				module: true
			}
		});
	}

	/// Fetch a moduleEnrollment by document ID
	async moduleEnrollment(id: string): Promise<ModuleEnrollment | null> {
		return this.prisma.moduleEnrollment.findFirst({
			where: {
				id
			}
		});
	}

	async modEnrollmentByParam(params: ModEnrollmentFields): Promise<ModuleEnrollment[] | null> {
		const {
			id,
			enrolledAt,
			role,
			module,
			plan
		} = params

		const payload = {
			...(id && {id}),
			...(enrolledAt && {enrolledAt}),
			...(role && {role}),
		}

		payload['moduleId'] = module
		payload['planId'] = plan

		return this.prisma.moduleEnrollment.findMany({
			where: payload,
			include: {
				module: true,
				plan: true
			}
		})
	}

	//Mutations

	/// Create a new module
	async addModule(data: Prisma.ModuleCreateInput): Promise<Module | Error> {
		//find out if there is a duplicate user
		const get = await this.prisma.module.findMany({
			where: {
				moduleNumber: data.moduleNumber
			}
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
				duration
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
			keywords
		} = data;

		return this.prisma.module.update({
			where: {
				id: data.id
			},
			data: {
				...(moduleNumber && { moduleNumber }),
				...(moduleName && { moduleName }),
				...(description && { description }),
				...(duration && { duration }),
				...(numSlides && { numSlides }),
				...(keywords && { keywords })
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
			}
		});
	}

	/// Create a course and assign an initial module to that course
	async addCourse(data: Prisma.CourseCreateInput): Promise<Course | Error> {
		//Probably need some error checking here to make sure the module actually exists

		//Make a new course
		return await this.prisma.course.create({
			data: {
				// Set the name
				name: data.name
			}
		});
	}

	async updateCourse(id: string, data: CourseInput): Promise<Course> {
		const { name } = data;
		return this.prisma.course.update({
			where: {
				id: id
			},
			data: {
				...(name && { name })
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
					deleteMany: [{ id: id }]
				}
			}
		});
	}

	/// Create an assignment document
	async addAssignment(input: NewAssignment) {
		return this.prisma.assignment.create({
			data: {
				name: input.name,
				moduleId: input.module,
				dueAt: input.dueAt
			}
		});
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
				id: id
			},
			data: {
				...(name && { name }),
				...(dueAt && { dueAt })
			}
		});
	}

	/// Create a module feedback and link it to the user and module
	async addModuleFeedback(
		moduleId: string,
		userId: string,
		input: Prisma.ModuleFeedbackCreateInput
	) {
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

	/// Update a module feedback
	async updateModuleFeedback(
		id: string,
		input: ModuleFeedbackUpdate
	): Promise<ModuleFeedback> {
		const { feedback, rating } = input;
		return this.prisma.moduleFeedback.update({
			where: {
				id
			},
			data: {
				...(feedback && { feedback }),
				...(rating && { rating })
			}
		});
	}

	/// Delete a ModuleFeedback
	async deleteModuleFeedback(id: string): Promise<ModuleFeedback> {
		return this.prisma.moduleFeedback.delete({
			where: {
				id
			}
		});
	}

	/// Add an AssignmentResult
	async addAssignmentResult(input: NewAssignmentResult) {
		return this.prisma.assignmentResult.create({
			data: {
				assignmentId: input.assignment,
				studentId: input.student,
				graderId: input.grader,
				result: input.result
			}
		});
	}

	/// Update an assignment result
	async updateAssignmentResult(id: string, result: number) {
		return this.prisma.assignmentResult.update({
			where: {
				id
			},
			data: {
				result
			}
		});
	}

	/// Delete an assignment result
	async deleteAssignmentResult(id: string) {
		return this.prisma.assignmentResult.delete({
			where: {
				id
			}
		});
	}

	/// Create a ModuleEnrollment Document
	async addModuleEnrollment(
		input: ModuleEnrollmentInput
	): Promise<ModuleEnrollment | Error> {
		let count = await this.prisma.moduleEnrollment.count({
			where: {
				planId: input.plan,
				moduleId: input.module
			}
		});

		if (count != 0) {
			throw new Error("This Module Enrollment already exists");
		}

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

	/// Update a ModuleEnrollment
	async updateModuleEnrollment(id: string, input: ModuleEnrollmentInput) {
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

	async deleteModuleEnrollment(id: string) {
		return this.prisma.moduleEnrollment.delete({
			where: {
				id
			}
		});
	}

	// Link a course and a module
	async pairCourseModule(courseId: string, moduleId: string) {
		return this.prisma.moduleInCourse.create({
			data: {
				moduleId: moduleId,
				courseId: courseId
			}
		});
	}

	async unpairCourseModule(courseId: string, moduleId: string) {
		return this.prisma.moduleInCourse.deleteMany({
			where: {
				moduleId: moduleId,
				courseId: courseId
			}
		});
	}
	async Addrequirement(parentId: string, childId: string){
		return this.prisma.requirement.create({
			data:{
				parentId: parentId,
				childId:  childId
			}

		})
	}
	async Removerequirement(parentId: string, childId: string){
		return this.prisma.requirement.deleteMany({
			where:{
				parentId: parentId,
				childId:  childId
			}
	})
}}
