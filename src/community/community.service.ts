import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";

@Injectable()
export class CommunityService {
    constructor(private prisma: PrismaService) {
    }

    async threads() {
        return await this.prisma.thread.findMany({});
    }

    async thread(id: string) {
        return await this.prisma.thread.findUnique({
            where: {
                id
            }
        })
    }
}
