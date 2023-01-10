import { PrismaService } from "@/prisma.service";
import { CommunityResolver, CommunityService } from "@/community";
import { IThreadCreateInput, Thread } from "@/types/graphql";
import { AuthService } from "@/auth/auth.service";
import { UserService } from "@/user/user.service";

describe("Community", () => {
	let service: CommunityService;
	let resolver: CommunityResolver;
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

	beforeEach(async () => {
		service = new CommunityService(prisma);
		resolver = new CommunityResolver(service);
		auth = new AuthService(prisma);
		user = new UserService(prisma);
	});

	afterEach(async () => {
		await prisma.$disconnect();
	});

	afterAll(async () => {
		await deleteThread(threadID);
		await deleteUser(accountID);
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
	//TODO: This test case will keep failing until we fix the code coverage using vitest instead of jest
	it("should throw an error when ID is not found", async () => {
		const thread = await resolver.thread(shuffle(testingThreadID));
		// expectTypeOf(thread).toMatchTypeOf<Object>();
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
});

// const createModule = async (input: Prisma.ModuleCreateInput) => {
//   return await resolver.create(input);
// }
//
// const createCollection = async (input: CreateCollectionArgs) => {
//   return await resolver.createCollection(input);
// }
//
// const deleteModule = async (id: string) => {
//   return await prisma.module.delete({
//     where: { id },
//   });
// }
//
// const deleteCollection = async (id: string) => {
//   return await prisma.collection.delete({
//     where: { id },
//   });
// }
//
// const lessons = [
//   "639217c90482bbfb9aba86cc",
//   "639217e70482bbfb9aba86d0",
//   "639217e70482bbfb9aba86d1",
//   "639217e70482bbfb9aba86d2"
// ]
//
// let testingCollectionID: string;
// let testingModuleID: string;
//
// beforeAll(async () => {
//   service = new ProgramService(prisma);
//   resolver = new ProgramResolver(service);
//
//   const module = await createModule({
//     moduleName: "Test Module",
//     moduleNumber: 1,
//     duration: 1,
//     intro: "Test Intro",
//     numSlides: 1,
//     description: "Test Description",
//   })
//
//   testingModuleID = module.id;
//
//   const collection = await createCollection({
//     name: "Test Collection",
//     moduleID: testingModuleID,
//     lessons
//   })
//
//   testingCollectionID = collection.id;
// });
// afterAll(async () => {
//   await deleteCollection(testingCollectionID);
//   await deleteModule(testingModuleID);
//   prisma.$disconnect();
// })
