import { Model } from "mongoose";
import { PoSDocument } from "./pos.schema";
export declare class PoSService {
    private posModel;
    constructor(posModel: Model<PoSDocument>);
    findByPlanId(id: string): Promise<import("mongoose").DocumentDefinition<PoSDocument>>;
    findByStudentID(student: string): Promise<PoSDocument[]>;
}
