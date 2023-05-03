import {
	AssignmentInput,
	CourseInput,
	SectionFeedbackUpdate,
	NewAssignment,
	UpdateSection,
	NewAssignmentResult,
	SectionEnrollmentInput,
	SectionFields,
	CourseFields,
	AssignmentFields,
	ModFeedbackFields,
	AssignmentResFields,
	ModEnrollmentFields,
	ModuleFields,
	SectionFeedback,
	CreateCollectionArgs,
	ModuleInput,
	CreateContentArgs,
	ContentFields,
	NewSection,
	CollectionFields,
	CreateLearningPathInput,
	PathInput,
	Course,
	LearningPath,
	Section,
	Collection
} from "@/types/graphql";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";

@Injectable()
export class ProgramService {
	constructor(private prisma: PrismaService) {}

	private contentInclude = Prisma.validator<Prisma.ContentInclude>()({
		parent: true
	});

	private assignmentInclude = Prisma.validator<Prisma.AssignmentInclude>()({
		section: true,
		assignmentResults: {
			include: {
				student: true,
				gradedBy: true,
				assignment: true
			}
		}
	});

	private courseInclude = Prisma.validator<Prisma.CourseInclude>()({
		sections: {
			include: {
				assignments: true,
				feedback: {
					include: {
						student: true,
						section: false
					}
				},
				members: {
					include: {
						section: false,
						plan: true
					}
				}
			}
		}
	});

	public sectionInclude = Prisma.validator<Prisma.SectionInclude>()({
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
		parentSections: true,
		subSections: true,
		collections: {
			include: {
				modules: {
					include: {
						content: true
					}
				}
			}
		},
		course: true
	});

