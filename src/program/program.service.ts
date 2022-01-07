import { AssignmentInput, CourseInput, UpdateModule } from "./../gql/graphql";
import { Injectable } from "@nestjs/common";
import { Module, Course, Assignment, ModuleInCourse } from "@prisma/client";
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
				parentCourses: true
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
					// parentCourses: true

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
				modules: true
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
			assignment,
		} = data

		let assignmentPayload = {};

		//Add assignments 
		if (assignment) {
			// assignmentPayload.
			assignmentPayload = {
				createMany: {
					data: [
						{
							name: assignment.name,
							dueAt: assignment.dueAt,
							// module: {
							// 	connect: id
							// }
						}
					],
				}
			};	
		}

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
				assignments: assignmentPayload,
			},
			include: {
				assignments: true,
				// parentCourses: true 
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
	async addCourse(moduleId: string, data: Prisma.CourseCreateInput): Promise<Course | Error> {
		//Probably need some error checking here to make sure the module actually exists
		
		//Make a new course
		return await this.prisma.course.create({
			data: {
				// Set the name
				name: data.name,
				//Set the list of modules
				modules: {
					//Create new object for this field
					create: [
						{
							//Set the module property of this field
							module: {
								//To be a connection to the module with the ID provided in parameter
								connect: {
									id: moduleId
								}
							}
						}
					]
				}
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

}
