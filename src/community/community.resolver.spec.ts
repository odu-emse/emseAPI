import { Test, TestingModule } from '@nestjs/testing';
import { CommunityResolver } from './community.resolver';

describe('CommunityResolver', () => {
  let resolver: CommunityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityResolver],
    }).compile();

    resolver = module.get<CommunityResolver>(CommunityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
