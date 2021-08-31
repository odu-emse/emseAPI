import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { FindPlanOfStudyInput, PlanOfStudy, PoSDocument } from "./pos.schema";

@Injectable()
export class PoSService {
	constructor(
		@InjectModel(PlanOfStudy.name) private posModel: Model<PoSDocument>
	) {}

	async findMany() {
		console.log(this.posModel.findById("60086f631457a473bcb85937"));
		return this.posModel.find().lean();
	}

	async findById(id: string) {
		return this.posModel.findById(id).lean();
	}

	async findByStudent(studentID: FindPlanOfStudyInput) {
		return this.posModel.findById({ student: studentID }).lean();
	}

	// async createPlan(plan: CreatePlanOfStudyInput) {
	// 	return this.posModel.create(plan.student);
	// }
}
