import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";

@Injectable()
export class ProgressService {
	constructor(private readonly prisma: PrismaService) {}
}
