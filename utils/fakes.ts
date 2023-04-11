import {
	Assignment,
	AssignmentResult,
	Collection,
	Content,
	Course,
	InstructorProfile,
	Lesson,
	Module,
	ModuleEnrollment,
	PlanOfStudy,
	Progress,
	Social,
	Thread,
	User,
	Quiz,
	Question,
	Answer
} from "@prisma/client";
import { faker } from "@faker-js/faker";

export function createRandomUser(): User {
	return {
		id: faker.database.mongodbObjectId(),
		openID: faker.datatype.uuid(),
		dob: faker.date.birthdate(),
		email: faker.internet.email(),
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		picURL: faker.image.imageUrl(),
		isAdmin: faker.datatype.boolean(),
		isActive: faker.datatype.boolean(),
		createdAt: faker.date.past(),
		middleName: faker.name.middleName(),
		watchedThreadIDs: [faker.database.mongodbObjectId()]
	};
}

export function createRandomInstructorProfile(
	userAccountID?: string
): InstructorProfile {
	return {
		id: faker.database.mongodbObjectId(),
		accountID: userAccountID ? userAccountID : faker.database.mongodbObjectId(),
		background: faker.lorem.lines(1),
		contactPolicy: faker.lorem.lines(1),
		officeHours: faker.lorem.lines(1),
		officeLocation: faker.lorem.lines(1),
		personalWebsite: faker.lorem.lines(1),
		philosophy: faker.lorem.lines(1),
		phone: faker.lorem.lines(1),
		researchInterest: faker.lorem.lines(1),
		selectedPapersAndPublications: faker.lorem.lines(1),
		title: faker.lorem.lines(1)
	};
}

export function createRandomSocial(userAccountID?: string): Social {
	return {
		id: faker.database.mongodbObjectId(),
		accountID: userAccountID ? userAccountID : faker.database.mongodbObjectId(),
		facebook: faker.internet.url(),
		github: faker.internet.url(),
		linkedin: faker.internet.url(),
		portfolio: faker.internet.url(),
		twitter: faker.internet.url()
	};
}

export function createRandomPlanOfStudy(userAccountID?: string): PlanOfStudy {
	return {
		id: faker.database.mongodbObjectId(),
		studentID: userAccountID ? userAccountID : faker.database.mongodbObjectId()
	};
}

export function createRandomCourse(): Course {
	return {
		id: faker.database.mongodbObjectId(),
		moduleIDs: [faker.database.mongodbObjectId()],
		name: faker.lorem.words(3)
	};
}

export function createRandomModule(): Module {
	return {
		id: faker.database.mongodbObjectId(),
		courseIDs: [faker.database.mongodbObjectId()],
		createdAt: faker.date.past(),
		description: faker.lorem.lines(1),
		duration: faker.datatype.number(),
		intro: faker.lorem.lines(1),
		keywords: [faker.lorem.words(3)],
		moduleName: faker.lorem.words(3),
		moduleNumber: faker.datatype.number(),
		numSlides: faker.datatype.number(),
		objectives: [faker.lorem.words(3)],
		parentModuleIDs: [faker.database.mongodbObjectId()],
		subModuleIDs: [faker.database.mongodbObjectId()],
		updatedAt: faker.date.past()
	};
}

export function createRandomLesson(collectionID?: string): Lesson {
	return {
		id: faker.database.mongodbObjectId(),
		collectionID: collectionID
			? collectionID
			: faker.database.mongodbObjectId(),
		name: faker.lorem.words(3),
		position: faker.datatype.number(),
		transcript: faker.lorem.lines(5)
	};
}

export function createRandomCollection(moduleID?: string): Collection {
	return {
		createdAt: faker.date.past(),
		id: faker.database.mongodbObjectId(),
		moduleID: moduleID ? moduleID : faker.database.mongodbObjectId(),
		name: faker.lorem.words(3),
		position: faker.datatype.number(),
		updatedAt: faker.date.past()
	};
}

export function createRandomModuleEnrollment(
	moduleID?: string,
	planID?: string
): ModuleEnrollment {
	return {
		enrolledAt: faker.date.past(),
		id: faker.database.mongodbObjectId(),
		moduleId: moduleID ? moduleID : faker.database.mongodbObjectId(),
		planID: planID ? planID : faker.database.mongodbObjectId(),
		role: faker.helpers.arrayElement(["STUDENT", "TEACHER", "GRADER"]),
		status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"])
	};
}

