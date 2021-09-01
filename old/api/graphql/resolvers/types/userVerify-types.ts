import { InputType } from "type-graphql";
import { UserVerify } from "../../../models/UserVerify";

@InputType()
export class UserVerifyInput implements Partial<UserVerify> {
	token!: String;

	dateSent!: Number;

	used!: Boolean;
}
