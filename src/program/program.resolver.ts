import {
	AssignmentInput,
	CourseInput,
	SectionEnrollmentInput,
	SectionFeedbackUpdate,
	NewAssignment,
	NewAssignmentResult,
	UpdateSection,
	SectionFields,
	CourseFields,
	AssignmentFields,
	ModFeedbackFields,
	AssignmentResFields,
	ContentFields,
	LessonFields,
	LessonInput,
	CreateCollectionArgs,
	CreateContentArgs,
	ModEnrollmentFields,
	NewSection,
	CollectionFields
} from "@/types/graphql";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProgramService } from "./program.service";
import { Prisma, UserRole } from "@prisma/client";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@/auth.guard";

@Resolver()
// @UseGuards(AuthGuard)
export class ProgramResolver {
	constructor(private readonly programService: ProgramService) {}

	// Get Section(s)
	@Query("section")
	async section(
		@Args("input") args: SectionFields,
		@Args("memberRole") role?: UserRole
	) {
		const result = await this.programService.section(args);
		if (!result) {
			return new Error("Section not found");
		}
		if (!role) {
			return result;
		} else {
			return result.map((section) => {
				const thisSection = section;
				thisSection.members = section.members.filter(
					(value) => value.role === role
				);
				return thisSection;
			});
		}
	}

	// Get Course(s)
	@Query("course")
	async course(@Args("input") args: CourseFields) {
		return await this.programService.course(args);
	}

	@Query("assignment")
	async assignment(@Args("input") args: AssignmentFields) {
		return await this.programService.assignment(args);
	}

	@Query("sectionFeedback")
	async sectionFeedback(@Args("input") args: ModFeedbackFields) {
		return await this.programService.sectionFeedback(args);
	}

	@Query("assignmentResult")
	async assignmentResult(@Args("input") args: AssignmentResFields) {
		return await this.programService.assignmentResult(args);
	}

	@Query("sectionEnrollment")
	async sectionEnrollment(@Args("input") args: ModEnrollmentFields) {
		return await this.programService.sectionEnrollment(args);
	}

	@Query("lessonsBySectionEnrollment")
	async lessonsBySectionEnrollment(
		@Args("planID") planID: string,
		@Args("sectionID") sectionID: string
	) {
		const enrollment = await this.programService.sectionEnrollment({
			plan: planID
		});

		const filteredEnrollment = enrollment.filter((enrollment) => {
			return enrollment.section.id === sectionID;
		});

		const lessons = filteredEnrollment[0].section.collections.map(
			(collection) =>
				collection.lessons.map((lesson) => {
					return lesson;
				})
		);

		const filteredLessons = lessons.flat().map((lesson) => {
			return lesson.lessonProgress.filter((progress) => {
				return progress.enrollment.id === filteredEnrollment[0].id;
			});
		});

		return [
			...lessons
				.flat()
				.sort((a, b) => a.position - b.position)
				.map((lesson) => {
					return {
						...lesson,
						lessonProgress: filteredLessons
							.flat()
							.filter((progress) => progress.lessonID === lesson.id)
					};
				})
		];
	}

	@Query("collection")
	async collection(@Args("input") args: CollectionFields | null = null) {
		return await this.programService.collection(args);
	}

	@Query("content")
	async content(@Args("input") input: ContentFields) {
		return await this.programService.content(input);
	}

	@Query("lesson")
	async lesson(@Args("input") input: LessonFields) {
		return await this.programService.lesson(input);
	}

	// Mutations

	// Add a section to the db with all required initial fields
	@Mutation("addSection")
	async create(@Args("input") args: NewSection) {
		return await this.programService.addSection(args);
	}

	// Update a single Section's data in the db
	@Mutation("updateSection")
	async update(@Args("input") args: UpdateSection) {
		return await this.programService.updateSection(args);
	}

	// Delete a Section from db
	@Mutation("deleteSection")
	async delete(@Args("id") args: string) {
		return await this.programService.deleteSection(args);
	}

	// // Add a Course to the db with a course name
	@Mutation("addCourse")
	async createCourse(@Args("input") args: CourseInput) {
		return await this.programService.addCourse(args);
	}

	// Update a course name
	@Mutation("updateCourse")
	async updateCourse(@Args("id") id: string, @Args("input") args: CourseInput) {
		return await this.programService.updateCourse(id, args);
	}

	// Delete a course based on ID
	@Mutation("deleteCourse")
	async deleteCourse(@Args("id") args: string) {
		return await this.programService.deleteCourse(args);
	}

	// Add an assignment
	@Mutation("addAssignment")
	async addAssignment(@Args("input") input: NewAssignment) {
		return await this.programService.addAssignment(input);
	}

	// // Delete an assignment from DB
	@Mutation("deleteAssignment")
	async deleteAssignment(
		@Args("section") args: string,
		@Args("id") id: string
	) {
		return await this.programService.deleteAssignment(args, id);
	}

	// Update an assignment in the db
	@Mutation("updateAssignment")
	async updateAssignment(
		@Args("id") id: string,
		@Args("input") args: AssignmentInput
	) {
		return await this.programService.updateAssignment(id, args);
	}

	//Adds objective to the section
	@Mutation("addObjectives")
	async addObjectives(@Args("id") id: string, @Args("input") input: string[]) {
		return await this.programService.addObjectives(id, input);
	}

	/// Add section feedback
	@Mutation("addSectionFeedback")
	async addSectionFeedback(
		@Args("sectionId") sectionId: string,
		@Args("userId") userId: string,
		@Args("input") data: Prisma.SectionFeedbackCreateInput
	) {
		return await this.programService.addSectionFeedback(
			sectionId,
			userId,
			data
		);
	}

