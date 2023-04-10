import { PrismaService } from "@/prisma.service";
import { CommunityResolver, CommunityService } from "@/community";
import { IThreadCreateInput } from "@/types/graphql";
import { AuthService } from "@/auth/auth.service";
import { UserService } from "@/user/user.service";
import { PlanOfStudyResolver, PoSService } from "@/pos";
import { pickRandomFromArray, shuffle } from "../../utils";
import { Prisma } from "@prisma/client";
import { test, describe, afterAll, expect } from "vitest";

describe("Community", () => {
	let service: CommunityService;
	let resolver: CommunityResolver;
	let posService: PoSService;
	let posResolver: PlanOfStudyResolver;
	let auth: AuthService;
	let user: UserService;
	let testingThreadID: string;
	let testingThreadDoc: Prisma.ThreadGetPayload<{
		include: {
			comments: true;
			author: true;
			usersWatching: true;
			upvotes: true;
		};
	}>;
	const prisma: PrismaService = new PrismaService();

	let accountID: string;
	let threadID: string;

	const deletableThreadIDs: Array<string> = [];

	const createThread = async (input: IThreadCreateInput) => {
		return await resolver.createThread(input);
	};

	const deleteThread = async (id: string) => {
		return await resolver.deleteThread(id);
	};

	const deleteUser = async (id: string) => {
		return await user.deleteUser(id);
	};

	const createUser = async () => {
		return await auth.registerUser({
			email:
				shuffle(
					"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
				) + "@test.com",
			openID: shuffle(
				"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
			),
			firstName: "Testing",
			lastName: "Account",
			middleName: "",
			picURL: ""
		});
	};

	service = new CommunityService(prisma);
	posService = new PoSService(prisma);
	posResolver = new PlanOfStudyResolver(posService);
	resolver = new CommunityResolver(service);
	auth = new AuthService(prisma, posResolver);
	user = new UserService(prisma);

	afterAll(async () => {
		deletableThreadIDs.map(async (id) => {
			await deleteThread(id);
		});
		await deleteUser(accountID);
		await prisma.$disconnect();
	});

	test("should be defined", () => {
		expect(resolver).toBeDefined();
	});
	describe("Param based querying", function () {
		test("should return all threads if input is null", async () => {
			const threads = await resolver.thread();
			expect(threads).toBeInstanceOf(Array);
			if (threads instanceof Error) return new Error(threads.message);
			else {
				testingThreadDoc = threads[pickRandomFromArray(threads)];

				testingThreadID = testingThreadDoc.id;
				deletableThreadIDs.push(testingThreadID);
				expect(testingThreadDoc.comments).toBeInstanceOf(Array);
				expect(testingThreadDoc.usersWatching).toBeInstanceOf(Array);
				expect(testingThreadDoc.author).toBeInstanceOf(Object);
			}
		});
		test("should return all threads if input is an empty object", async () => {
			const threads = await resolver.thread({});
			if (threads instanceof Error) return new Error(threads.message);
			else {
				expect(threads).toBeInstanceOf(Array);
				expect(threads.length).toBeGreaterThan(0);
			}
		});
		test("should return all threads if input is undefined", async () => {
			const threads = await resolver.thread(undefined);
			if (threads instanceof Error) return new Error(threads.message);
			else {
				expect(threads).toBeInstanceOf(Array);
				expect(threads.length).toBeGreaterThan(0);
			}
		});
		test("should return all threads with upvotes as an array", async () => {
			const threads = await resolver.thread({});
			if (threads instanceof Error) return new Error(threads.message);
			else {
				expect(threads[0].upvotes).toBeInstanceOf(Array);
			}
		});
		test("should return an error when ID is not found", async () => {
			const thread = await resolver.thread({ id: shuffle(testingThreadID) });
			expect(thread instanceof Error).toBe(true);
		});
		test("should return the threads requested by ID", async () => {
			const thread = await resolver.thread({ id: testingThreadID });
			if (!thread || thread instanceof Error)
				return new Error("Thread not found");
			else {
				thread.map((thread) => {
					expect(thread.id).toBe(testingThreadID);
				});
			}
		});
		test("should return comments 3 levels deep", async () => {
			const threads = await resolver.thread({ id: testingThreadID });
			if (!threads || threads instanceof Error)
				return new Error("Thread not found");
			else {
				threads.map((thread) => {
					thread.comments.map((l1_comment) => {
						expect(l1_comment).toHaveProperty("body");
						expect(l1_comment).toHaveProperty("author");
						if (Array.isArray(l1_comment.comments)) {
							l1_comment.comments.map((l2_comment) => {
								expect(l2_comment).toHaveProperty("body");
								expect(l2_comment).toHaveProperty("author");

								if (Array.isArray(l2_comment.comments)) {
									l2_comment.comments.map((l3_comment) => {
										expect(l3_comment).toHaveProperty("body");
										expect(l3_comment).toHaveProperty("author");
									});
								}
							});
						}
					});
				});
			}
		});
		test("should return the threads with topics requested", async () => {
			const thread = await resolver.thread({ topics: ["key"] });
			if (!thread || thread instanceof Error)
				return new Error("Thread not found");
			else {
				thread.map((thread) => {
					expect(thread.topics).toContain("key");
				});
			}
		});
	});
	describe("Create", function () {
		test("should create a thread with author", async () => {
			const account = await createUser();
			if ("id" in account) {
				const thread = await createThread({
					title: "This is a test thread",
					body: "We are inserting this data from a test case, and this data should have been removed after the test case has finished.",
					author: account.id
				});
				if (thread instanceof Error) return new Error(thread.message);
				threadID = thread.id;
				accountID = account.id;
				deletableThreadIDs.push(threadID);
				expect(thread).toHaveProperty("title");
				expect(thread).toHaveProperty("body");
				expect(thread).toHaveProperty("author");
				expect(thread.author.id === account.id).toBe(true);
				expect(thread.watcherID.includes(account.id)).toBe(true);
				expect(thread.parentThreadID).toBeNull();
				expect(thread.author.watchedThreadIDs.includes(thread.id)).toBe(true);
			}
		});
		test("should add comment with author as watcher", async () => {
			const res = await resolver.addCommentToThread(threadID, {
				body: "How does this look?",
				author: accountID
			});
			if (res instanceof Error) return new Error(res.message);
			else {
				deletableThreadIDs.push(res.id);
				expect(res.author.id === accountID).toBe(true);
				expect(res.watcherID.includes(accountID)).toBe(true);
				expect(res.parentThreadID === threadID).toBe(true);
			}
		});
		test("should fail to add comment if parent ID is not found", async () => {
			const thread = await resolver.addCommentToThread(shuffle(threadID), {
				body: "How does this look?",
				author: accountID
			});
			expect(thread instanceof Error).toBe(true);
		});
		test("should not create comment if parent thread is not given", async () => {
			const falseComment = await resolver.createThread({
				body: "This comment should not be created as the parent thread is not given",
				author: accountID
			});
			expect(falseComment instanceof Error).toBe(true);
		});
	});
	describe("Update", function () {
		test("should increase vote count by 1", async () => {
			const voteNum = await resolver.thread({ id: threadID });
			if (voteNum instanceof Error)
				throw new Error("Error in upvoteThread test case");

			const upVoteNum = await resolver.upvoteThread(threadID, accountID);

			expect(upVoteNum.upvotes.length === voteNum[0].upvotes.length + 1).toBe(
				true
			);
		});
		test("should decrease vote count by 1", async () => {
			const voteNum = await resolver.thread({ id: threadID });
			if (voteNum instanceof Error)
				throw new Error("Error in upvoteThread test case");
			const upVoteNum = await resolver.upvoteThread(threadID, accountID);
			// stuck at upvoted status, attempting to upvote a upvoted thread (self) for a second time will not increment the count
			expect(upVoteNum.upvotes.length === voteNum[0].upvotes.length + 1).toBe(
				false
			);
			// expect accountID inside of the upvotes Users array
			expect(upVoteNum.upvotes.some((upvote) => upvote.id === accountID)).toBe(
				true
			);
			// resolver on downvoteThread function
			const downVoteNum = await resolver.downvoteThread(threadID, accountID);
			// after downvote mutation, size of upvotes array should decrement by 1
			expect(downVoteNum.upvotes.length === voteNum[0].upvotes.length - 1).toBe(
				true
			);
			// accountID should no longer be found in the updated Array (after downvote)
			expect(
				downVoteNum.upvotes.some((upvote) => upvote.id === accountID)
			).toBe(false);
		});
		test("should update the thread with the given data", async () => {
			const thread = await resolver.updateThread(threadID, {
				title: "This is an updated thread",
				body: "Is this thread updatable?"
			});
			if (thread instanceof Error) return new Error(thread.message);
			else {
				expect(thread.title).toBe("This is an updated thread");
				expect(thread.body).toBe("Is this thread updatable?");
			}
		});
		test("should return Error if update ID was not found", async () => {
			const thread = await resolver.updateThread(shuffle(threadID), {
				title: "This is an updated thread",
				body: "Is this thread updatable?"
			});
			expect(thread instanceof Error).toBe(true);
		});
		test("should update timestamp when comment is added to parent thread", async function () {
			const thread = await resolver.thread({ id: threadID });
			if (thread instanceof Error) return new Error(thread.message);
			else {
				const comment = await resolver.addCommentToThread(threadID, {
					body: "How does this look?",
					author: accountID
				});
				if (comment instanceof Error) return new Error(comment.message);
				else {
					const updatedThread = await resolver.thread({ id: threadID });
					if (updatedThread instanceof Error)
						return new Error(updatedThread.message);
					else {
						expect(updatedThread[0].updatedAt > thread[0].updatedAt).toBe(true);
					}
				}
			}
		});
	});
	describe("Delete", function () {
		test("should delete the thread", async () => {
			const tempThread = await createThread({
				title: "This is testing the delete thread function",
				body: "This should not be seen by anyone",
				author: accountID
			});
			if (tempThread instanceof Error) return new Error(tempThread.message);
			else {
				await resolver.deleteThread(tempThread.id);
				const findDeleted = await resolver.thread({ id: tempThread.id });
				expect(findDeleted instanceof Error).toBe(true);
			}
		});
	});
});
