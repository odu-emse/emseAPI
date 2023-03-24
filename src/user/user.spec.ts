import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { PrismaService } from "@/prisma.service";
import {
	Social,
	UpdateUser,
	User,
	InstructorProfileInput,
	SocialInput
} from "@/types/graphql";
import { shuffle } from "../../utils/tests";
import { test, describe, afterAll, expect } from "vitest";
import { IsPhoneNumber } from "class-validator";

describe("Account services", () => {
	let service: UserService;
	let resolver: UserResolver;
	let prisma: PrismaService;

	const userID = "110686834027701244994";
	const userDocumentID = "616701c22e17f3fb9f5085f7";
	const socialDocumentID = "62966864bd7f125c4df63c11";
	const socialResetInput: SocialInput = {
		twitter: "",
		facebook: "",
		github: "",
		linkedin: "",
		portfolio: ""
	};

	const userResetInput: UpdateUser = {
		firstName: "DANIEL B.",
		lastName: "PAPP",
		middleName: " ",
		picURL:
			"https://lh3.googleusercontent.com/a/ALm5wu0YMGcog8kBVUkqqB39RgeOY8oiG0QgIJzqddPfYA=s96-c",
		email: "dpapp001@odu.edu",
		openID: userID,
		id: userDocumentID
	};

	const updatedInstructorProfileReset: InstructorProfileInput = {
		title: "Department Chair",
		officeLocation: "Online",
		officeHours: "Anytime",
		contactPolicy: "Email",
		phone: "757-555-5555",
		background: "I am a professor",
		researchInterest: "I am a professor",
		selectedPapersAndPublications: "",
		personalWebsite: "https://odu.edu/emse",
		philosophy: "I  teach people"
	};

	prisma = new PrismaService();
	service = new UserService(prisma);
	resolver = new UserResolver(service);

	afterAll(async () => {
		await resolver.update(userResetInput);
		await resolver.updateSocial(socialDocumentID, socialResetInput);
		await resolver.update({
			...userResetInput,
			instructorProfile: updatedInstructorProfileReset
		});
		await prisma.$disconnect();
	});

	describe("User", () => {
		test("should return an array of users", async () => {
			const users = await resolver.user({});
			expect(users).toBeInstanceOf(Array);
		});
		test("should return an error if User is not found", async () => {
			const user = await resolver.user({ id: shuffle(userDocumentID) });
			expect(user).toBeInstanceOf(Error);
		});
		test("should return User given Open ID argument", async () => {
			const user = await resolver.user({ openID: userID });
			expect(user).toBeDefined();
			if (!user || user instanceof Error) return new Error("User not found");
			user.map((user: User) => {
				expect(user.id).toBeDefined();
				expect(user.openID).toBeDefined();
				expect(user.picURL).toBeDefined();
				expect(user.email).toBeDefined();
				expect(user.firstName).toBeDefined();
				expect(user.lastName).toBeDefined();
				expect(user.middleName).toBeDefined();
				expect(user.isActive).toBeDefined();
				expect(user.dob).toBeDefined();
				expect(user.createdAt).toBeDefined();
			});
		});
		test("should populate foreign key relations", async () => {
			const user = await resolver.user({ openID: userID });
			if (!user || user instanceof Error) return new Error("User not found");
			user.map((user: User) => {
				expect(user).toHaveProperty("instructorProfile");
				expect(user).toHaveProperty("social");
				expect(user).toHaveProperty("plan");
				expect(user).toHaveProperty("assignmentGraded");
				expect(user).toHaveProperty("feedback");
			});
		});
		test("should update user given input argument", async () => {
			const updatedUserObj: UpdateUser = {
				id: userResetInput.id,
				openID: userID,
				email: "testing@test.com",
				picURL: "",
				firstName: "Testing",
				lastName: "User",
				middleName: "Jest",
				dob: new Date(),
				biography: "test-1234",
				phoneNumber: "12345678"
			};
			const updateUser = await resolver.update(updatedUserObj);
			expect(updateUser).toBeDefined();
			expect(updateUser.id).toBeDefined();
			expect(updateUser.email).toBeDefined();
			expect(updateUser.email).toStrictEqual(updatedUserObj.email);
			expect(updateUser.firstName).toBeDefined();
			expect(updateUser.firstName).toStrictEqual(updatedUserObj.firstName);
			expect(updateUser.lastName).toBeDefined();
			expect(updateUser.lastName).toStrictEqual(updatedUserObj.lastName);
			expect(updateUser.dob).toBeDefined();
			expect(updateUser.dob).toStrictEqual(updatedUserObj.dob);
			expect(updateUser.isAdmin).toBeDefined();
			expect(updateUser.biography).toStrictEqual(updatedUserObj.biography);
			expect(updateUser.phoneNumber).toStrictEqual(updatedUserObj.phoneNumber);
		});
		// TODO: test deletion of user after creation of user is supported
		// test("should return deleteUser", async () => {});
	});
	describe("Instructor", () => {
		test("should return Instructor Profile given the argument open ID", async () => {
			const instructorProfile = await resolver.instructorProfile(
				userDocumentID
			);
			expect(instructorProfile).toBeDefined();
			if (!instructorProfile || instructorProfile instanceof Error)
				return new Error("Instructor Profile not found");
			expect(instructorProfile.id).toBeDefined();
			expect(instructorProfile.account?.id).toEqual(userDocumentID);
			expect(instructorProfile.title).toBeDefined();
			expect(instructorProfile.officeLocation).toBeDefined();
			expect(instructorProfile.officeHours).toBeDefined();
			expect(instructorProfile.contactPolicy).toBeDefined();
			expect(instructorProfile.phone).toBeDefined();
			expect(instructorProfile.background).toBeDefined();
			expect(instructorProfile.researchInterest).toBeDefined();
			expect(instructorProfile.selectedPapersAndPublications).toBeDefined();
			expect(instructorProfile.personalWebsite).toBeDefined();
			expect(instructorProfile.philosophy).toBeDefined();
		});
		test("should update instructor profile given input argument", async () => {
			const updatedInstructorProfile: InstructorProfileInput = {
				title: "Adjunct Professor",
				officeLocation: "ESB 2101",
				officeHours: "9AM - 5PM - MWF",
				contactPolicy: "Email",
				phone: "111-222-3333",
				background:
					"I'm a very experienced professor, and I only use books from 50 years ago.",
				researchInterest: "Technology",
				selectedPapersAndPublications: "",
				personalWebsite: "https://odu.edu/emse",
				philosophy: "I  teach people"
			};
			const input: UpdateUser = {
				id: userDocumentID,
				openID: userID,
				instructorProfile: updatedInstructorProfile
			};
			const updateUser = await resolver.update(input);
			expect(updateUser).toBeDefined();
			expect(updateUser.id).toBeDefined();
			expect(updateUser.id).toEqual(userDocumentID);
			expect(updateUser.instructorProfile).toBeDefined();
			if (!updateUser.instructorProfile) return;
			expect(updateUser.instructorProfile.title).toEqual(
				updatedInstructorProfile.title
			);
			expect(updateUser.instructorProfile.officeLocation).toEqual(
				updatedInstructorProfile.officeLocation
			);
			expect(updateUser.instructorProfile.officeHours).toEqual(
				updatedInstructorProfile.officeHours
			);
			expect(updateUser.instructorProfile.contactPolicy).toEqual(
				updatedInstructorProfile.contactPolicy
			);
			expect(updateUser.instructorProfile.phone).toEqual(
				updatedInstructorProfile.phone
			);
			expect(updateUser.instructorProfile.background).toEqual(
				updatedInstructorProfile.background
			);
			expect(updateUser.instructorProfile.researchInterest).toEqual(
				updatedInstructorProfile.researchInterest
			);
			expect(
				updateUser.instructorProfile.selectedPapersAndPublications
			).toEqual(updatedInstructorProfile.selectedPapersAndPublications);
			expect(updateUser.instructorProfile.personalWebsite).toEqual(
				updatedInstructorProfile.personalWebsite
			);
			expect(updateUser.instructorProfile.philosophy).toEqual(
				updatedInstructorProfile.philosophy
			);
		});
	});
	describe("Social", () => {
		test("should return an array of social documents", async () => {
			const socials = await resolver.socials();
			expect(socials).toBeInstanceOf(Array);
			if (!socials) return;
			socials.forEach((social) => {
				expect(social).toBeDefined();
				expect(social.id).toBeDefined();
				expect(social.accountID).toBeDefined();
				expect(social.accountID).toEqual(userDocumentID);
				expect(social.twitter).toBeDefined();
				expect(social.facebook).toBeDefined();
				expect(social.linkedin).toBeDefined();
				expect(social.account).toBeDefined();
				if (!social.account) return;
				expect(social.account.openID).toEqual(userID);
			});
		});
		test("should return user a social document given the argument ID", async () => {
			const social = await resolver.social(socialDocumentID);
			expect(social).toBeDefined();
			expect(social!.id).toBeDefined();
			expect(social!.twitter).toBeDefined();
			expect(social!.github).toBeDefined();
			expect(social!.linkedin).toBeDefined();
			expect(social!.facebook).toBeDefined();
			expect(social!.portfolio).toBeDefined();
		});
		test("should update social profile given input argument", async () => {
			const updatedSocial: SocialInput = {
				portfolio: "https://www.google.com",
				twitter: "https://www.twitter.com",
				github: "https://www.github.com",
				linkedin: "https://www.linkedin.com",
				facebook: "https://www.facebook.com"
			};
			const updatedSocialDoc = await resolver.updateSocial(
				socialDocumentID,
				updatedSocial
			);

			expect(updatedSocialDoc).toBeDefined();
			expect(updatedSocialDoc.portfolio).toEqual(updatedSocial.portfolio);
			expect(updatedSocialDoc.twitter).toEqual(updatedSocial.twitter);
			expect(updatedSocialDoc.github).toEqual(updatedSocial.github);
			expect(updatedSocialDoc.linkedin).toEqual(updatedSocial.linkedin);
			expect(updatedSocialDoc.facebook).toEqual(updatedSocial.facebook);
		});
	});
});
