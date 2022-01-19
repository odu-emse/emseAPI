import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma, PlanOfStudy } from "@prisma/client";
import { PlanInput } from "src/gql/graphql";
import { connect } from "mongoose";

@Injectable()
export class PoSService {
	constructor(private prisma: PrismaService) {}

	// ✅ Find all plans recorded in the system
	async plans(): Promise<PlanOfStudy[]> {
		const plans = await this.prisma.planOfStudy.findMany({
			include: {
				modules: true,
				assignmentResults: true,
				courses: true,
				student: true
			}
		});
		return plans;
	}

	// Find a plan based on it's document ID
	async planById(id: string): Promise<PlanOfStudy | null> {
		const res = await this.prisma.planOfStudy.findUnique({
			where: {
				id,
			},
			include: {
				modules: true,
				assignmentResults: true,
				courses: true,
				student: true

			}
		});
		return res;
	}

	// TODO: figure out why this is not working
	// Find a plan based on the student's ID associated with the document
	async plan(studentID: string): Promise<PlanOfStudy | null> {
		const res = await this.prisma.planOfStudy.findFirst({
			where: {
				studentID,
			},
			include: {
				modules: true,
				assignmentResults: true,
				courses: true,
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
				student: true,
				assignmentResults: true
			}
		})
	}

	// TODO: Handle connections to modules, courses and assignment results
	async updatePlan(id: string, input: PlanInput) {

		return this.prisma.planOfStudy.update({
			where: {
				id
			},
			data: {
				studentID: input.student,
			},
			include: {
				student: true,
				assignmentResults: true
			}
		})

	}

	async deletePlan(id: string) {
		return this.prisma.planOfStudy.delete({
			where: {
				id
			},
		});
	}
}
