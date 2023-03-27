import {
	test,
	describe,
	afterAll,
	expect,
	beforeEach,
	beforeAll
} from "vitest";
import { Test, TestingModule } from "@nestjs/testing";
import { DirectMessageService } from "./direct-message.service";
import { DirectMessageResolver } from "./direct-message.resolver";
import { PrismaService } from "@/prisma.service";
import Redis from "ioredis";
import { PubSubService } from "@/pub-sub/pub-sub.service";
import RedisClient from "@redis/client/dist/lib/client";
import { user, createRandomUser } from "utils";

describe("DirectMessage", function() {
	let service: DirectMessageService;
	let resolver: DirectMessageResolver;
	let redis = new Redis();
	let pubSub = new PubSubService();
	let prisma = new PrismaService();

	const senderID = "636428f65853d48d2ee9646e";
	const receiverID = "63da9e40020a625cc55f64c5";
	const groupID = "63ebed3a64bdf64f24e33a31";

	const [user] = initializeTest();

	beforeAll(async () => {
		service = new DirectMessageService(prisma, redis);
		resolver = new DirectMessageResolver(service, pubSub);
	});

	describe("Create", function() {
		test("should create and send a direct message from senderID to a receiverID", async function() {
			const createDM = await resolver.createDirectMessage(
				receiverID,
				"Hello from Create Test",
				senderID
			);
			if (createDM instanceof Error)
				throw new Error("Direct message not created");

			expect(senderID).toBeDefined();
			expect(receiverID).toBeDefined();
			expect(createDM).toBe(true);
		});

		test("should return false if senderID, receiverID, and message are not found", async function() {
			const senderId = user.id;
			const receiverId = user.id;
			const failDM = await resolver.createDirectMessage(
				receiverId,
				"Hello",
				senderId
			);
			expect(failDM instanceof Error).toBe(true);
		});

		test("should create and send a message from a senderID to a groupID", async function() {
			const sendGroupMessage = await resolver.sendMessageToGroup(
				groupID,
				"Hello to GroupMessage",
				senderID
			);
			if (sendGroupMessage instanceof Error)
				throw new Error("Failed to send message to Group");
				
			expect(sendGroupMessage).toBe(true);
		});

		test("should return false if senderID, receiverID, and message are not found", async function() {
			const senderId = user.id;
			const receiverId = user.id;
			const failGroupMessage = await resolver.sendMessageToGroup(
				senderId,
				"Hello",
				receiverId
			);
			expect(failGroupMessage instanceof Error).toBe(true);
		});
	});

	describe("Read", function() {
		test("should return an array of groups the user is connected to with the passed in receiverID ", async function() {
			const readGroups = await resolver.groups(receiverID);
			if (readGroups instanceof Error) throw new Error("Failed to find group");
			expect(readGroups).toBeDefined();
			expect(readGroups.length).toBeGreaterThanOrEqual(0);

			readGroups.map(groups => {
				expect(groups.id).toBeDefined();
				expect(groups.memberIDs).toBeDefined();
				expect(groups.members.length).toBeGreaterThanOrEqual(1);

				const messageAuthorID = groups.messages.map(message => {
					expect(message.authorID).toBeDefined();
					return message.authorID;
				});
				const groupMemberID = groups.memberIDs.map(memberID => {
					return memberID;
				});
				const isAuthorInGroup = groupMemberID.map(id => {
					return messageAuthorID.includes(id);
				});

				expect(isAuthorInGroup).toBe(true);
			});
		});

		test("should return the conversation of a user with the passed in receiverID", async function() {
			const readDM = await resolver.directMessages(receiverID);
			if (readDM instanceof Error)
				throw new Error("Failed to find direct messages");
				
			expect(readDM).toBeDefined();
		});

		test("should return an array of all subscribed direct messages", async function() {
			const newSubDirectMessage = await resolver.newDirectMessage();
			if (newSubDirectMessage instanceof Error)
				throw new Error("Failed to find any subscribed direct messages");
		});

		test("should return an array of all subscribed group messages", async function() {
			const newSubGroupMessage = await resolver.newGroupMessage();
			if (newSubGroupMessage instanceof Error)
				throw new Error("Failed to find any subscribed group messages");
		});
	});	
});

const initializeTest = () => {
	const usr = createRandomUser();
	return [usr];
};
