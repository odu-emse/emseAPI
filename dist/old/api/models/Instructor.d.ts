export declare class Instructor {
    id?: string;
    firstName: string;
    lastName?: string;
    middleName?: string;
    prefix?: string;
    dob?: string;
    email?: string;
    password?: string;
    passwordConf?: string;
    title?: string;
    officeLocation?: boolean;
}
export declare const InstructorModel: import("@typegoose/typegoose").ReturnModelType<typeof Instructor, import("@typegoose/typegoose/lib/types").BeAnObject>;
