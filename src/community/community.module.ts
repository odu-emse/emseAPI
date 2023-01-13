import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityResolver } from './community.resolver';
import {PrismaService} from "@/prisma.service";

@Module({
  providers: [CommunityService, CommunityResolver, PrismaService]
})
export class CommunityModule {}
