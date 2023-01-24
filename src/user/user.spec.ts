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

describe("Account services", () => {
	let service: UserService;
	let resolver: UserResolver;
	let prisma: PrismaService;

	let instructorProfileID = "62816c29ba9e5c0f14d6e71f";
	let userID = "110686834027701244994";
	let userDocumentID = "616701c22e17f3fb9f5085f7";
	let socialDocumentID = "62966864bd7f125c4df63c11";
	let socialResetInput: SocialInput = {
		twitter: "",
		facebook: "",
		github: "",
		linkedin: "",
		portfolio: ""
	};

	let userResetInput: UpdateUser = {
		firstName: "DANIEL B.",
		lastName: "PAPP",
		middleName: " ",
		picURL:
			"https://lh3.googleusercontent.com/a/ALm5wu0YMGcog8kBVUkqqB39RgeOY8oiG0QgIJzqddPfYA=s96-c",
		email: "dpapp001@odu.edu",
		openID: userID,
		id: userDocumentID
	};

	let updatedInstructorProfileReset: InstructorProfileInput = {
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

	beforeAll(async () => {
		prisma = new PrismaService();
		service = new UserService(prisma);
		resolver = new UserResolver(service);
	});
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
		it("should return an array of users", async () => {
			const users = await resolver.users();
			expect(users).toBeInstanceOf(Array);
		});
		it("should return User given Open ID argument", async () => {
			const user = await resolver.user(userID);
			expect(user).toBeDefined();
			if (!user) return;
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
		it("should populate foreign key relations", async () => {
			const user = await resolver.user(userID);
			expect(user).toHaveProperty("instructorProfile");
			expect(user).toHaveProperty("social");
			expect(user).toHaveProperty("plan");
			expect(user).toHaveProperty("assignmentGraded");
			expect(user).toHaveProperty("feedback");
		});
		it("should update user given input argument", async () => {
			const updatedUserObj: UpdateUser = {
				id: userResetInput.id,
				openID: userID,
				email: "testing@test.com",
				picURL: "",
				firstName: "Testing",
				lastName: "User",
				middleName: "Jest",
				dob: new Date()
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
		});
		// TODO: test deletion of user after creation of user is supported
		// it("should return deleteUser", async () => {});
	});
	describe("Instructor", () => {
		it("should return Instructor Profile given the argument open ID", async () => {
			const instructorProfile = await resolver.instructorProfile(userID);
			expect(instructorProfile).toBeDefined();
			if (!instructorProfile) return;
			expect(instructorProfile.id).toBeDefined();
			expect(instructorProfile.account?.openID).toEqual(userID);
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
		it("should update instructor profile given input argument", async () => {
			let updatedInstructorProfile: InstructorProfileInput = {
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
			let input: UpdateUser = {
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
		it("should return an array of social documents", async () => {
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
		it("should return user a social document given the argument ID", async () => {
			const social = await resolver.social(socialDocumentID);
			expect(social).toBeDefined();
			expect(social!.id).toBeDefined();
			expect(social!.twitter).toBeDefined();
			expect(social!.github).toBeDefined();
			expect(social!.linkedin).toBeDefined();
			expect(social!.facebook).toBeDefined();
			expect(social!.portfolio).toBeDefined();
		});
		it("should update social profile given input argument", async () => {
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
