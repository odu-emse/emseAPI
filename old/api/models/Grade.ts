import { getModelForClass, prop } from "@typegoose/typegoose";
import { Ref } from "../graphql/types";
import { Field, ObjectType } from "type-graphql";
import { Assignment } from "./Assignment";

@ObjectType()
export class Grade {
	@Field(() => Assignment)
	@prop()
	assignment!: Ref<Assignment>;

	@Field()
	@prop()
	result!: number;
}

export const GradeModel = getModelForClass(Grade);
