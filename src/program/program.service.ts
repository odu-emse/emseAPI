import { UpdateModule } from "./../gql/graphql";
import { Injectable } from "@nestjs/common";
import { Module } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProgramService {
	constructor(private prisma: PrismaService) {}
	async modules(): Promise<Module[]> {
		return this.prisma.module.findMany();
	}

	async module(id: string): Promise<Module> {
		return this.prisma.module.findFirst({
			where: {
				id,
			},
		});
	}

	async addModule(data: Prisma.ModuleCreateInput): Promise<Module | Error> {
		//find out if there is a duplicate user
		const get = await this.prisma.module.findMany({
			where: {
				moduleNumber: data.moduleNumber,
			},
		});
		if (get) {
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

	async updateModule(data: UpdateModule): Promise<Module> {
		return this.prisma.module.update({
			where: {
				id: data.id,
			},
			data: {},
		});
	}

	async deleteModule(id: string) {
		return this.prisma.module.delete({
			where: {
				id,
			},
		});
	}
}
