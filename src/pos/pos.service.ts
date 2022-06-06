import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma, PlanOfStudy } from "@prisma/client";
import { PlanInput } from "gql/graphql";
import { connect } from "mongoose";

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
				courses: {
					include: {
						course: true
					}
				},
				student: true
			}
		});
		return plans;
	}

	// Find a plan based on it's document ID
	async plan(id: string): Promise<PlanOfStudy | null> {
		const res = await this.prisma.planOfStudy.findUnique({
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
				courses: {
					include: {
						course: true
					}
				},
				student: true
			}
		});
		return res;
	}

	// TODO: figure out why this is not working
	// Find a plan based on the student's ID associated with the document
	async studentPlan(studentID: string): Promise<PlanOfStudy | null> {
		const res = await this.prisma.planOfStudy.findFirst({
			where: {
				studentID
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
				courses: {
					include: {
						course: true
					}
				},
				student: true
			}
		});

		return res;
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
				courses: true,
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
