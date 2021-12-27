import { CourseInput, UpdateModule } from "./../gql/graphql";
import { Injectable } from "@nestjs/common";
import { Module, Course } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProgramService {
	constructor(private prisma: PrismaService) {}

	/// Queries
	async modules(): Promise<Module[]> {
		return this.prisma.module.findMany();
	}

	async module(id: string): Promise<Module | null> {
		//find module based on id
		if (id.length === 24) {
			const res = await this.prisma.module.findFirst({
				where: {
					id,
				},
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
		return this.prisma.course.findMany();
	}

	//Mutations

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

	async updateModule(data: UpdateModule): Promise<Module> {
		const {
			id,
			moduleNumber,
			moduleName,
			description,
			duration,
			numSlides,
			keywords,
		} = data
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
			},
		});
	}

	async deleteModule(id: string) {
		return this.prisma.module.delete({
			where: {
				id,
			},
		});
	}

	async addCourse(data: Prisma.CourseCreateInput): Promise<Course | Error> {
		//find out if there is a duplicate course
		// const get = await this.prisma.course.findMany({
		// 	where: {
		// 		name: data.name,
		// 	},
		// });
		// if (get.length !== 0) {
		// 	throw new Error("Course Already exists with provided name");
		// }
		// else {
			const {
				id,
				name,
				enrollment,
				modules
			} = data
			return this.prisma.course.create({
				data,
			});
		// }
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

	async deleteCourse(id: string) {
		return this.prisma.course.delete({
			where: {
				id,
			}
		});
	}
}
