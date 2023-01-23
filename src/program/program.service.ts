import {
	AssignmentInput,
	CourseInput,
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
	ModEnrollmentFields,
	LessonFields,
	Module,
	Course,
	ModuleFeedback,
	CreateCollectionArgs,
	LessonInput,
	CollectionFields
} from "gql/graphql";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProgramService {
	constructor(private prisma: PrismaService) {}

	private assignmentInclude = Prisma.validator<Prisma.AssignmentInclude>()({
		module: true,
		assignmentResults: {
			include: {
				student: true,
				gradedBy: true,
				assignment: true
			}
		}
	});

	private courseInclude = Prisma.validator<Prisma.CourseInclude>()({
		module: {
			include: {
				assignments: true,
				feedback: {
					include: {
						student: true,
						module: false
					}
				},
				members: {
					include: {
						module: false,
						plan: true
					}
				}
			}
		}
	});

	/// Queries
	async module(id: string): Promise<Module | null> {
		//find module based on id
		if (id.length === 24) {
			return (await this.prisma.module.findFirst({
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
					feedback: {
						include: {
							student: {
								include: {
									social: true,
									plan: {
										include: {
											modules: true,
											assignmentResults: true
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
									}
								}
							}
						}
					},
					collections: true
				}
			})) as Prisma.ModuleGetPayload<{}>;
		} else {
			return await this.prisma.module.findFirst({
				where: {
					moduleNumber: parseInt(id)
				}
			});
		}
	}

	async modulesByParam(params: ModuleFields) {
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
			parentModules,
			subModules
		} = params;

		const payload = {
			...(id && { id }),
			...(moduleNumber && { moduleNumber }),
			...(moduleName && { moduleName }),
			...(description && { description }),
			...(intro && { intro }),
			...(numSlides && { numSlides }),
			...(createdAt && { createdAt }),
			...(updatedAt && { updatedAt })
		};

		let where: Prisma.ModuleWhereInput = {};

		where["AND"] = [];

		if (parentModules) {
			where.AND.push({
				parentModuleIDs: {
					hasEvery: parentModules
				}
			});
		}

		if (subModules) {
			where.AND.push({
				subModuleIDs: {
					hasEvery: subModules
				}
			});
		}

		if (members) {
			members.forEach((member) => {
				if (where.AND) {
					//TODO: Fix this type error thinking that AND is not an array
					// @ts-ignore
					where.AND.push({
						members: {
							some: {
								planID: member
							}
						}
					});
				}
			});
		}

		if (assignments) {
			payload["assignments"] = {
				some: {
					id: assignments
				}
			};
		}

		if (keywords) {
			payload["keywords"] = {
				hasEvery: keywords
			} as Prisma.ModuleWhereInput;
		}

		if (feedback) {
			payload["feedback"] = {
				some: {
					id: feedback!
				}
			} as Prisma.ModuleFeedbackListRelationFilter;
		}

		return await this.prisma.module.findMany({
			where: {
				...where,
				...payload
			},
			include: {
				assignments: true,
				members: {
					include: {
						module: true,
						plan: {
							include: {
								student: true
							}
						}
					}
				},
				feedback: true,
				parentModules: true,
				subModules: true
			}
		});
	}

	async course(id: string) {
		return this.prisma.course.findFirstOrThrow({
			where: {
				id
			},
			include: this.courseInclude
		});
	}

	async courses() {
		return this.prisma.course.findMany({
			include: this.courseInclude
		});
	}

	async courseByParam(params: CourseFields) {
		const { id, name, module } = params;

		const payload = {
			...(id && { id }),
			...(name && { name })
		};

		if (module) {
			payload["module"] = {
				some: {
					id: module
				}
			};
		}

		return this.prisma.course.findMany({
			where: payload,
			include: this.courseInclude
		});
	}

	async assignments() {
		return this.prisma.assignment.findMany({
			include: this.assignmentInclude
		});
	}

	async assignment(id: string) {
		return await this.prisma.assignment.findFirst({
			where: {
				id
			},
			include: this.assignmentInclude
		});
	}

	async assignmentByParam(params: AssignmentFields) {
		const { id, updatedAt, name, dueAt, module, assignmentResult } = params;

		const payload = {
			...(id && { id }),
			...(updatedAt && { updatedAt }),
			...(name && { name }),
			...(dueAt && { dueAt })
		};

		payload["moduleId"] = module ? module : undefined;
		payload["assignmentResults"] = assignmentResult
			? { some: { id: assignmentResult } }
			: undefined;

		const where = Prisma.validator<Prisma.AssignmentWhereInput>()({
			...payload
		});

		return this.prisma.assignment.findMany({
			where: where,

			include: this.assignmentInclude
		});
	}

	async moduleFeedbacks() {
		return this.prisma.moduleFeedback.findMany({
			include: {
				student: true,
				module: true
			}
		});
	}

	async modFeedbackByParam(params: ModFeedbackFields) {
		const { id, feedback, rating, student, module } = params;

		const payload = {
			...(id && { id }),
			...(feedback && { feedback }),
			...(rating && { rating })
		};

		payload["studentId"] = student ? student : undefined;
		payload["moduleId"] = module ? module : undefined;

		return this.prisma.moduleFeedback.findMany({
			where: payload,
			include: {
				student: true,
				module: true
			}
		});
	}

	async moduleFeedback(id: string) {
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
						assignmentResults: true
					}
				},
				gradedBy: true,
				assignment: true
			}
		});
	}

	async assignmentResult(id: string) {
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

	async assignmentResultByParam(params: AssignmentResFields) {
		const { id, submittedAt, result, feedback, student, gradedBy, assignment } =
			params;

		const payload = {
			...(id && { id }),
			...(submittedAt && { submittedAt }),
			...(result && { result }),
			...(feedback && { feedback })
		};

		payload["studentId"] = student ? student : undefined;
		payload["graderId"] = gradedBy ? gradedBy : undefined;
		payload["assignmentId"] = assignment ? assignment : undefined;

		return this.prisma.assignmentResult.findMany({
			where: payload,
			include: {
				student: true,
				gradedBy: true,
				assignment: true
			}
		});
	}

	/// Fetch all module enrollments in the database
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

	/// Fetch a moduleEnrollment by document ID
	async moduleEnrollment(id: string) {
		return this.prisma.moduleEnrollment.findFirst({
			where: {
				id
			}
		});
	}

	async modEnrollmentByParam(params: ModEnrollmentFields) {
		const { id, enrolledAt, role, module, plan } = params;

		const payload = {
			...(id && { id }),
			...(enrolledAt && { enrolledAt }),
			...(role && { role })
		};

		payload["moduleId"] = module ? module : undefined;
		payload["planId"] = plan ? plan : undefined;

		return this.prisma.moduleEnrollment.findMany({
			where: payload,
			include: {
				module: true,
				plan: true
			}
		});
	}

	async collections() {
		return this.prisma.collection.findMany({
			include: {
				lessons: true
			}
		});
	}

	async collection(id: string) {
		return this.prisma.collection.findFirst({
			where: {
				id
			},
			include: {
				lessons: true
			}
		});
	}

	//Fetch Lessons
	async lessons(input: LessonFields) {
		const { id, name, contentType, content, transcript, thread, collection } =
			input;

		const payload = {
			...(id && { id }),
			...(name && { name }),
			...(contentType && { contentType }),
			...(content && { content }),
			...(transcript && { transcript })
		};

		payload["collection"] = collection ? collection : undefined;
		payload["threads"] = thread ? { some: { id: thread } } : undefined;

		const where = Prisma.validator<Prisma.LessonWhereInput>()({
			...payload
		});

		return this.prisma.lesson.findMany({
			where: payload
		});
	}

	async createCollection({
		name,
		lessons,
		positionIndex,
		moduleID
	}: CreateCollectionArgs) {
		const create = Prisma.validator<Prisma.CollectionCreateInput>()({
			name,
			position: positionIndex,
			module: {
				connect: {
					id: moduleID
				}
			},
			lessons: {
				connect: lessons?.map((lesson) => {
					return { id: lesson };
				})
			}
		});
		return this.prisma.collection.create({
			data: create,
			include: {
				lessons: true
			}
		});
	}

	async updateCollection(id: string, data: Prisma.CollectionUpdateInput) {
		return this.prisma.collection.update({
			where: {
				id
			},
			data
		});
	}

	//Mutations

	/// Create a new module
	async addModule(data: Prisma.ModuleCreateInput) {
		//find out if there is a duplicate user
		const get = await this.prisma.module.findMany({
			where: {
				moduleNumber: data.moduleNumber
			}
		});
		if (get.length !== 0) {
			throw new Error("Module already exists.");
		} else {
			return this.prisma.module.create({
				data,
				include: {
					assignments: true,
					feedback: {
						include: {
							student: true
						}
					},
					members: {
						include: {
							plan: true
						}
					},
					collections: true
				}
			});
		}
	}

	/// Modify a modules data or add an assignment here
	async updateModule(data: UpdateModule) {
		const {
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
				module: {
					deleteMany: {}
				}
			},
			include: {
				module: true
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
		const { name, dueAt } = data;
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
	async addModuleEnrollment(input: ModuleEnrollmentInput) {
		const { plan, module, role, status } = input;

		let count = await this.prisma.moduleEnrollment.count({
			where: {
				planID: plan,
				moduleId: module
			}
		});

		if (count !== 0) {
			throw new Error("This Module Enrollment already exists");
		} else {
			const create = Prisma.validator<Prisma.ModuleEnrollmentCreateInput>()({
				module: {
					connect: {
						id: module
					}
				},
				plan: {
					connect: {
						id: plan
					}
				},
				role,
				status
			});

			return this.prisma.moduleEnrollment.create({
				data: create,
				include: {
					module: true,
					plan: true
				}
			});
		}
	}

	/// Update a ModuleEnrollment
	async updateModuleEnrollment(id: string, input: ModuleEnrollmentInput) {
		return this.prisma.moduleEnrollment.update({
			where: {
				id
			},
			data: {
				moduleId: input.module,
				planID: input.plan,
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
		let count = await this.prisma.module.count({
			where: {
				id: moduleId,
				course: {
					some: {
						id: courseId
					}
				}
			}
		});

		if (count != 0) {
			throw new Error("Module and Course are already Linked.");
		}

		await this.prisma.course.update({
			where: {
				id: courseId
			},
			data: {
				moduleIDs: {
					push: moduleId
				}
			}
		});

		return this.prisma.module.update({
			where: {
				id: moduleId
			},
			data: {
				courseIDs: {
					push: courseId
				}
			}
		});
	}

	async unpairCourseModule(courseId: string, moduleId: string) {
		const courseIdToRemove = await this.prisma.course.findUnique({
			where: {
				id: courseId
			}
		});

		const newModuleSet =
			courseIdToRemove !== null
				? courseIdToRemove.moduleIDs.filter((module) => module !== moduleId)
				: null;

		const moduleIdToRemove = await this.prisma.module.findUnique({
			where: {
				id: moduleId
			}
		});

		const newCourseSet =
			moduleIdToRemove !== null
				? moduleIdToRemove.courseIDs.filter((course) => course !== courseId)
				: null;

		await this.prisma.course.update({
			where: {
				id: courseId
			},
			data: {
				moduleIDs: newModuleSet !== null ? newModuleSet : undefined
			}
		});

		return this.prisma.module.update({
			where: {
				id: moduleId
			},
			data: {
				courseIDs: newCourseSet !== null ? newCourseSet : undefined
			}
		});
	}
	async createLesson(input: LessonInput) {
		const args = Prisma.validator<Prisma.LessonCreateArgs>()({
			data: {
				name: input.name,
				contentType: input.contentType,
				content: input.content,
				transcript: input.transcript,
				collection: {
					connect: {
						id: input.collection ? input.collection : undefined
					}
				}
			},
			include: {
				collection: true,
				threads: true
			}
		});

		return this.prisma.lesson.create({
			data: args.data,
			include: args.include
		});
	}

	async updateLesson(input: LessonFields) {
		const {
			id,
			name,
			contentType,
			content,
			transcript,
			// Threads are a list so how these are being updated is going to be a little strange.
			// The only thing i could think of is if these were a list of IDs in which case the threads
			// Being refererenced would all have to be modified in this update Lesson.
			// thread,
			collection,
			thread
		} = input;
		const payload = {
			...(id && { id }),
			...(name && { name }),
			...(contentType && { contentType }),
			...(content && { content }),
			...(transcript && { transcript }),
			...(thread && { thread }),
			...(collection && { collection })
		};

		const args = Prisma.validator<Prisma.LessonUpdateArgs>()({
			where: {
				id: payload.id
			},
			data: {
				name: payload.name,
				contentType: payload.contentType,
				content: payload.content,
				transcript: payload.transcript,
				collectionID: payload.collection,
				threads: {
					connect: {
						id: payload.thread
					}
				}
			},
			include: {
				collection: true,
				threads: true
			}
		});

		return this.prisma.lesson.update({
			where: args.where,
			data: args.data,
			include: args.include
		});
	}

	async deleteLesson(id: string) {
		return this.prisma.lesson.delete({
			where: {
				id
			}
		});
	}
}
