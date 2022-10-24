import { Module } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
    imports: [],
    providers: [AuthResolver, AuthService, PrismaService]
})
export class AuthModule {}