	private sectionFeedbackInclude =
		Prisma.validator<Prisma.SectionFeedbackInclude>()({
			student: true,
			section: true
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
					section: true
				}
			}
		});

	public sectionEnrollmentInclude =
		Prisma.validator<Prisma.SectionEnrollmentInclude>()({
			plan: {
				include: {
					student: true
				}
			},
			moduleProgress: {
				include: {
					enrollment: {
						include: {
							section: true
						}
					},
					module: true
				}
			},
			section: {
				include: {
					parentSections: true,
					members: {
						include: {
							plan: {
								include: {
									student: true
								}
							}
						}
					},
					collections: {
						include: {
							modules: {
								include: {
									content: true,
									moduleProgress: {
										include: {
											enrollment: true
										}
									},
									collections: {
										include: {
											section: true
										}
									}
								}
							}
						}
					}
				}
			},
			progress: true
		});

	private collectionInclude = Prisma.validator<Prisma.CollectionInclude>()({
		section: true,
		modules: {
			include: {
				content: true
			}
		}
	});

	private moduleInclude = Prisma.validator<Prisma.ModuleInclude>()({
		content: true,
		collections: {
			include: {
				section: {
					include: {
						collections: {
							include: {
								modules: true
							}
						}
					}
				},
				modules: {
					include: {
						instructor: {
							include: {
								account: true
							}
						},
						moduleProgress: {
							include: {
								enrollment: true
							}
						}
					}
				}
			}
		},
		moduleProgress: {
			include: {
				enrollment: true
			}
		},
		instructor: {
			include: {
				account: true,
				instructedModules: true
			}
		}
	});

	private learningPathInclude = Prisma.validator<Prisma.LearningPathInclude>()({
		plan: {
			include: {
				student: true
			}
		}
	});

	async section(params: SectionFields) {
		const {
			id,
			sectionNumber,
			sectionName,
			description,
			intro,
			numSlides,
			keywords,
			createdAt,
			updatedAt,
			assignments,
			members,
			feedback,
			parentSections,
			objectives,
			subSections
		} = params;

		const payload = {
			...(id && { id }),
			...(sectionNumber && { sectionNumber }),
			...(sectionName && { sectionName }),
			...(description && { description }),
			...(intro && { intro }),
			...(numSlides && { numSlides }),
			...(createdAt && { createdAt }),
			...(updatedAt && { updatedAt })
		};

		// use the Prisma.sectionWhereInput type and remove the AND field. Then create a union type with the AND field added back in as an array of Prisma.sectionWhereInput
		const where: Omit<Prisma.SectionWhereInput, "AND"> & {
			AND: Array<Prisma.SectionWhereInput>;
		} = {
			AND: []
		};

		if (parentSections) {
			where.AND.push({
				parentSectionIDs: {
					hasEvery: parentSections
				}
			});
		}

		if (subSections) {
			where.AND.push({
				subSectionIDs: {
					hasEvery: subSections
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
			} as Prisma.SectionWhereInput["assignments"];
		}

		if (keywords) {
			payload["keywords"] = {
				hasEvery: keywords
			} as Prisma.SectionWhereInput["keywords"];
		}

		if (feedback) {
			payload["feedback"] = {
				some: {
					id: feedback
				}
			} as Prisma.SectionWhereInput["feedback"];
		}

		if (objectives) {
			payload["objectives"] = {
				hasSome: objectives
			} as Prisma.SectionWhereInput["objectives"];
		}

		return await this.prisma.section.findMany({
			where: {
				...where,
				...payload
			},
			include: this.sectionInclude
		});
	}

	async course(params: CourseFields) {
		const { id, name, section } = params;

		const payload = {
			...(id && { id }),
			...(name && { name })
		};

		if (section) {
			payload["section"] = {
				some: {
					id: section
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
		const {
			id,
			updatedAt,
			name,
			dueAt,
			contentURL,
			contentType,
			acceptedTypes,
			section,
			assignmentResult
		} = params;

		const payload = {
			...(id && { id }),
			...(updatedAt && { updatedAt }),
			...(name && { name }),
			...(dueAt && { dueAt }),
			...(contentURL && { contentURL }),
			...(contentType && { contentType }),
			...(acceptedTypes && { acceptedTypes })
		};

		payload["sectionId"] = section ? section : undefined;
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

	async sectionFeedback(params: ModFeedbackFields) {
		const { id, feedback, rating, student, section } = params;

		const payload = {
			...(id && { id }),
			...(feedback && { feedback }),
			...(rating && { rating })
		};

		payload["studentId"] = student ? student : undefined;
		payload["sectionId"] = section ? section : undefined;

		const where = Prisma.validator<Prisma.SectionFeedbackWhereInput>()({
			...payload
		});

		return this.prisma.sectionFeedback.findMany({
			where,
			include: this.sectionFeedbackInclude
		});
	}

	async assignmentResult(params: AssignmentResFields) {
		const {
			id,
			submittedAt,
			result,
			feedback,
			submissionURL,
			fileType,
			student,
			gradedBy,
			assignment
		} = params;

		const payload = {
			...(id && { id }),
			...(submittedAt && { submittedAt }),
			...(result && { result }),
			...(feedback && { feedback }),
			...(submissionURL && { submissionURL }),
			...(fileType && { fileType })
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

	async sectionEnrollment(params: ModEnrollmentFields) {
		const { id, enrolledAt, role, section, plan } = params;

		const payload = {
			...(id && { id }),
			...(enrolledAt && { enrolledAt }),
			...(role && { role })
		};

		payload["sectionId"] = section
			? section
			: (undefined as Prisma.SectionEnrollmentWhereInput["sectionId"]);
		payload["planID"] = plan
			? plan
			: (undefined as Prisma.SectionEnrollmentWhereInput["planID"]);

		const where = Prisma.validator<Prisma.SectionEnrollmentWhereInput>()({
			...payload
		});

		return this.prisma.sectionEnrollment.findMany({
			where,
			include: this.sectionEnrollmentInclude
		});
	}

	async collection(params: CollectionFields | null) {
		if (!params) {
			return this.prisma.collection.findMany({
				include: this.collectionInclude
			});
		}

		const { id, name, modules, sectionID, positionIndex } = params;

		const where = Prisma.validator<Prisma.CollectionWhereInput>()({
			...(id && { id }),
			...(name && {
				name: {
					contains: name
				}
			}),
			...(sectionID && { sectionID }),
			...(positionIndex && {
				position: {
					equals: positionIndex
				}
			})
		});

		// loop out of modules and check with and
		if (modules) {
			modules.map((module) => {
				where["AND"] = [
					{
						modules: {
							some: {
								id: module
							}
						}
					}
				] as Prisma.CollectionWhereInput["AND"];
			});
		}

		return this.prisma.collection.findMany({
			where,
			include: this.collectionInclude
		});
	}

	//Fetch modules
	async module(input: ModuleFields) {
		const { id, name, content, collection, position, objectives } = input;

		const where = Prisma.validator<Prisma.ModuleWhereInput>()({
			...(id && { id }),
			...(name && { name }),
			...(position && { position }),
			collections: { some: { id: collection ? collection : undefined } },
			content: content ? { some: { id: content } } : undefined,
			objectives: objectives ? { hasEvery: objectives } : undefined
		});

		return this.prisma.module.findMany({
			where,
			include: this.moduleInclude
		});
	}

	async content(input: ContentFields) {
		const { id, type, link, parent } = input;

		const where = Prisma.validator<Prisma.ContentWhereInput>()({
			...(id && { id }),
			...(type && { type }),
			...(link && { link }),
			...(parent && { parent: { id: parent } })
		});

		return this.prisma.content.findMany({
			where,
			include: this.contentInclude
		});
	}

	async createCollection({
		name,
		modules,
		positionIndex,
		sectionID
	}: CreateCollectionArgs) {
		const create = Prisma.validator<Prisma.CollectionCreateInput>()({
			name,
			position: positionIndex,
			section: {
				connect: {
					id: sectionID
				}
			},
			modules: {
				connect: modules?.map((module) => {
					return { id: module };
				})
			}
		});
		return this.prisma.collection.create({
			data: create,
			include: {
				modules: true
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

	/// Create a new section
	async addSection(data: NewSection) {
		const countArgs = Prisma.validator<Prisma.SectionFindManyArgs>()({
			where: {
				sectionNumber: data.sectionNumber
			}
		});
		//find out if there is a duplicate user
		const count = await this.prisma.section.count(countArgs);

		if (count !== 0) {
			throw new Error("Section already exists.");
		} else {
			const create = Prisma.validator<Prisma.SectionCreateInput>()({
				...data
			});
			return this.prisma.section.create({
				data: create,
				include: this.sectionInclude
			});
		}
	}

	/// Modify a sections data or add an assignment here
	async updateSection(data: UpdateSection) {
		const {
			sectionNumber,
			sectionName,
			description,
			duration,
			numSlides,
			keywords,
			objectives
		} = data;

		const args = Prisma.validator<Prisma.SectionUpdateArgs>()({
			where: {
				id: data.id
			},
			data: {
				...(sectionNumber && { sectionNumber }),
				...(sectionName && { sectionName }),
				...(description && { description }),
				...(duration && { duration }),
				...(numSlides && { numSlides }),
				...(keywords && { keywords }),
				...(objectives && { objectives })
			}
		});

		return this.prisma.section.update({
			where: args.where,
			data: args.data,
			include: this.sectionInclude
		});
	}

	/// Remove a section and all of its assignments
	async deleteSection(id: string) {
		await this.prisma.assignment.deleteMany({
			where: {
				sectionId: id
			}
		});

		return this.prisma.section.delete({
			where: {
				id: id
			}
		});
	}

	/// Create a course and assign an initial section to that course
	async addCourse(data: CourseInput) {
		return this.prisma.course.create({
			data: {
				name: data.name,
				sectionIDs: data.section,
				carnegieHours: data.carnegieHours,
				required: data.required
			},
			include: this.courseInclude
		});
	}

	async addManyCourses(data: CourseInput[]) {
		const manyData = Prisma.validator<Prisma.CourseCreateManyArgs>()({
			data: data.map((course) => {
				return {
					name: course.name,
					...(course.number && { number: course.number }),
					...(course.prefix && { prefix: course.prefix }),
					...(course.carnegieHours && {
						carnegieHours: course.carnegieHours
					}),
					...(course.required && { required: course.required })
				};
			})
		});
		return this.prisma.course.createMany({
			data: manyData.data
		});
	}

	async updateCourse(id: string, data: CourseInput) {
		const { name, section, required, carnegieHours } = data;
		return this.prisma.course.update({
			where: {
				id: id
			},
			data: {
				...(name && { name }),
				...(section && { section }),
				...(required && { required }),
				...(carnegieHours && { carnegieHours })
			},
			include: this.courseInclude
		});
	}

	async deleteCourse(id: string) {
		await this.prisma.course.update({
			where: {
				id
			},
			data: {
				sections: {
					deleteMany: {}
				}
			},
			include: this.courseInclude
		});

		return this.prisma.course.delete({
			where: {
				id
			}
		});
	}

	/// Remove an assignment from a section
	async deleteAssignment(section: string, id: string) {
		// Do something here to disconnect an assignment from a section
		return this.prisma.section.update({
			where: {
				id: section
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
				section: {
					connect: {
						id: input.section
					}
				},
				dueAt: input.dueAt,
				contentType: input.contentType,
				contentURL: input.contentURL,
				acceptedTypes: "DOC"
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

	/// Create a section feedback and link it to the user and section
	async addSectionFeedback(
		sectionId: string,
		userId: string,
		input: Prisma.SectionFeedbackCreateInput
	) {
		return this.prisma.section.update({
			where: {
				id: sectionId
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
			include: this.sectionInclude
		});
	}

	/// Update a section feedback
	async updateSectionFeedback(id: string, input: SectionFeedbackUpdate) {
		const { feedback, rating } = input;

		const update = Prisma.validator<Prisma.SectionFeedbackUpdateArgs>()({
			where: {
				id
			},
			data: {
				...(feedback && { feedback }),
				...(rating && { rating })
			}
		});

		return this.prisma.sectionFeedback.update({
			...update,
			include: this.sectionFeedbackInclude
		});
	}

	/// Delete a sectionFeedback
	async deleteSectionFeedback(id: string): Promise<SectionFeedback> {
		return this.prisma.sectionFeedback.delete({
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
				result: input.result,
				submissionURL: input.submissionURL,
				fileType: input.fileType
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

	/// Create a SectionEnrollment Document
	async addSectionEnrollment(input: SectionEnrollmentInput) {
		const { plan, section, role, status } = input;

		const count = await this.prisma.sectionEnrollment.count({
			where: {
				planID: plan,
				sectionId: section
			}
		});

		if (count !== 0) {
			throw new Error("This Section Enrollment already exists");
		} else {
			const create = Prisma.validator<Prisma.SectionEnrollmentCreateInput>()({
				section: {
					connect: {
						id: section
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

			return this.prisma.sectionEnrollment.create({
				data: create,
				include: this.sectionEnrollmentInclude
			});
		}
	}

	/// Update a SectionEnrollment
	async updateSectionEnrollment(id: string, input: SectionEnrollmentInput) {
		const args = Prisma.validator<Prisma.SectionEnrollmentUpdateArgs>()({
			where: {
				id
			},
			data: {
				sectionId: input.section,
				planID: input.plan,
				role: input.role
			}
		});

		return this.prisma.sectionEnrollment.update({
			where: args.where,
			data: args.data,
			include: this.sectionEnrollmentInclude
		});
	}

	async deleteSectionEnrollment(id: string) {
		return this.prisma.sectionEnrollment.delete({
			where: {
				id
			}
		});
	}

	// Link a course and a section
	async pairCourseSection(courseId: string, sectionId: string) {
		const count = await this.prisma.section.count({
			where: {
				id: sectionId,
				course: {
					some: {
						id: courseId
					}
				}
			}
		});

		if (count != 0) {
			throw new Error("Section and Course are already Linked.");
		}

		await this.prisma.course.update({
			where: {
				id: courseId
			},
			data: {
				sectionIDs: {
					push: sectionId
				}
			}
		});

		return this.prisma.section.update({
			where: {
				id: sectionId
			},
			data: {
				courseIDs: {
					push: courseId
				}
			},
			include: this.sectionInclude
		});
	}

	async unpairCourseSection(courseId: string, sectionId: string) {
		const courseIdToRemove = await this.prisma.course.findUnique({
			where: {
				id: courseId
			}
		});

		const newSectionSet =
			courseIdToRemove !== null
				? courseIdToRemove.sectionIDs.filter((section) => section !== sectionId)
				: null;

		const sectionIdToRemove = await this.prisma.section.findUnique({
			where: {
				id: sectionId
			}
		});

		const newCourseSet =
			sectionIdToRemove !== null
				? sectionIdToRemove.courseIDs.filter((course) => course !== courseId)
				: null;

		await this.prisma.course.update({
			where: {
				id: courseId
			},
			data: {
				sectionIDs: newSectionSet !== null ? newSectionSet : undefined
			}
		});

		return this.prisma.section.update({
			where: {
				id: sectionId
			},
			data: {
				courseIDs: newCourseSet !== null ? newCourseSet : undefined
			}
		});
	}
	async createModule(input: ModuleInput) {
		//TODO: Support Modules being added in the middle of an existing collection (i.e new module at index 4 needs to shift right starting from original index 4)
		const args = Prisma.validator<Prisma.ModuleCreateArgs>()({
			data: {
				name: input.name,
				...(input.content !== null &&
					input.content !== undefined && {
						content: {
							connect: {
								id: input.content
							}
						}
					}),
				collections: {
					connect: {
						id: input.collection ? input.collection : undefined
					}
				},
				position: input.position ? input.position : undefined,
				objectives: input.objectives ? input.objectives : undefined,
				hours: input.hours
			},
			include: this.moduleInclude
		});

		return this.prisma.module.create({
			data: args.data,
			include: args.include
		});
	}

	async updateModule(input: ModuleFields, replaceObj: boolean) {
		const {
			id,
			name,
			// TODO: Allow for list fields to be updated
			// content,
			// Threads are a list so how these are being updated is going to be a little strange.
			// The only thing i could think of is if these were a list of IDs in which case the threads
			// Being refererenced would all have to be modified in this update Module.
			// thread,
			collection,
			objectives,
			hours
		} = input;

		const newObjectives = objectives;
		// Check that they passed in objectives, an ID and they are NOT replacing the list
		if (newObjectives && id && !replaceObj) {
			const current = await this.prisma.module.findUnique({
				where: {
					id
				}
			});
			if (current) {
				// Check if the value is already in the list if its not add it
				current.objectives.map((value) => {
					if (!newObjectives.includes(value)) {
						newObjectives.push(value);
					}
				});
			}
		}

		const payload = {
			...(id && { id }),
			...(name && { name }),
			...(collection && { collection }),
			...(hours && { hours })
		};

		const args = Prisma.validator<Prisma.ModuleUpdateArgs>()({
			where: {
				id: payload.id
			},
			data: {
				name: payload.name,
				collectionIDs: {
					push: payload.collection
				},
				position: input.position ? input.position : undefined,
				objectives: newObjectives ? newObjectives : undefined,
				hours: payload.hours
			}
		});

		return this.prisma.module.update({
			where: args.where,
			data: args.data,
			include: this.moduleInclude
		});
	}

	async deleteModule(id: string) {
		// TODO: Shift left remaining modules in the parent collection after deletion.
		return this.prisma.module.delete({
			where: {
				id
			}
		});
	}

	async createContent(input: CreateContentArgs) {
		const { type, link, parent, primary } = input;

		const data = Prisma.validator<Prisma.ContentCreateInput>()({
			type,
			link,
			parent: {
				connect: {
					id: parent
				}
			},
			primary
		});

		return this.prisma.content.create({
			data,
			include: this.contentInclude
		});
	}

	async updateContent(input: ContentFields) {
		const { id, type, link, parent, primary } = input;

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
				parent: parent ? { connect: { id: parent } } : undefined,
				primary: primary !== null ? primary : undefined
			},
			include: this.contentInclude
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

	async addObjectives(id: string, input: string[]) {
		const section = await this.prisma.section.findUnique({
			where: {
				id
			}
		});

		if (section === null) {
			throw new Error("Section not found");
		}

		const objectives = [...section.objectives, input] as Array<string>;

		return this.prisma.section.update({
			where: {
				id: id
			},
			data: {
				objectives: {
					set: objectives
				}
			}
		});
	}

	async learningPath(planID: string) {
		const lps = await this.prisma.learningPath.findMany({
			where: {
				planID
			},
			include: this.learningPathInclude
		});

		const courses: Array<string> = [];
		const modules: Array<string> = [];
		const sections: Array<string> = [];
		const collections: Array<string> = [];

		lps.map((lp) => {
			lp.paths.map((path) => {
				courses.push(path.course.id);
				path.course.sections.map((section) => {
					section.collections.map((collection) => {
						collection.modules.map((module) => {
							modules.push(module.id);
						});
						collections.push(collection.id);
					});
					sections.push(section.id);
				});
			});
		});

		const courseIDs = [...new Set(courses)];
		const moduleIDs = [...new Set(modules)];
		const sectionIDs = [...new Set(sections)];
		const collectionIDs = [...new Set(collections)];

		const coursesData = await this.prisma.course.findMany({
			where: {
				id: {
					in: courseIDs
				}
			},
			include: this.courseInclude
		});

		const modulesData = await this.prisma.module.findMany({
			where: {
				id: {
					in: moduleIDs
				}
			},
			include: this.moduleInclude
		});

		const sectionsData = await this.prisma.section.findMany({
			where: {
				id: {
					in: sectionIDs
				}
			},
			include: this.sectionInclude
		});

		const collectionsData = await this.prisma.collection.findMany({
			where: {
				id: {
					in: collectionIDs
				}
			}
		});

		const courseMap = new Map();
		const moduleMap = new Map();
		const sectionMap = new Map();
		const collectionMap = new Map();

		coursesData.map((course) => {
			courseMap.set(course.id, course);
		});

		modulesData.map((module) => {
			moduleMap.set(module.id, module);
		});

		sectionsData.map((section) => {
			sectionMap.set(section.id, section);
		});

		collectionsData.map((collection) => {
			collectionMap.set(collection.id, collection);
		});

		const paths = lps.map((lp) => {
			const paths = lp.paths.map((path) => {
				const course = courseMap.get(path.course.id) as Course;
				return {
					...path,
					course: {
						...course,
						sections: path.course.sections.map((section) => {
							const sect = sectionMap.get(section.id) as Section;
							return {
								...sect,
								name: sect.sectionName,
								collections: section.collections.map((collection) => {
									const col = collectionMap.get(collection.id) as Collection;
									return {
										...col,
										modules: collection.modules.map((module) => {
											return {
												...moduleMap.get(module.id)
											};
										})
									};
								})
							};
						})
					}
				};
			});
			return {
				...lp,
				paths
			};
		});

		return paths as Array<LearningPath>;
	}

	async createLearningPath(planID: string, input: CreateLearningPathInput) {
		// validate course ID passed in
		// validate section IDs passed in
		// validate collection IDs passed in
		// validate module IDs passed in
		// if all validations pass
		// create module enrollment for each module in the learning path
		// store the enrollment ID in the module composite type
		// create learning path
		// else return a validation error

		const { path, paths } = input;

		// handle multiple path creation
		if (paths && !path) {
			const courses = await this.prisma.course.findMany({
				where: {
					id: {
						in: paths.map((path) => path.course.id)
					}
				}
			});

			if (courses.length !== paths.length) {
				return new Error("Not all courses could be found");
			}
		}

		// handle single path creation
		if (path && !paths) {
			const course = await this.prisma.course.findUnique({
				where: {
					id: path.course.id
				}
			});

			if (!course) {
				return new Error("Course not found");
			}

			const pathData = Prisma.validator<Prisma.LearningPathCreateInput>()({
				plan: {
					connect: {
						id: planID
					}
				},
				paths: {
					id: faker.database.mongodbObjectId(),
					learningOutcomes: path.learningOutcomes || [],
					hoursSatisfies: path.hoursSatisfies || 1,
					course: {
						id: path.course.id,
						sections: path.course.sections.map((section) => {
							return {
								id: section.id,
								name: section.name,
								collections: section.collections.map((collection) => {
									return {
										id: collection.id,
										name: collection.name,
										modules: collection.modules.map((module) => {
											return {
												id: module.id,
												enrollmentID: ""
											};
										})
									};
								})
							};
						})
					}
				}
			});

			return this.prisma.learningPath.create({
				data: pathData,
				include: this.learningPathInclude
			});
		}
	}

	async createPath(planID: string, input: PathInput) {
		// get base LP data so we can persist the old paths and add the new one
		const LP = await this.prisma.learningPath.findMany({
			where: {
				planID
			}
		});

		if (LP.length !== 1) {
			return new Error("The learning path you choose could not be found");
		}

		const { status, course, learningOutcomes, hoursSatisfies } = input;

		// getting the course data so we can validate and populate in the path
		const courseData = await this.prisma.course.findMany({
			where: {
				id: course.id
			}
		});

		if (courseData.length !== 1) {
			return new Error("The course you choose could not be found");
		}

		const pathData = Prisma.validator<Prisma.PathCreateInput>()({
			id: faker.database.mongodbObjectId(),
			learningOutcomes: learningOutcomes || [],
			hoursSatisfies: hoursSatisfies || 1,
			status: status || "DRAFT",
			course: {
				id: course.id,
				sections: course.sections.map((section) => {
					return {
						id: section.id,
						name: section.name,
						collections: section.collections.map((collection) => {
							return {
								id: collection.id,
								name: collection.name,
								modules: collection.modules.map((module) => {
									return {
										id: module.id,
										enrollmentID: ""
									};
								})
							};
						})
					};
				})
			}
		});

		const paths = [...LP[0].paths, pathData];

		return this.prisma.learningPath.update({
			where: {
				planID
			},
			data: {
				paths: paths
			},
			include: this.learningPathInclude
		});
	}

	async updateLearningPath(planID: string, pathID: string, input: PathInput) {
		const { status, course, learningOutcomes, hoursSatisfies } = input;

		const courseData = await this.prisma.course.findMany({
			where: {
				id: course.id
			}
		});

		if (courseData.length !== 1) {
			return new Error("The course you choose could not be found");
		}

		// needed to include the select statement here since we only want to update those two fields
		const lpData = await this.prisma.learningPath.findMany({
			where: {
				planID
			},
			select: {
				createdAt: true,
				paths: true
			}
		});

		if (lpData.length !== 1) {
			return new Error("The learning path you choose could not be found");
		}

		const pathData = lpData[0].paths.filter((path) => path.id === pathID)[0];

		// by referencing the pathData here, we are able to save the old data that was present in the path
		let pathPayload = {
			...pathData,
			...(hoursSatisfies && { hoursSatisfies }),
			...(learningOutcomes && { learningOutcomes }),
			...(status && { status })
		} as Prisma.PathCreateInput;

		const updatedSectionsArray = course.sections.map(
			(section, sectionIndex) => {
				if (section.id !== pathData.course.sections[sectionIndex].id) {
					return {
						id: section.id,
						name: section.name,
						collections: []
					};
				} else {
					const updatedCollectionsArray = section.collections.map(
						(collection, collectionIndex) => {
							if (
								collection.id !==
								pathData.course.sections[sectionIndex].collections[
									collectionIndex
								].id
							) {
								return {
									id: collection.id,
									name: collection.name,
									modules: []
								};
							} else {
								const updatedModulesArray = collection.modules.map(
									(module, moduleIndex) => {
										if (
											module.id !==
											pathData.course.sections[sectionIndex].collections[
												collectionIndex
											].modules[moduleIndex].id
										) {
											return {
												id: module.id,
												enrollmentID: ""
											};
										} else {
											return {
												id: module.id,
												enrollmentID:
													pathData.course.sections[sectionIndex].collections[
														collectionIndex
													].modules[moduleIndex].enrollmentID
											};
										}
									}
								);
								return {
									id: collection.id,
									name: collection.name,
									modules: updatedModulesArray
								};
							}
						}
					);
					return {
						id: section.id,
						name: section.name,
						collections: updatedCollectionsArray
					};
				}
			}
		);

		pathPayload = {
			...pathPayload,
			course: {
				id: courseData[0].id,
				sections: updatedSectionsArray
			}
		};

		// we map over the existing learning paths and replace the one we are updating with the new data but keeping the old ones
		const lpPayload = {
			...lpData[0],
			paths: lpData[0].paths.map((path) => {
				if (path.id !== pathID) {
					return path;
				} else {
					return pathPayload;
				}
			})
		} as Prisma.LearningPathUpdateInput;

		return this.prisma.learningPath.update({
			where: {
				planID
			},
			data: lpPayload
		});
	}

	async deleteLearningPath(planID: string, pathID: string) {
		const lpData = await this.prisma.learningPath.findMany({
			where: {
				planID
			},
			select: {
				createdAt: true,
				paths: true
			}
		});

		if (lpData.length !== 1) {
			return new Error("The learning path you choose could not be found");
		}

		const lpPayload = {
			...lpData[0],
			paths: lpData[0].paths.filter((path) => path.id !== pathID)
		} as Prisma.LearningPathUpdateInput;

		return this.prisma.learningPath.update({
			where: {
				planID
			},
			data: lpPayload
		});
	}
}
