import { Teacher } from "./Teacher";

export class CourseGroup {

    name: string;
    teachers: Teacher[];

    constructor(name: string, teachers: Array<Teacher>) {
        this.name = name;
        this.teachers = teachers;
    }
}

export class Course {

    uuid: string;
    name: string;
    acronym: string;
    isDivision: boolean;
    groups: Array<CourseGroup>;

    constructor(name: string, acronym:string, isDivision: boolean, groups: Array<CourseGroup>, uuid: string) {
        this.uuid = uuid;
        this.name = name;
        this.acronym = acronym;
        this.isDivision = isDivision;
        this.groups = groups;
    }
}