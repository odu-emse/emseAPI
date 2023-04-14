import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { PlanOfStudy, Prisma } from "@prisma/client";
import { PlanInput, PlanFields } from "@/types/graphql";

@Injectable()
export class PoSService {
	constructor(private prisma: PrismaService) {}

	private PlanOfStudyInclude = Prisma.validator<Prisma.PlanOfStudyInclude>()({
		sections: {
			include: {
				section: {
					include: {
						feedback: true,
						assignments: true,
						members: true
						// parentCourses: {
						// 	include: {
						// 		course: true
						// 	}
						// }
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
	});

	//✅ Find all plans recorded in the system
	async plans(): Promise<PlanOfStudy[]> {
		return await this.prisma.planOfStudy.findMany({
			include: this.PlanOfStudyInclude
		});
	}

	// Find a plan based on it's document ID
	async plan(id: string): Promise<PlanOfStudy | null> {
		return await this.prisma.planOfStudy.findUnique({
			where: {
				id
			},
			include: this.PlanOfStudyInclude
		});
	}

	// Find a plan based on the student's ID associated with the document
	async studentPlan(studentID: string): Promise<PlanOfStudy | null> {
		return await this.prisma.planOfStudy.findFirst({
			where: {
				studentID
			},
			include: this.PlanOfStudyInclude
		});
	}

	async planByParams(params: PlanFields) {
		const { id, student, section, assignmentResult, sectionsLeft } = params;

		const payload = {
			...(id && { id })
		};
		if (student) {
			payload["studentId"] = student;
		}

		if (section) {
			payload["sections"] = {
				some: {
					id: section
				}
			};
		}
		if (assignmentResult) {
			payload["assignmentResults"] = {
				some: {
					id: assignmentResult
				}
			};
		}
		if (sectionsLeft) {
			payload["sectionsLeft"] = {
				some: {
					id: sectionsLeft
				}
			};
		}

		const where = Prisma.validator<Prisma.PlanOfStudyWhereInput>()({
			...payload
		});

		const res = await this.prisma.planOfStudy.findMany({
			where,
			include: this.PlanOfStudyInclude
		});
		if (!res || res.length === 0) return new Error("No plan found");
		else return res;
	}

	// TODO: Allow for starting sections and courses
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

	// TODO: Handle connections to sections, courses and assignment results
	async updatePlan(id: string, input: PlanInput) {
		return this.prisma.planOfStudy.update({
			where: {
				id
			},
			data: {
				studentID: input.student
			},
			include: this.PlanOfStudyInclude
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
