//package imports
import { Resolver, Query, Arg, createUnionType } from "type-graphql";
import { Course, CourseModel } from "../../models/Course";

// custom imports
import { Module, ModuleModel } from "../../models/Module";

export const SearchResultUnion = createUnionType({
	name: "ProgramSearchResult",
	types: () => [Module, Course],
	// resolveType: async value => {
	// 	console.log(value);

	// 	if ("moduleName" in value) {
	// 		const modules = await ModuleModel.find({
	// 			moduleName: { $regex: `/${value.moduleName}/i` },
	// 		});
	// 		return Module; // we can return object type class (the one with `@ObjectType()`)
	// 	}
	// 	if ("courseName" in value) {
	// 		return "Course"; // or the schema name of the type as a string
	// 	}
	// 	return undefined;
	// },
});

@Resolver()
export class ProgramResolver {
	@Query(_returns => [Module], { nullable: false })
	async getModules(): Promise<Module[]> {
		return ModuleModel.find();
	}

	@Query(_returns => [Course], { nullable: false })
	async getCourses(): Promise<Course[]> {
		return CourseModel.find();
	}

	@Query(_returns => Module, { nullable: true })
	async getModuleByID(@Arg("id") id: string) {
		return ModuleModel.findById({ _id: id });
	}

	@Query(_returns => Module, { nullable: true })
	async getModuleByTitle(@Arg("title") title: string) {
		return ModuleModel.find({ moduleName: title });
	}

	@Query(_returns => [SearchResultUnion], { nullable: true })
	async searchProgram(
		@Arg("title") title: string,
		@Arg("number", { nullable: true }) number?: number,
		@Arg("instructor", { nullable: true }) instructor?: string,
		@Arg("rating", { nullable: true }) rating?: number
	): Promise<typeof SearchResultUnion[]> {
		const modules = await Module.find();

		const courses = await CourseModel.find();

		return [...modules, ...courses];
	}
}
