import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProgressService } from "@/progress/progress.service";
import { PlanOfStudyResolver } from "@/pos";
import { ProgramResolver } from "@/program/program.resolver";
import {
	EnrollmentStatus,
	ProgressArgs,
	ProgressWaiveArgs,
	UserRole
} from "@/types/graphql";
import { Prisma } from "@prisma/client";

@Resolver()
export class ProgressResolver {
	constructor(
		private readonly progressService: ProgressService,
		private readonly plan: PlanOfStudyResolver,
		private readonly program: ProgramResolver
	) {
		this.progressService = progressService;
		this.plan = plan;
		this.program = program;
	}
	@Query("progress")
	async progress(@Args("args") args: ProgressArgs) {
		const response = await this.progressService.progress(args);
		if (response instanceof Error) return new Error(response.message);
		else return response;
	}

	@Mutation("createProgress")
	async createProgress(
		@Args("input") input: Prisma.ProgressUncheckedCreateInput,
		@Args("enrollmentID") enrollmentID: string
	) {
		const enrollment = await this.program.moduleEnrollment({
			id: enrollmentID
		});
		if (!enrollment || enrollment.length === 0)
			return new Error("Enrollment not found");
		const response = await this.progressService.createProgress(
			input,
			enrollmentID
		);
		if (response instanceof Error) return new Error(response.message);
		else return response;
	}

	@Mutation("waiveModule")
	async waiveModule(@Args("args") args: ProgressWaiveArgs) {
		// if moduleID and planID are provided, we can use them to find the enrollment or create a new one
		if (args.moduleID && args.planID) {
			const { moduleID, planID } = args;
			// check if plan exists
			const plan = await this.plan.planByParams({ id: planID });
			if (plan instanceof Error) return new Error(plan.message);

			// check if module exists
			const module = await this.program.module(
				{ id: moduleID },
				UserRole.STUDENT
			);
			if (module instanceof Error) return new Error(module.message);
			else {
				// both module and plan exist, so we can create a new enrollment
				const enrollment = await this.program.addModuleEnrollment({
					module: moduleID,
					plan: planID,
					role: UserRole.STUDENT,
					status: EnrollmentStatus.ACTIVE
				});
				// enrollment created, so we can create a new progress document
				const progress = await this.createProgress(
					{
						status: 100,
						completed: true,
						enrollmentID: enrollment.id
					},
					enrollment.id
				);
				if (progress instanceof Error) return new Error(progress.message);
				// progress created, so we can return it
				else return progress;
			}
		}
		// if enrollmentID is provided, we can use it to find the enrollment and create a new progress document or find the existing one
		else if (args.enrollmentID) {
			const { enrollmentID } = args;
			const enrollment = await this.program.moduleEnrollment({
				id: enrollmentID
			});
			if (!enrollment) return new Error("Enrollment not found");

			// since moduleEnrollment returns an array, we need to get the first element as it returns a unique enrollment if id is provided
			const progress = enrollment[0].progress ? enrollment[0].progress : null;
			// in case there is a population error we return an error
			if (!enrollment[0].plan || !enrollment[0].module)
				return new Error("Enrollment not found");
			if (!progress) {
				// progress doesn't exist, so we can create a new one
				const res = await this.createProgress(
					{
						status: 100,
						completed: true,
						enrollmentID: enrollment[0].id
					},
					enrollmentID
				);
				await this.program.updateModuleEnrollment(enrollmentID, {
					status: EnrollmentStatus.ACTIVE,
					role: UserRole.STUDENT,
					plan: enrollment[0].plan.id,
					module: enrollment[0].module.id
				});
				if (res instanceof Error) return new Error(res.message);
				else return res;
			} else if (progress) {
				// progress exists, so we can update it
				const res = await this.progressService.waiveModule(enrollmentID);
				await this.program.updateModuleEnrollment(enrollmentID, {
					status: EnrollmentStatus.ACTIVE,
					role: UserRole.STUDENT,
					plan: enrollment[0].plan.id,
					module: enrollment[0].module.id
				});
				if (res instanceof Error) return new Error(res.message);
				else return res;
			}
		} else
			return new Error("No enrollment or module to be waived was specified");
	}

	@Mutation("deleteProgress")
	async deleteProgress(@Args("id") id: string) {
		return await this.progressService.deleteProgress(id);
	}

	@Mutation("updateProgress")
	async updateProgress(
		@Args("status") status: number,
		@Args("id") id?: string | null | undefined,
		@Args("enrollmentID") enrollmentID?: string | null | undefined
	) {
		if (status > 100) return new Error("Progress cannot be greater than 100");
		if (status < 0) return new Error("Progress cannot be less than 0");
		if (!enrollmentID && !id)
			return new Error(
				"No ID specified. Please provide an enrollment ID or a progress ID"
			);
		else {
			const response = await this.progressService.updateProgress(
				status,
				id,
				enrollmentID
			);
			if (response instanceof Error) return new Error(response.message);
			else return response;
		}
	}
}
