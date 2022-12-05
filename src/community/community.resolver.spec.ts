import { Test, TestingModule } from '@nestjs/testing';
import { CommunityResolver } from './community.resolver';
import {PrismaService} from "@/prisma.service";
import {CommunityService} from "@/community/community.service";

describe('CommunityResolver', () => {
  let resolver: CommunityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityResolver, PrismaService, CommunityService],
    }).compile();

    resolver = module.get<CommunityResolver>(CommunityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
