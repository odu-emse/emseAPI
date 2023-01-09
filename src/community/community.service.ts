import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { Prisma } from "@prisma/client";
import { IThreadCreateInput } from "@/types/graphql";

@Injectable()
export class CommunityService {
	constructor(private prisma: PrismaService) {}

	async threads() {
		const include = Prisma.validator<Prisma.ThreadInclude>()({
			comments: true,
			parentLesson: true,
			usersWatching: true,
			author: true
		});

		return await this.prisma.thread.findMany({
			include
		});
	}

	async thread(id: string) {
		const include = Prisma.validator<Prisma.ThreadInclude>()({
			comments: {
				include: {
					comments: {
						include: {
							comments: true
						}
					}
				}
			},
			parentLesson: true,
			usersWatching: true,
			author: true
		});

		try {
			return await this.prisma.thread.findUniqueOrThrow({
				where: {
					id
				},
				include
			});
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.code);
			}
			throw e;
		}
	}

	async createThread(data: IThreadCreateInput) {
		const { title, body, parentLesson, parentThread, author } = data;

		const create = Prisma.validator<Prisma.ThreadCreateInput>()({
			title,
			body,
			author: {
				connect: {
					id: author
				}
			},
			...(parentThread && {
				parentThread: {
					connect: {
						id: parentThread
					}
				}
			}),
			...(parentLesson && {
				parentLesson: {
					connect: {
						id: parentLesson
					}
				}
			}),
			usersWatching: {
				connect: {
					id: author
				}
			}
		});

		return await this.prisma.thread.create({
			data: create,
			include: {
				author: true
			}
		});
	}

	async addCommentToThread(id: string, data: Prisma.ThreadCreateInput) {
		return await this.prisma.thread.update({
			where: {
				id
			},
			data: {
				comments: {
					// @ts-ignore
					push: data
				}
			}
		});
	}

	async upvoteThread(id: string) {
		return await this.prisma.thread.update({
			where: {
				id
			},
			data: {
				upvotes: {
					increment: 1
				}
			}
		});
	}

	async updateThread(id: string, data: Prisma.ThreadUpdateInput) {
		const { title, body } = data;
		return await this.prisma.thread.update({
			where: {
				id
			},
			data: {
				...(title && { title }),
				...(body && { body })
			}
		});
	}

	async deleteThread(id: string) {
		return await this.prisma.thread.delete({
			where: {
				id
			}
		});
	}
}
