import { InputType, Field, ID } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { User } from "../../../models/User";
import { ObjectId } from "mongodb";

@InputType()
export class UserInput implements Partial<User> {
	@Field()
	@Length(1, 255)
	firstName!: string;

	@Field()
	lastName!: string;

	@Field()
	middleName!: string;

	@Field()
	prefix!: string;

	@Field()
	dob!: string;

	@Field()
	@IsEmail()
	email!: string;

	password!: string;

	passwordConf!: string;

	@Field()
	planOfStudy!: ObjectId;

	@Field()
	group!: string;

	@Field()
	active!: boolean;
}
