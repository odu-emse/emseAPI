import {Injectable} from '@nestjs/common';
import {PrismaService} from "@/prisma.service";
import {Prisma} from "@prisma/client";
import {ICommentCreateInput, IThreadCreateInput} from "@/types/graphql";

@Injectable()
export class CommunityService {
    constructor(private prisma: PrismaService) {
    }

    async threads() {
        const include = Prisma.validator<Prisma.ThreadInclude>()({
            comments: true,
            parentLesson: true,
            usersWatching: true,
            author: true
        })

        return await this.prisma.thread.findMany({
            include
        })
    }

    async thread(id: string) {
        const include = Prisma.validator<Prisma.ThreadInclude>()({
            comments: {
                include: {
                    comments: {
                        include: {
                            comments: true
                        }
                    },
                }
            },
            parentLesson: true,
            usersWatching: true,
            author: true
        })

        return await this.prisma.thread.findUniqueOrThrow({
            where: {
                id
            },
            include
        })
    }

    async createThread(data: IThreadCreateInput) {
        const {title, body, parentLesson, parentThread, author } = data

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
        })

        return await this.prisma.thread.create({
            data: create,
            include: {
                author: true,
            }
        })
    }

    async addCommentToThread(parentThreadID: string, data: ICommentCreateInput) {
        if(!data.id){
            throw new Error("Comment ID is required to connect to parent thread. There was an error creating your initial comment, if this error is shown.")
        }
        const update = Prisma.validator<Prisma.ThreadUncheckedUpdateInput>()({
            comments: {
                connect: {
                    id: data.id
                }
            }
        })
        console.log(update);
        return await this.prisma.thread.update({
            where: {
                id: parentThreadID
            },
            data: update,
            include: {
                comments: true,
                author: true
            }
        })
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
        })
    }

    async updateThread(id: string, data: Prisma.ThreadUpdateInput) {
        const { title, body } = data
        return await this.prisma.thread.update({
            where: {
                id
            },
            data: {
                ...(title && { title }),
                ...(body && { body }),
            }
        })
    }
}
