import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { Prisma } from "@prisma/client";
import {
	IThreadByParams,
	IThreadCreateInput,
	ICommentCreateInput
} from "@/types/graphql";

@Injectable()
export class CommunityService {
	constructor(private prisma: PrismaService) {}

	private threadInclude = Prisma.validator<Prisma.ThreadInclude>()({
		// populating L1 comments
		comments: {
			include: {
				// populating L2 comments
				comments: {
					include: {
						// populating L3 comments
						comments: {
							include: {
								// populating L3 author
								author: true
							}
						},
						// populating L2 comment author
						author: true
					}
				},
				// populating L1 comment author
				author: true
			}
		},
		parentThread: true,
		usersWatching: true,
		author: true,
		upvotes: true
	});

	async threadsByParam(input?: IThreadByParams | null) {
		if (!input) {
			return this.prisma.thread.findMany({
				include: this.threadInclude
			});
		} else {
			const { id, title, body, parentThread, author, comments } = input;

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
		const { title, body, parentThread, author } = data;

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
		// Fetch the thread first
		const thread = await this.prisma.thread.findUnique({
			where: {
				id
			},
			include: {
				upvotes: true
			}
		});

		if (!thread) {
			throw new Error("Thread not found");
		}

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
			},
			include: this.threadInclude
		});
	}

	async downvoteThread(id: string, userID: string) {
		// Fetch the thread first
		const thread = await this.prisma.thread.findUnique({
			where: {
				id
			},
			include: this.threadInclude
		});

		if (!thread) {
			throw new Error("Thread not found");
		}

		// Check if the userID is in the upvotes array
		const userUpvoted = thread.upvotes.some((upvote) => upvote.id === userID);

		// If the userID is not in the upvotes array, return an error
		if (!userUpvoted) {
			throw new Error("User has not upvoted this thread");
		}

		// Update the thread, removing the userID from the upvotes array
		return this.prisma.thread.update({
			where: {
				id
			},
			data: {
				upvotes: {
					disconnect: {
						id: userID
					}
				}
			},
			include: this.threadInclude
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
