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
	ModuleFields,
	ModuleInput,
	CreateCollectionArgs,
	CreateContentArgs,
	ModEnrollmentFields,
	NewSection,
	CollectionFields,
	CreateLearningPathInput,
	PathInput,
	Module
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

	@Query("modulesBySectionEnrollment")
	async modulesBySectionEnrollment(
		@Args("planID") planID: string,
		@Args("sectionID") sectionID: string
	) {
		// using the combination of the student's plan of study and the section they are looking at
		// we can find the exact enrollment they are looking for as only one enrollment can exist for a student for a given section
		const enrollment = await this.programService.sectionEnrollment({
			plan: planID
		});

		const filteredEnrollment = enrollment.filter((enrollment) => {
			return enrollment.section.id === sectionID;
		});

		const modules = filteredEnrollment[0].section.collections.map(
			(collection) =>
				collection.modules.map((module) => {
					return module;
				})
		);

		const filteredModules = modules.flat().map((module) => {
			return module.moduleProgress.filter((progress) => {
				return progress.enrollment.id === filteredEnrollment[0].id;
			});
		});

		return [
			...modules
				.flat()
				.sort((a, b) => a.position - b.position)
				.map((module) => {
					return {
						...module,
						moduleProgress: filteredModules
							.flat()
							.filter((progress) => progress.moduleID === module.id)
					};
				})
		];
	}

	@Query("latestModuleProgress")
	async moduleProgress(
		@Args("planID") planID: string,
		@Args("sectionID") sectionID: string,
		@Args("moduleID") moduleID: string
	) {
		// we want to find the next collection of modules the student should be working on
		// we can do this by finding the enrollment for the student in the section they are looking at
		// and then finding the module progress for that enrollment
		// we can then filter the module progress to find the latest progress for the module they are looking at
		// if the module progress is empty, we can assume that the student has not started the module yet
		// and we can return the first module in the collection

		const enrollment = await this.programService.sectionEnrollment({
			plan: planID
		});

		const filteredEnrollment = enrollment.filter((enrollment) => {
			return enrollment.section.id === sectionID;
		});

		const modules = filteredEnrollment[0].section.collections.map(
			(collection) =>
				collection.modules.map((module) => {
					return module;
				})
		);

		const filteredModules = modules.flat().map((module) => {
			return module.moduleProgress.filter((progress) => {
				return progress.enrollment.id === filteredEnrollment[0].id;
			});
		});

		const latestModuleProgress = filteredModules
			.flat()
			.filter((progress) => progress.moduleID === moduleID)
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

		return latestModuleProgress;
	}

	@Query("modulesFromLearningPath")
	async modulesFromLearningPath(@Args("planID") planID: string) {
		// find enrollments for the student from planID
		// find the learning path for the plan
		// filter out inactive paths
		// filter out modules with a completed progress status
		// return the incomplete list of modules that match the student's learning path

		const enrollment = await this.programService.sectionEnrollment({
			plan: planID
		});

		const learningPath = await this.programService.learningPath(planID);

		const filteredLearningPath = learningPath[0].paths.filter((path) => {
			return path.status === "LIVE";
		});

		if (filteredLearningPath.length === 0) {
			return [];
		}

		const modules: Module[] = filteredLearningPath[0].course.sections
			.map((section) => {
				return section.collections.map((collection) => {
					return collection.modules.map((module) => {
						return module;
					});
				});
			})
			.flat()
			.flat();

		const nonDuplicateModules = modules.filter((module, index, self) => {
			return index === self.findIndex((m) => m.id === module.id);
		});

		const filteredModules = nonDuplicateModules.map((module) => {
			// if there is no progress for the module, return the module
			if (
				module.moduleProgress?.length === 0 ||
				module.moduleProgress === null ||
				typeof module.moduleProgress === "undefined"
			)
				return module;
			else {
				// if there is progress for the module, filter out the progresses made by other students
				// and return the module if there is no progress for the student
				const filteredProgress = module.moduleProgress.filter((progress) => {
					if (!progress) return false;
					else
						return (
							progress.enrollment.id === enrollment[0].id || !progress.completed
						);
				});
				if (filteredProgress.length === 0) return module;
				else return null;
			}
		});

		return filteredModules.filter((module) => module !== null);
	}

	@Query("collection")
	async collection(@Args("input") args: CollectionFields | null = null) {
		return await this.programService.collection(args);
	}

	@Query("content")
	async content(@Args("input") input: ContentFields) {
		return await this.programService.content(input);
	}

	@Query("module")
	async module(@Args("input") input: ModuleFields) {
		return await this.programService.module(input);
	}

	@Query("learningPath")
	async learningPath(
		@Args("planID") planID: string,
		@Args("pathID") pathID: string | null = null
	) {
		const lps = await this.programService.learningPath(planID);
		if (!lps) throw new Error("No learning paths found for inputted user");
		if (pathID !== null && typeof pathID !== "undefined") {
			const lp = lps[0].paths.find((path) => path.id === pathID);
			if (!lp) throw new Error("No learning path found with inputted ID");
			const payload = {
				...lps[0],
				paths: [{ ...lp }]
			};
			return [payload];
		}
		return lps;
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

	@Mutation("createModule")
	async createModule(@Args("input") input: ModuleInput) {
		return await this.programService.createModule(input);
	}

	@Mutation("updateModule")
	async updateModule(
		@Args("input") input: ModuleFields,
		@Args("replaceObj") replaceObj: boolean = false
	) {
		return await this.programService.updateModule(input, replaceObj);
	}

	@Mutation("deleteModule")
	async deleteModule(@Args("id") id: string) {
		return await this.programService.deleteModule(id);
	}

	@Mutation("createContent")
	async createContent(@Args("input") input: CreateContentArgs) {
		// we get the module based on the parent ID of the content
		const module = await this.programService.module({
			id: input.parent
		});

		// we make a copy of the content array, so we can manipulate it
		let updatedContentArray = [...module[0].content];

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
		// we get the content based on the ID passed in, in order to get the parent module ID
		const original = await this.programService.content({
			id: input.id
		});
		// we get the module based on the parent ID of the content
		const module = await this.programService.module({
			id: original[0].parentID
		});

		// we make a copy of the content array, so we can manipulate it
		let updatedContentArray = [...module[0].content];

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

	@Mutation("createLearningPath")
	async createLearningPath(
		@Args("planID") planID: string,
		@Args("input") input: CreateLearningPathInput
	) {
		if (!input.path && !input.paths)
			throw new Error(
				"Either a single path object or a list of path objects is required"
			);
		const data = await this.programService.createLearningPath(planID, input);

		if (!data)
			return new Error("An error occurred while creating your learning path");
		return data;
	}

	@Mutation("createPath")
	async createPath(
		@Args("planID") planID: string,
		@Args("input") input: PathInput
	) {
		const data = await this.programService.createPath(planID, input);
		if (data instanceof Error)
			return new Error("An error occurred while creating your path");
		return data;
	}

	@Mutation("updateLearningPath")
	async updateLearningPath(
		@Args("planID") planID: string,
		@Args("pathID") pathID: string,
		@Args("input") input: PathInput
	) {
		const data = await this.programService.updateLearningPath(
			planID,
			pathID,
			input
		);
		if (data instanceof Error)
			return new Error("An error occurred while updating your learning path");
		return data;
	}

	@Mutation("deleteLearningPath")
	async deleteLearningPath(
		@Args("planID") planID: string,
		@Args("pathID") pathID: string
	) {
		const data = await this.programService.deleteLearningPath(planID, pathID);
		if (data instanceof Error)
			return new Error("An error occurred while deleting your learning path");
		return data;
	}
}
