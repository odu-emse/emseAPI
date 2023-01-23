import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { Prisma } from "@prisma/client";
import {
	ICommentCreateInput,
	IThreadCreateInput,
	Lesson,
	Thread,
	User
} from "@/types/graphql";

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

	async threads() {
		return await this.prisma.thread.findMany({
			include: this.threadInclude
		});
	}

	async thread(id: string) {
		return await this.prisma.thread.findUniqueOrThrow({
			where: {
				id
			},
			include: this.threadInclude
		});
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

	async addCommentToThread(
		id: string,
		comments: Thread[] & {
			comments: Array<(Thread & { comments: Thread[] }) | []>;
		},
		data: Thread
	) {
		console.log({
			id,
			comments,
			data
		});

		if (comments.length === 0) {
			const update = Prisma.validator<Prisma.ThreadUpdateInput>()({
				comments: {
					connect: {
						id: data.id
					}
				}
			});

			return await this.prisma.thread.update({
				where: {
					id
				},
				data: update
			});
		} else {
			const newComments = comments.concat(data);

			console.log(newComments);

			const update = Prisma.validator<Prisma.ThreadUpdateInput>()({});

			return await this.prisma.thread.update({
				where: {
					id
				},
				data: update
			});
		}

		// if (comments.length > 0) {
		// 	//save old comments
		// 	//append new comment
		// 	//set new comments
		// } else {
		// 	return await this.prisma.thread.update({
		// 		where: {
		// 			id
		// 		},
		// 		data: {
		// 			comments: {
		// 				set: [newComment]
		// 			}
		// 		}
		// 	});
		// }

		// return await this.prisma.thread.update({
		// 	where: {
		// 		id
		// 	},
		// 	data: {
		// 		comments: {
		// 			//TODO: fix this with the prisma validator so we can stop using ignore
		//
		// 			// @ts-ignore
		// 			push: data
		// 		}
		// 	}
		// });
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
