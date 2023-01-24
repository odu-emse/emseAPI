import { PrismaService } from "@/prisma.service";
import { CommunityResolver, CommunityService } from "@/community";
import { IThreadCreateInput } from "@/types/graphql";
import { AuthService } from "@/auth/auth.service";
import { UserService } from "@/user/user.service";
import { PlanOfStudyResolver, PoSService } from "@/pos";

describe("Community", () => {
	let service: CommunityService;
	let resolver: CommunityResolver;
	let posService: PoSService;
	let posResolver: PlanOfStudyResolver;
	let auth: AuthService;
	let user: UserService;
	let testingThreadID: string = "6387808aeca98a745ea97691";
	let prisma: PrismaService = new PrismaService();

	let accountID: string;
	let threadID: string;

	const pickRandomFromArray = (arr: any[]): number => {
		return Math.floor(Math.random() * arr.length);
	};

	const shuffle = (str) => [...str].sort(() => Math.random() - 0.5).join("");

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

	beforeAll(async () => {
		service = new CommunityService(prisma);
		posService = new PoSService(prisma);
		posResolver = new PlanOfStudyResolver(posService);
		resolver = new CommunityResolver(service);
		auth = new AuthService(prisma, posResolver);
		user = new UserService(prisma);
	});

	afterAll(async () => {
		await deleteThread(threadID);
		await deleteUser(accountID);
		await prisma.$disconnect();
	});

	it("should be defined", () => {
		expect(resolver).toBeDefined();
	});
	it("should return an array of threads", async () => {
		const threads = await resolver.threads();
		expect(threads).toBeInstanceOf(Array);

		testingThreadID = threads[pickRandomFromArray(threads)].id;

		expect(threads[pickRandomFromArray(threads)].comments).toBeInstanceOf(
			Array
		);
		expect(threads[pickRandomFromArray(threads)].usersWatching).toBeInstanceOf(
			Array
		);
		expect(threads[pickRandomFromArray(threads)].author).toBeInstanceOf(Object);
	});
	it("should throw an error when ID is not found", async () => {
		const thread = await resolver.thread(shuffle(testingThreadID));
		expect(thread instanceof Error).toBe(true);
	});
	it("should return the threads requested by ID", async () => {
		const thread = await resolver.thread(testingThreadID);
		if (thread !== undefined && "id" in thread) {
			expect(thread.comments).toBeInstanceOf(Array);
			expect(thread.usersWatching).toBeInstanceOf(Array);
			expect(thread.author).toBeInstanceOf(Object);
		}
	});
	it("should create a thread with author", async () => {
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
			expect(thread).toHaveProperty("title");
			expect(thread).toHaveProperty("body");
			expect(thread).toHaveProperty("author");
			expect(thread.author.id === account.id).toBe(true);
			expect(thread.watcherID.includes(account.id)).toBe(true);
			expect(thread.parentThreadID).toBeNull();
			expect(thread.parentLessonID).toBeNull();
			expect(thread.author.watchedThreadIDs.includes(thread.id)).toBe(true);
		}
	});
	it("should add comment with author as watcher", async () => {
		const res = await resolver.addCommentToThread(threadID, {
			body: "How does this look?",
			author: accountID
		});
		if (res instanceof Error) return new Error(res.message);
		else {
			expect(res.author.id === accountID).toBe(true);
			expect(res.watcherID.includes(accountID)).toBe(true);
			expect(res.parentThreadID === threadID).toBe(true);
		}
	});
	it("should fail to add comment if parent ID is not found", async () => {
		const thread = await resolver.addCommentToThread(shuffle(threadID), {
			body: "How does this look?",
			author: accountID
		});
		expect(thread instanceof Error).toBe(true);
	});
	it("should handle a thread and ensure that the vote count has increased by 1", async () => {
		const voteNum = await resolver.thread(threadID);
		const upVoteNum = await resolver.upvoteThread(threadID);
		if (voteNum instanceof Error || upVoteNum instanceof Error)
			throw new Error("Error in upvoteThread test case");
		expect(upVoteNum.upvotes === voteNum.upvotes + 1).toBe(true);
	});
});
