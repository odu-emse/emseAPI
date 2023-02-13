import { describe, expect, test } from "vitest";
import { createPlan, pickRandomFromArray, shuffle } from "./tests";
import { PlanOfStudyResolver, PoSService } from "@/pos";
import { PrismaService } from "@/prisma.service";

describe("Utils", function () {
	describe("shuffle", function () {
		test("should return a string with same characters, but mixed", function () {
			const str = "abcde";
			const shuffled = shuffle(str);
			expect(shuffled).toEqual(expect.stringContaining(str));
		});
		test("should return a string with same length, but mixed", function () {
			const str = "abcde";
			const shuffled = shuffle(str);
			expect(shuffled).toHaveLength(str.length);
		});
		test.fails(
			"should fail, when given an unexpected data structure",
			function () {
				const arr = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };
				//@ts-expect-error
				const shuffled = shuffle(arr);
				expect(shuffled).toBeInstanceOf(Error);
			}
		);
	});
	describe("pickRandomFromArray", function () {
		test("should return data type of array element", function () {
			const arr = [1, 2, 3, 4, 5];
			const picked = pickRandomFromArray(arr);
			expect(picked).toBeInstanceOf(Number);
		});
		test("should return a number from the array", function () {
			const arr = [1, 2, 3, 4, 5];
			const picked = pickRandomFromArray(arr);
			expect(arr.includes(picked)).toBeTruthy();
		});
		test("should return a number greater than or equal to 0", function () {
			const arr = [1, 2, 3, 4, 5];
			const picked = pickRandomFromArray(arr);
			expect(picked).toBeGreaterThanOrEqual(0);
		});
		test("should return even different data structures", function () {
			const arr = [1, "2", true, { a: 1 }, [1, 2, 3]];
			const picked = pickRandomFromArray(arr);
			expect(picked).toBeTruthy();
		});
		test.fails(
			"should fail, when given an unexpected data structure",
			function () {
				const arr = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };
				//@ts-expect-error
				pickRandomFromArray(arr);
			}
		);
	});
	describe("createPlan", function () {
		let prisma = new PrismaService();
		let service = new PoSService(prisma);
		let resolver = new PlanOfStudyResolver(service);
		let dummyUserID = "63dabf67020a625cc55f64ff";
		test("should return a plan if one is found", async function () {
			const self = await resolver.planByParams({ student: dummyUserID });
			if (self instanceof Error) {
				expect(self).rejects.toThrow();
			} else {
				expect(self[0].studentID).toEqual(dummyUserID);
			}
		});
	});
});
