import { Teacher } from "models/Teacher";
import { FormEvent } from "react";
import { CourseGroup, Course } from "models/Course";
import { AddCourseDialogProps, CourseData } from "./AddCourseDialog";
import {
    useAppSelector
} from "store";
import { findTeacherByName } from "utilities/Utilties";


export const useAddCourseDialogLogic = (props: AddCourseDialogProps) => {

    const teachersList = useAppSelector((state) => state.teachers.list);
    const { addCourse, courses, courseUuid } = props;

    return {
        useForm: () => {
            return (event: FormEvent<HTMLFormElement>) => {

                event.preventDefault();

                const formTarget = event.target as HTMLFormElement;
                const formElements = formTarget.elements;

                const courseName = (formElements[0] as HTMLInputElement).value;
                const courseAcronym = (formElements[1] as HTMLInputElement).value;
                const isDivision = (formElements[2] as HTMLInputElement).checked;

                const groups: Array<CourseGroup> = [];
                switch (isDivision) {
                    case true:
                        for (let i = 3; i < formElements.length - 2; ) {
                            const groupName = (formElements[i] as HTMLInputElement).value;

                            const splitGroupId = (formElements[i] as HTMLInputElement).id.split("-");
                            const groupId = splitGroupId[0] + "-" +  splitGroupId[1];

                            const teachers: Array<Teacher> = [];
                            for (i = i + 1; (formElements[i] as HTMLInputElement).id.startsWith(groupId); i=i+2) {
                                teachers.push(findTeacherByName(
                                    teachersList,
                                    (formElements[i] as HTMLInputElement).value)
                                );
                            }
                            i = i + 2;

                            groups.push(new CourseGroup(groupName, teachers));
                        }
                        break;
                    case false:
                        const teachers: Array<Teacher> = [];
                        for (let i = 3; i < formElements.length - 2; i = i+2) {
                            teachers.push(findTeacherByName(
                                teachersList,
                                (formElements[i] as HTMLInputElement).value)
                            );
                        }

                        groups.push(new CourseGroup("default group", teachers));
                        break;
                }

                const course = new Course(courseName, courseAcronym, isDivision, groups, "new");
                addCourse(course);
            }
        },

        useAutofill: ():CourseData|undefined => {

            let course: Course = new Course("", "", false, [], "new");
            if (courseUuid) courses.forEach((e) => {
                if (e.uuid === courseUuid) course = e;
            });

            if (course.uuid === "new") {
                return {
                    name: "",
                    acronym: "",
                    isDivision: false,

                    groups: [{
                        name: "",
                        group: [{
                            name: ""
                        }]
                    }]
                };
            }


            const groups = course.groups.map((e) => {
                return {
                    name: e.name,
                    group: e.teachers.map((e) => {
                        return {
                            name: e.name
                        }
                    })
                }
            })

            return {
                name: course.name,
                acronym: course.acronym,
                isDivision: course.isDivision,
                groups
            }
        }
    }
}