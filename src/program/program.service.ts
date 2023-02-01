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
	CreateContentArgs,
	ContentFields,
	NewModule
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

	private moduleInclude = Prisma.validator<Prisma.ModuleInclude>()({
		members: {
			include: {
				plan: {
					include: {
						student: true
					}
				},
				progress: true
			}
		},
		assignments: {
			include: {
				assignmentResults: {
					include: {
						student: {
							include: {
								student: true
							}
						},
						gradedBy: {
							include: {
								social: true,
								instructorProfile: true
							}
						}
					}
				}
			}
		},
		feedback: {
			include: {
				student: true
			}
		},
		parentModules: true,
		subModules: true,
		collections: {
			include: {
				lessons: {
					include: {
						threads: {
							include: {
								author: true,
								comments: true,
								usersWatching: true,
								parentThread: true
							}
						},
						content: true
					}
				}
			}
		},
		course: true
	});

	private moduleFeedbackInclude =
		Prisma.validator<Prisma.ModuleFeedbackInclude>()({
			student: true,
			module: true
		});

	private assignmentResultInclude =
		Prisma.validator<Prisma.AssignmentResultInclude>()({
			student: {
				include: {
					student: true
				}
			},
			gradedBy: true,
			assignment: {
				include: {
					module: true
				}
			}
		});

	private moduleEnrollmentInclude =
		Prisma.validator<Prisma.ModuleEnrollmentInclude>()({
			plan: {
				include: {
					student: true
				}
			},
			module: true,
			progress: true
		});

	private collectionInclude = Prisma.validator<Prisma.CollectionInclude>()({
		module: true,
		lessons: {
			include: {
				content: true,
				threads: {
					include: {
						author: true,
						usersWatching: true,
						parentThread: true,
						comments: true
					}
				}
			}
		}
	});

	private lessonInclude = Prisma.validator<Prisma.LessonInclude>()({
		content: true,
		threads: {
			include: {
				author: true,
				usersWatching: true,
				parentThread: true,
				comments: true
			}
		}
	});

	async module(params: ModuleFields) {
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
			objectives,
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

		// use the Prisma.ModuleWhereInput type and remove the AND field. Then create a union type with the AND field added back in as an array of Prisma.ModuleWhereInput
		const where: Omit<Prisma.ModuleWhereInput, "AND"> & {
			AND: Array<Prisma.ModuleWhereInput>;
		} = {
			AND: []
		};

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
			} as Prisma.ModuleWhereInput["assignments"];
		}

		if (keywords) {
			payload["keywords"] = {
				hasEvery: keywords
			} as Prisma.ModuleWhereInput["keywords"];
		}

		if (feedback) {
			payload["feedback"] = {
				some: {
					id: feedback!
				}
			} as Prisma.ModuleWhereInput["feedback"];
		}

		if (objectives) {
			payload["objectives"] = {
				hasSome: objectives
			} as Prisma.ModuleWhereInput["objectives"];
		}

		return await this.prisma.module.findMany({
			where: {
				...where,
				...payload
			},
			include: this.moduleInclude
		});
	}

	async course(params: CourseFields) {
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

		const where = Prisma.validator<Prisma.CourseWhereInput>()({
			...payload
		});

		return this.prisma.course.findMany({
			where,
			include: this.courseInclude
		});
	}

	async assignment(params: AssignmentFields) {
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
			where,
			include: this.assignmentInclude
		});
	}

	async moduleFeedback(params: ModFeedbackFields) {
		const { id, feedback, rating, student, module } = params;

		const payload = {
			...(id && { id }),
			...(feedback && { feedback }),
			...(rating && { rating })
		};

		payload["studentId"] = student ? student : undefined;
		payload["moduleId"] = module ? module : undefined;

		const where = Prisma.validator<Prisma.ModuleFeedbackWhereInput>()({
			...payload
		});

		return this.prisma.moduleFeedback.findMany({
			where,
			include: this.moduleFeedbackInclude
		});
	}

	async assignmentResult(params: AssignmentResFields) {
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

		const where = Prisma.validator<Prisma.AssignmentResultWhereInput>()({
			...payload
		});

		return this.prisma.assignmentResult.findMany({
			where,
			include: this.assignmentResultInclude
		});
	}

	async moduleEnrollment(params: ModEnrollmentFields) {
		const { id, enrolledAt, role, module, plan } = params;

		const payload = {
			...(id && { id }),
			...(enrolledAt && { enrolledAt }),
			...(role && { role })
		};

		payload["moduleId"] = module ? module : undefined;
		payload["planId"] = plan ? plan : undefined;

		const where = Prisma.validator<Prisma.ModuleEnrollmentWhereInput>()({
			...payload
		});

		return this.prisma.moduleEnrollment.findMany({
			where,
			include: this.moduleEnrollmentInclude
		});
	}

	// TODO: Add Compound Query for collections
	async collections() {
		return this.prisma.collection.findMany({
			include: this.collectionInclude
		});
	}

	async collection(id: string) {
		return this.prisma.collection.findFirst({
			where: {
				id
			},
			include: this.collectionInclude
		});
	}

	//Fetch Lessons
	async lesson(input: LessonFields) {
		const { id, name, content, transcript, thread, collection, position } =
			input;

		const where = Prisma.validator<Prisma.LessonWhereInput>()({
			...(id && { id }),
			...(name && { name }),
			...(transcript && { transcript }),
			...(position && { position }),
			collection: { id: collection ? collection : undefined },
			threads: thread ? { some: { id: thread } } : undefined,
			content: content ? { some: { id: content } } : undefined
		});

		return this.prisma.lesson.findMany({
			where,
			include: this.lessonInclude
		});
	}

	async content(input: ContentFields) {
		const { id, type, link, parent } = input;

		const where = Prisma.validator<Prisma.ContentWhereInput>()({
			...(id && { id }),
			...(type && { type }),
			...(link && { link }),
			parent: { id: parent ? parent : undefined }
		});

		return this.prisma.content.findMany({
			where
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
			data,
			include: this.collectionInclude
		});
	}

	//Mutations

	/// Create a new module
	async addModule(data: NewModule) {
		const countArgs = Prisma.validator<Prisma.ModuleFindManyArgs>()({
			where: {
				moduleNumber: data.moduleNumber
			}
		});
		//find out if there is a duplicate user
		const count = await this.prisma.module.count(countArgs);

		if (count !== 0) {
			throw new Error("Module already exists.");
		} else {
			const create = Prisma.validator<Prisma.ModuleCreateInput>()({
				...data
			});
			return this.prisma.module.create({
				data: create,
				include: this.moduleInclude
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

		const args = Prisma.validator<Prisma.ModuleUpdateArgs>()({
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
			}
		});

		return this.prisma.module.update({
			where: args.where,
			data: args.data,
			include: this.moduleInclude
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
		return await this.prisma.course.create({
			data: {
				name: data.name
			},
			include: this.courseInclude
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
			},
			include: this.courseInclude
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
			include: this.courseInclude
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
			},
			include: this.assignmentInclude
		});
	}

	/// Change an assignments data
	async updateAssignment(id: string, data: AssignmentInput) {
		const { name, dueAt } = data;

		const args = Prisma.validator<Prisma.AssignmentUpdateArgs>()({
			where: {
				id: id
			},
			data: {
				...(name && { name }),
				...(dueAt && { dueAt })
			}
		});

		return this.prisma.assignment.update({
			where: args.where,
			data: args.data,
			include: this.assignmentInclude
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
			include: this.moduleInclude
		});
	}

	/// Update a module feedback
	async updateModuleFeedback(
		id: string,
		input: ModuleFeedbackUpdate
	): Promise<ModuleFeedback> {
		const { feedback, rating } = input;

		const update = Prisma.validator<Prisma.ModuleFeedbackUpdateInput>()({
			...(feedback && { feedback }),
			...(rating && { rating })
		});

		return this.prisma.moduleFeedback.update({
			where: {
				id
			},
			data: update,
			include: this.moduleFeedbackInclude
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
			},
			include: this.assignmentResultInclude
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
			},
			include: this.assignmentResultInclude
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

		const count = await this.prisma.moduleEnrollment.count({
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
				include: this.moduleEnrollmentInclude
			});
		}
	}

	/// Update a ModuleEnrollment
	async updateModuleEnrollment(id: string, input: ModuleEnrollmentInput) {
		const args = Prisma.validator<Prisma.ModuleEnrollmentUpdateArgs>()({
			where: {
				id
			},
			data: {
				moduleId: input.module,
				planID: input.plan,
				role: input.role
			}
		});

		return this.prisma.moduleEnrollment.update({
			where: args.where,
			data: args.data,
			include: this.moduleEnrollmentInclude
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
		const count = await this.prisma.module.count({
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
			},
			include: this.moduleInclude
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
		//TODO: Support Lessons being added in the middle of an existing collection (i.e new lesson at index 4 needs to shift right starting from original index 4)
		const args = Prisma.validator<Prisma.LessonCreateArgs>()({
			data: {
				name: input.name,
				content: {
					connect: {
						id: input.content ? input.content : undefined
					}
				},
				transcript: input.transcript,
				collection: {
					connect: {
						id: input.collection ? input.collection : undefined
					}
				},
				position: input.position ? input.position : undefined
			},
			include: this.lessonInclude
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
			// TODO: Allow for list fields to be updated
			// content,
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
				transcript: payload.transcript,
				collectionID: payload.collection,
				threads: {
					connect: {
						id: payload.thread
					}
				},
				position: input.position ? input.position : undefined
			}
		});

		return this.prisma.lesson.update({
			where: args.where,
			data: args.data,
			include: this.lessonInclude
		});
	}

	async deleteLesson(id: string) {
		// TODO: Shift left remaining lessons in the parent collection after deletion.
		return this.prisma.lesson.delete({
			where: {
				id
			}
		});
	}

	async createContent(input: CreateContentArgs) {
		const { type, link, parent } = input;

		const data = Prisma.validator<Prisma.ContentCreateInput>()({
			type,
			link,
			parent: {
				connect: {
					id: parent
				}
			}
		});

		return this.prisma.content.create({
			data
		});
	}

	async updateContent(input: ContentFields) {
		const { id, type, link, parent } = input;

		if (!id) {
			throw new Error("Id not provided to updateContent");
		}

		const data = Prisma.validator<Prisma.ContentUpdateArgs>()({
			where: {
				id: id
			},
			data: {
				...(type && { type }),
				...(link && { link }),
				parent: parent ? { connect: { id: parent } } : undefined
			}
		});

		return this.prisma.content.update(data);
	}

	async deleteContent(contentID: string) {
		return this.prisma.content.delete({
			where: {
				id: contentID
			}
		});
	}
}
