import { PlanOfStudyResolver } from '@/pos/pos.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
    imports: [PlanOfStudyResolver],
    providers: [AuthResolver, AuthService, PrismaService]
})
export class AuthModule {}
