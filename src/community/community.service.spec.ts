import { Test, TestingModule } from '@nestjs/testing';
import { CommunityService } from './community.service';
import {PrismaService} from "@/prisma.service";

describe('CommunityService', () => {
  let service: CommunityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityService, PrismaService],
    }).compile();

    service = module.get<CommunityService>(CommunityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
