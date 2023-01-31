import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { Prisma } from "@prisma/client";
import { IThreadByParams, IThreadCreateInput } from "@/types/graphql";

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
		parentLesson: true,
		usersWatching: true,
		author: true
	});

	async threadsByParam(input: IThreadByParams) {
		const {
			id,
			title,
			body,
			parentLesson,
			parentThread,
			author,
			comments,
			upvotes,
			upvotesGTE,
			upvotesLTE
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
			...(upvotes && {
				upvotes
			}),
			...(upvotesGTE && {
				upvotes: {
					gte: upvotesGTE
				}
			}),
			...(upvotesLTE && {
				upvotes: {
					lte: upvotesLTE
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

		// if both upvotes and upvotesGTE or upvotesLTE are provided, we need to throw an error since we cannot filter for exact number and range at the same time
		if (
			(typeof upvotes === "number" && typeof upvotesGTE === "number") ||
			(typeof upvotes === "number" && typeof upvotesLTE === "number")
		)
			return new Error(
				"Cannot use upvotes and upvotesGTE or upvotesLTE at the same time"
			);

		// if both upvotesGTE and upvotesLTE are provided, we need to use AND to get the range
		if (typeof upvotesGTE === "number" && typeof upvotesLTE === "number") {
			delete where["upvotes"];
			where["AND"] = [
				{
					upvotes: {
						gte: upvotesGTE
					}
				},
				{
					upvotes: {
						lte: upvotesLTE
					}
				}
			] as Prisma.ThreadWhereInput["AND"];
		}

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

		return await this.prisma.thread.create({
			data: create,
			include: this.threadInclude
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
		try {
      const update = Prisma.validator<Prisma.ThreadUpdateArgs>()({
			  where: {
				  id
			  },
			  data: {
				  ...(title && { title }),
				  ...(body && { body })
			  }
		  })
		  return await this.prisma.thread.update(update);
		} catch (e: any) {
			return new Error(e);
		}
	}

	async deleteThread(id: string) {
		return await this.prisma.thread.delete({
			where: {
				id
			}
		});
	}
}
