import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { Prisma } from "@prisma/client";
import {
	IThreadByParams,
	IThreadCreateInput,
	ICommentCreateInput
} from "@/types/graphql";
import { getRunningMode } from "vitest";

@Injectable()
export class CommunityService {
	constructor(private prisma: PrismaService) {}

	private threadInclude = Prisma.validator<Prisma.ThreadInclude>()({
		comments: {
			include: {
				comments: {
					include: {
						comments: true
					}
				}
			}
		},
		parentThread: true,
		parentLesson: true,
		usersWatching: true,
		author: true,
		upvotes:true
	});

	async threadsByParam(input?: IThreadByParams | null) {
		if (!input) {
			return this.prisma.thread.findMany({
				include: this.threadInclude
			});
		} else {
			const {
				id,
				title,
				body,
				parentLesson,
				parentThread,
				author,
				comments,
			} = input;


			const where = Prisma.validator<Prisma.ThreadWhereInput>()({
				...(id && { id }),
				...(title && {
					title: {
						contains: title
					}
				}),
				...(body && {
					body: {
						contains: body
					}
				}),
				...(parentLesson && {
					parentLesson: {
						id: parentLesson
					}
				}),
				...(parentThread && {
					parentThread: {
						id: parentThread
					}
				}),
				...(author && {
					author: {
						id: author
					}
				}),
				...(comments && {
					comments: {
						some: {
							id: {
								in: comments
							}
						}
					}
				})
			});			

			const include = this.threadInclude;

			let res:
				| Array<
						Prisma.ThreadGetPayload<{
							include: typeof include;
						}>
				  >
				| Error;

			if (id) {
				const response = await this.prisma.thread.findUnique({
					where: {
						id
					},
					include: this.threadInclude
				});
				if (!response || response instanceof Error)
					return new Error("Thread not found");
				res = [response];
			} else {
				res = await this.prisma.thread.findMany({
					where,
					include: this.threadInclude
				});
			}

			if (!res) return new Error("Thread not found");
			else return res;
		}
	}

	async createThread(data: IThreadCreateInput) {
		const { title, body, parentLesson, parentThread, author } = data;

		const create = Prisma.validator<Prisma.ThreadCreateInput>()({
			...(title && {
				title
			}),
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

		if (!parentThread && !title)
			return new Error("Parent thread ID is required for comments.");

		return this.prisma.thread.create({
			data: create,
			include: this.threadInclude
		});
	}

	async upvoteThread(id: string, userID: string) {
		return this.prisma.thread.update({
			where: {
				id
			},
			data: {
				upvotes: {
					connect: {
						id: userID
					}
				}
			}
		});
	}

	async updateThread(id: string, data: Prisma.ThreadUpdateInput) {
		const { title, body, updatedAt } = data;
		try {
			const update = Prisma.validator<Prisma.ThreadUpdateArgs>()({
				where: {
					id
				},
				data: {
					...(title && { title }),

					...(body && { body }),
					...(updatedAt && { updatedAt })
				},
				include: this.threadInclude
			});
			return await this.prisma.thread.update(update);
		} catch (e: any) {
			return new Error(e);
		}
	}

	async deleteThread(id: string) {
		return this.prisma.thread.delete({
			where: {
				id
			}
		});
	}

	async addCommentToThread(parentThreadID: string, data: ICommentCreateInput) {
		if (!data.id) {
			throw new Error(
				"Comment ID is required to connect to parent thread. There was an error creating your initial comment, if this error is shown."
			);
		}
		const update = Prisma.validator<Prisma.ThreadUncheckedUpdateInput>()({
			comments: {
				connect: {
					id: data.id
				}
			}
		});

		return this.prisma.thread.update({
			where: {
				id: parentThreadID
			},
			data: update,

			include: this.threadInclude
		});
	}
}
