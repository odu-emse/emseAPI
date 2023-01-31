import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { ProgressArgs } from "@/types/graphql";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProgressService {
	constructor(private readonly prisma: PrismaService) {}
	private progressIncludes = Prisma.validator<Prisma.ProgressInclude>()({
		enrollment: true
	});
	async progress(args: ProgressArgs) {
		const where = Prisma.validator<Prisma.ProgressWhereInput>()({
			...(args.status && { status: args.status }),
			...(args.completed && { completed: args.completed })
		});

		// if an id is provided, we can use it to find single progress since it is a unique field
		if (args.id) {
			const unique = Prisma.validator<Prisma.ProgressFindUniqueArgsBase>()({
				where: { id: args.id },
				include: this.progressIncludes
			});
			const res = this.prisma.progress.findUnique(unique);
			if (!res) return new Error("Progress not found");
			return [res];
		}

		// since enrollmentID is a unique field, we can use it to find a single progress
		if (args.enrollmentID) {
			const unique = Prisma.validator<Prisma.ProgressFindUniqueArgsBase>()({
				where: { enrollmentID: args.enrollmentID },
				include: this.progressIncludes
			});
			const res = this.prisma.progress.findUnique(unique);
			if (!res) return new Error("Progress not found");
			return [res];
		}

		const response = this.prisma.progress.findMany({
			where,
			include: this.progressIncludes
		});
		if (!response) return new Error("Progress not found");
		return response;
	}

	async createProgress(
		input: Prisma.ProgressCreateInput,
		enrollmentID: string
	) {
		const args = Prisma.validator<Prisma.ProgressCreateArgs>()({
			data: {
				...input,
				enrollment: {
					connect: { id: enrollmentID }
				}
			},
			include: this.progressIncludes
		});
		const res = this.prisma.progress.create(args);
		if (!res) return new Error("Progress count not be created");
		return res;
	}

	async deleteProgress(id: string) {
		const res = this.prisma.progress.delete({ where: { id } });
		if (!res) return new Error("Progress could not be deleted");
		return true;
	}

	async waiveModule(args: any) {}
}
