import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserInput, User, UserDocument } from "./user.schema";

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>
	) {}

	async findById(id: User) {
		return this.userModel.findById(id).lean();
	}

	async findMany() {
		return this.userModel.find().lean();
	}

	async createUser(input: CreateUserInput) {
		return this.userModel.create(input, (err, doc) => {
			if (err) throw new Error("Failed save...");
			console.log(doc);
		});
	}
}
