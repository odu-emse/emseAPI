import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma, PlanOfStudy } from "@prisma/client";
import { PlanInput, PlanFields } from "gql/graphql";

@Injectable()
export class PoSService {
	constructor(private prisma: PrismaService) {}

	// ✅ Find all plans recorded in the system
	async plans(): Promise<PlanOfStudy[]> {
		const plans = await this.prisma.planOfStudy.findMany({
			include: {
				modules: {
					include: {
						module: true
					}
				},
				assignmentResults: true,
				student: true
			}
		});
		return plans;
	}

	// Find a plan based on it's document ID
	async plan(id: string): Promise<PlanOfStudy | null> {
		return await this.prisma.planOfStudy.findUnique({
			where: {
				id
			},
			include: {
				modules: {
					include: {
						module: true,
						plan: true
					}
				},
				assignmentResults: {
					include: {
						assignment: true,
						gradedBy: true
					}
				},
				student: true
			}
		});
	}

	// Find a plan based on the student's ID associated with the document
	async studentPlan(studentID: string): Promise<PlanOfStudy | null> {
		return await this.prisma.planOfStudy.findFirst({
			where: {
				studentID
			},
			include: {
				modules: {
					include: {
						module: {
							include: {
								feedback: true,
								assignments: true,
								members: true,
								parentCourses: {
									include: {
										course: true
									}
								}
							}
						},
						plan: true
					}
				},
				assignmentResults: {
					include: {
						assignment: true,
						gradedBy: true
					}
				},
				student: true
			}
		});
	}

	async planByParams(params: PlanFields): Promise<PlanOfStudy[] | null> {
		const {
			id,
			student,
			module,
			assignmentResult,
			modulesLeft
		} = params

		const payload = {
			...(id && {id})
		}
		if (student) {
			payload['studentId'] = student
		}

		if (module) {
			payload['modules'] = {
				some: {
					id: module
				}
			}
		}
		if (assignmentResult) {
			payload['assignmentResults'] = {
				some: {
					id: assignmentResult
				}
			}
		}
		if (modulesLeft) {
			payload['modulesLeft'] = {
				some: {
					id: modulesLeft
				}
			}
		}

		return this.prisma.planOfStudy.findMany({
			where: payload,
			include: {
				student: true,
				modules: true,
				assignmentResults: true,
				modulesleft: true
			}
		})
	}

	// TODO: Allow for starting modules and courses
	async addPlan(input: PlanInput) {
		return this.prisma.planOfStudy.create({
			data: {
				studentID: input.student
			},
			include: {
				student: true
			}
		});
	}

	// TODO: Handle connections to modules, courses and assignment results
	async updatePlan(id: string, input: PlanInput) {
		return this.prisma.planOfStudy.update({
			where: {
				id
			},
			data: {
				studentID: input.student
			},
			include: {
				modules: true,
				assignmentResults: true,
				student: true
			}
		});
	}

	async deletePlan(id: string) {
		return this.prisma.planOfStudy.delete({
			where: {
				id
			}
		});
	}
}
