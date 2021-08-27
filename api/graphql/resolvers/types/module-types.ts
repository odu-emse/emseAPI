import { Field, InputType } from "type-graphql";
import { Module } from "../../../models/Module";
import { ObjectId } from "mongodb";

@InputType()
export class ModuleInput implements Partial<Module> {
	@Field()
	moduleNumber!: number;

	@Field()
	moduleName!: string;

	@Field()
	objectives!: string;

	@Field()
	duration!: number;

	@Field()
	intro!: string;

	@Field()
	numSlides!: number;

	@Field()
	instructor!: ObjectId;

	@Field()
	rating!: [number];

	@Field()
	keywords!: [string];

	@Field()
	hasAssignment!: boolean;

	@Field()
	assignments!: [ObjectId];

	@Field()
	enrolled!: number;
}
