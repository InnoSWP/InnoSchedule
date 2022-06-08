import { Teacher } from "./Teacher";

export class CourseGroup {
    name: string;
    teachers: Array<Teacher>;

    constructor(name: string, teachers: Array<Teacher>) {
        this.name = name;
        this.teachers = teachers;
    }
}

export class Course {
    name: string;
    acronym: string;
    isDivision: boolean;
    groups: Array<CourseGroup>;

    constructor(name: string, acronym:string, isDivision: boolean, groups: Array<CourseGroup>) {
        this.name = name;
        this.acronym = acronym;
        this.isDivision = isDivision;
        this.groups = groups;
    }
}