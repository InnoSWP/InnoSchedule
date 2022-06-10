import { Teacher } from "models/Teacher";
import { FormEvent } from "react";
import { CourseGroup, Course } from "../../models/Course";
import { add, useAppDispatch, useAppSelector } from "../../store/ScheduleEditorStore/ScheduleEditorStore.logic";
import { AddCourseDialogProps } from "./AddCourseDialog";


export const useAddCourseDialogLogic = (props: AddCourseDialogProps) => {

    const dispatch = useAppDispatch();
    const courses = useAppSelector((state) => state.courses.courses);

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
                        let c;
                        for (let i = 3; i < formElements.length - 2; c = 0) {
                            const groupName = (formElements[i] as HTMLInputElement).value;

                            const splitGroupId = (formElements[i] as HTMLInputElement).id.split("-");
                            const groupId = splitGroupId[0] + "-" +  splitGroupId[1];

                            const teachers: Array<Teacher> = [];
                            for (i = i+1; (formElements[i] as HTMLInputElement).id.startsWith(groupId); i=i+2) {
                                console.log((formElements[i] as HTMLInputElement).id);
                                teachers.push(new Teacher((formElements[i] as HTMLInputElement).value));
                            }
                            i=i+2;

                            groups.push(new CourseGroup(groupName, teachers));
                        }
                        break;
                    case false:
                        const teachers: Array<Teacher> = [];
                        for (let i = 3; i < formElements.length - 2; i = i+2) {
                            teachers.push(new Teacher((formElements[i] as HTMLInputElement).value));
                        }

                        groups.push(new CourseGroup("default group", teachers));
                        break;
                }

                const course = new Course(courseName, courseAcronym, isDivision, groups);
                dispatch(add({
                    courseId: props.courseId,
                    courseToAdd: course
                }));
            }
        },

        useAutofill: ():Course => {
            if (!courses[props.courseId]) {
                return new Course(
                    "",
                    "",
                    false,
                    [new CourseGroup("default", [new Teacher("")])]
                );
            }

            return courses[props.courseId];
        }
    }
}