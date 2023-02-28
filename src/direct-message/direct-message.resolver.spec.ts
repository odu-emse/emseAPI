import { Test, TestingModule } from "@nestjs/testing";
import { DirectMessageResolver } from "./direct-message.resolver";
import { describe, test, beforeEach, expect } from "vitest";

describe("DirectMessageResolver", () => {
	let resolver: DirectMessageResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DirectMessageResolver]
		}).compile();

		resolver = module.get<DirectMessageResolver>(DirectMessageResolver);
	});

	test("should be defined", () => {
		expect(resolver).toBeDefined();
	});
});
