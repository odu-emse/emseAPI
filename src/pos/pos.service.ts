import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma, PlanOfStudy } from "@prisma/client";

@Injectable()
export class PoSService {
	constructor(private prisma: PrismaService) {}

	// ✅ Find all plans recorded in the system
	async findMany(): Promise<PlanOfStudy[]> {
		const plans = await this.prisma.planOfStudy.findMany();
		return plans;
	}

	// Find a plan based on it's document ID
	async findByPlanId(id: string): Promise<PlanOfStudy> {
		const res = await this.prisma.planOfStudy.findUnique({
			where: {
				id,
			},
		});
		return res;
	}

	// TODO: figure out why this is not working
	// Find a plan based on the student's ID associated with the document
	async findByStudentID(studentID: string): Promise<PlanOfStudy> {
		const res = await this.prisma.planOfStudy.findFirst({
			where: {
				studentID,
			},
		});

		return res;
	}
}
