import { EditorCourseListProps } from "./EditorCourseList";
import { useState } from "react";
import {Course} from "../../models/Course";

interface DialogState {
    isDialogOpened: boolean;
    courseUuid?: string;
    addCourse: (course: Course) => void;
}

export const useEditorCourseListLogic = (props: EditorCourseListProps) => {
    return {

        useCoursesDialog: ():[
            courses: Course[],
            dialogState: DialogState,
            handleOpen: (id?: string) => void,
            handleClose: ()=> void,
            removeCourse: (uuid: string) => void
        ] => {
            const { courses, addCourse, removeCourse } = props;
            const [dialogState, setDialogState] = useState<DialogState>({
                isDialogOpened: false,
                courseUuid: "",
                addCourse
            });

            const handleOpen = (id?: string) => {
                setDialogState({
                    isDialogOpened: true,
                    courseUuid: id,
                    addCourse
                });
            }
            const handleClose = () => {
                setDialogState({
                    isDialogOpened: false,
                    courseUuid: "",
                    addCourse
                });
            }

            return [
                courses,
                dialogState,
                handleOpen,
                handleClose,
                removeCourse
            ];
        }
    }
}