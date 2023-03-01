import { Test, TestingModule } from "@nestjs/testing";
import { DirectMessageService } from "./direct-message.service";
import { describe, test, beforeEach, expect } from "vitest";

describe("DirectMessageService", () => {
	let service: DirectMessageService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DirectMessageService]
		}).compile();

		service = module.get<DirectMessageService>(DirectMessageService);
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});
});