export function createRandomAssignment(moduleID?: string): Assignment {
	return {
		dueAt: faker.date.future(),
		id: faker.database.mongodbObjectId(),
		moduleId: moduleID ? moduleID : faker.database.mongodbObjectId(),
		name: faker.lorem.words(3),
		updatedAt: faker.date.past()
	};
}

export function createRandomAssignmentResult(
	assignmentID?: string,
	graderID?: string,
	studentID?: string
): AssignmentResult {
	return {
		id: faker.database.mongodbObjectId(),
		assignmentId: assignmentID
			? assignmentID
			: faker.database.mongodbObjectId(),
		graderId: graderID ? graderID : faker.database.mongodbObjectId(),
		studentId: studentID ? studentID : faker.database.mongodbObjectId(),
		result: faker.datatype.number(),
		feedback: faker.lorem.lines(1),
		submittedAt: faker.date.past()
	};
}

export function createRandomThread(
	authorID?: string,
	parentLessonID?: string,
	parentThreadID?: string,
	watcherID?: string
): Thread {
	return {
		id: faker.database.mongodbObjectId(),
		authorID: authorID ? authorID : faker.database.mongodbObjectId(),
		parentLessonID: parentLessonID
			? parentLessonID
			: faker.database.mongodbObjectId(),
		parentThreadID: parentThreadID
			? parentThreadID
			: faker.database.mongodbObjectId(),
		watcherID: watcherID ? [watcherID] : [faker.database.mongodbObjectId()],
		title: faker.lorem.words(3),
		body: faker.lorem.lines(1),
		upvotes: faker.datatype.number(),
		createdAt: faker.date.past(),
		updatedAt: faker.date.past()
	};
}

export function createRandomContent(parentID?: string): Content {
	return {
		id: faker.database.mongodbObjectId(),
		parentID: parentID ? parentID : faker.database.mongodbObjectId(),
		type: faker.helpers.arrayElement(["TEXT", "IMAGE", "VIDEO", "AUDIO"]),
		link: faker.internet.url()
	};
}

export function createRandomQuiz(parentID?: string): Quiz {
	const questions = faker.datatype.number({min: 5, max:15})
	return {
		id: faker.database.mongodbObjectId(),
		totalPoints: questions,
		instructions: faker.lorem.sentence(),
		dueAt: faker.date.future(),
		timeLimit: faker.datatype.number(),
		numQuestions: questions,
		minScore: faker.datatype.number(),
		parentLessonID: parentID ? parentID : faker.database.mongodbObjectId()
	}
}

export function createRandomQuestion(quizID?: string): Question {
	return {
		id: faker.database.mongodbObjectId(),
		number: faker.datatype.number(),
		variant: faker.datatype.number({min: 1, max: 5}),
		parentID: quizID ?quizID : faker.database.mongodbObjectId(),
		text: faker.lorem.words(5),
		points: faker.datatype.number(),
	}
}

export function createRandomAnswer(questionID?: string): Answer {
	return {
		id: faker.database.mongodbObjectId(),
		text: faker.lorem.words(3),
		correct: faker.datatype.boolean(),
		weight: faker.datatype.number(),
		index: faker.datatype.string(1),
		parentQuestionID: questionID ? questionID : faker.database.mongodbObjectId()
	}
}

export function createRandomProgress(
	enrollmentID?: string,
	withSafeMinMax?: boolean
): Progress {
	return {
		id: faker.database.mongodbObjectId(),
		enrollmentID: enrollmentID
			? enrollmentID
			: faker.database.mongodbObjectId(),
		completed: faker.datatype.boolean(),
		status: faker.datatype.number(
			withSafeMinMax ? { min: 0, max: 100 } : undefined
		),
		createdAt: faker.date.past(),
		updatedAt: faker.date.past()
	};
}
export const user = createRandomUser();
export const instructor = createRandomInstructorProfile();
export const social = createRandomSocial();
export const plan = createRandomPlanOfStudy();

export const course = createRandomCourse();
export const module = createRandomModule();
export const lesson = createRandomLesson();
export const collection = createRandomCollection();
export const moduleEnrollment = createRandomModuleEnrollment();
export const assignment = createRandomAssignment();
export const assignmentResult = createRandomAssignmentResult();
export const thread = createRandomThread();
export const content = createRandomContent();
export const progress = createRandomProgress();
export const quiz = createRandomQuiz();
export const question = createRandomQuestion();
export const answer = createRandomAnswer();
