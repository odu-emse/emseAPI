import { UserService } from "../user/user.service";
import { PlanOfStudyInput } from "./pos.schema";
import { PoSService } from "./pos.service";
export declare class PlanOfStudyResolver {
    private planService;
    private userService;
    constructor(planService: PoSService, userService: UserService);
    plan({ student }: PlanOfStudyInput): Promise<import("./pos.schema").PoSDocument[]>;
}