	/// Update a sectionfeedback
	@Mutation("updateSectionFeedback")
	async updateSectionFeedback(
		@Args("id") id: string,
		@Args("input") data: SectionFeedbackUpdate
	) {
		return await this.programService.updateSectionFeedback(id, data);
	}

	/// Delete a SectionFeedback
	@Mutation("deleteSectionFeedback")
	async deleteSectionFeedback(@Args("id") id: string) {
		return await this.programService.deleteSectionFeedback(id);
	}

	@Mutation("addAssignmentResult")
	async addAssignmentResult(@Args("input") input: NewAssignmentResult) {
		return await this.programService.addAssignmentResult(input);
	}

	@Mutation("updateAssignmentResult")
	async updateAssignmentResult(
		@Args("id") id: string,
		@Args("result") result: number
	) {
		return await this.programService.updateAssignmentResult(id, result);
	}

	@Mutation("deleteAssignmentResult")
	async deleteAssignmentResult(@Args("id") id: string) {
		return await this.programService.deleteAssignmentResult(id);
	}

	@Mutation("addSectionEnrollment")
	async addSectionEnrollment(@Args("input") input: SectionEnrollmentInput) {
		return await this.programService.addSectionEnrollment(input);
	}

	@Mutation("updateSectionEnrollment")
	async updateSectionEnrollment(
		@Args("id") id: string,
		@Args("input") input: SectionEnrollmentInput
	) {
		return await this.programService.updateSectionEnrollment(id, input);
	}

	@Mutation("deleteSectionEnrollment")
	async deleteSectionEnrollment(@Args("id") id: string) {
		return await this.programService.deleteSectionEnrollment(id);
	}

	@Mutation("pairCourseSection")
	async pairCourseSection(
		@Args("courseId") courseId: string,
		@Args("sectionId") sectionId: string
	) {
		return await this.programService.pairCourseSection(courseId, sectionId);
	}

	@Mutation("unpairCourseSection")
	async unpairCourseSection(
		@Args("courseId") courseId: string,
		@Args("sectionId") sectionId: string
	) {
		return await this.programService.unpairCourseSection(courseId, sectionId);
	}

	@Mutation("createCollection")
	async createCollection(@Args("data") data: CreateCollectionArgs) {
		return await this.programService.createCollection(data);
	}

	@Mutation("updateCollection")
	async updateCollection(
		@Args("data") data: Prisma.CollectionUpdateInput,
		@Args("id") id: string
	) {
		return await this.programService.updateCollection(id, data);
	}

	@Mutation("createLesson")
	async createLesson(@Args("input") input: LessonInput) {
		return await this.programService.createLesson(input);
	}

	@Mutation("updateLesson")
	async updateLesson(
		@Args("input") input: LessonFields,
		@Args("replaceObj") replaceObj: boolean = false
	) {
		return await this.programService.updateLesson(input, replaceObj);
	}

	@Mutation("deleteLesson")
	async deleteLesson(@Args("id") id: string) {
		return await this.programService.deleteLesson(id);
	}

	@Mutation("createContent")
	async createContent(@Args("input") input: CreateContentArgs) {
		// we get the lesson based on the parent ID of the content
		const lesson = await this.programService.lesson({
			id: input.parent
		});

		// we make a copy of the content array, so we can manipulate it
		let updatedContentArray = [...lesson[0].content];

		//checking the length of the array to see no two elements have same content type
		let len = updatedContentArray.filter(
			(newArr) => newArr.type === input.type
		).length;
		if (len == 0) {
			return await this.programService.createContent(input);
		} else {
			throw new Error(
				"Content type already exists, Please change the content type"
			);
		}
	}

	@Mutation("updateContent")
	async updateContent(
		@Args("input") input: Omit<ContentFields, "id"> & { id: string }
	) {
		// since we need the ID to update a content, we need to make sure it's there
		if (!input.id) throw new Error("ID field is required");
		// we get the content based on the ID passed in, in order to get the parent lesson ID
		const original = await this.programService.content({
			id: input.id
		});
		// we get the lesson based on the parent ID of the content
		const lesson = await this.programService.lesson({
			id: original[0].parentID
		});

		// we make a copy of the content array, so we can manipulate it
		let updatedContentArray = [...lesson[0].content];

		// if the change is to make the content primary, we need to make sure there's only one primary content
		if (input.primary == true) {
			// we map through the array and make all the content secondary
			updatedContentArray = updatedContentArray.map((org) => {
				if (org.primary == true) {
					org.primary = false;
				}
				return org;
			});

			// we map through the array and make the content that was passed in primary
			updatedContentArray = updatedContentArray.map((org) => {
				if (org.id == input.id) {
					org.primary = true;
				}
				return org;
			});
		}

		// if the change is to make the content secondary, we need to make sure there's at least one primary content
		// if there is no primary content, we make the first content in the array primary
		if (input.primary == false) {
			// we map through the array and make the content that was passed in secondary
			updatedContentArray = updatedContentArray.map((org) => {
				if (org.id == input.id) {
					org.primary = false;
				}
				// we make all the content secondary
				if (org.primary == true) {
					org.primary = false;
				}
				return org;
			});
			// we make the first content in the array primary
			updatedContentArray[0].primary = true;
		}

		// we map through the array and update the content using the service
		const res = updatedContentArray.map(async (content) => {
			return await this.programService.updateContent({
				id: content.id,
				primary: content.primary
			});
		});

		// we resolve the promise and return the result
		return Promise.all(res)
			.then((res) => res)
			.catch((err) => new Error(err));
	}
	@Mutation("deleteContent")
	async deleteContent(@Args("contentID") contentID: string) {
		return await this.programService.deleteContent(contentID);
	}
}
