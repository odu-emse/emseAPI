import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class CommunityService {
    constructor(private prisma: PrismaService) {
    }

    async threads() {
        const include = Prisma.validator<Prisma.ThreadInclude>()({
            comments: {
                include: {
                    author: true
                }
            },
            parentLesson: true,
            usersWatching: true,
            author: true
        })

        return await this.prisma.thread.findMany({
            include: {
                comments: true,
                parentLesson: true,
                usersWatching: true,
                author: true
            }
        })
    }

    async thread(id: string) {
        const include = Prisma.validator<Prisma.ThreadInclude>()({
            comments: true,
            parentLesson: true
        })

        return await this.prisma.thread.findUniqueOrThrow({
            where: {
                id
            },
            include
        })
    }
}
