import { IconButton, Typography } from "@mui/material";
import React from "react";
import styles from "./EditorCourseList.module.scss"
import AddIcon from '@mui/icons-material/Add';
import { CourseListCard } from "../CourseListCard";
import { useEditorCourseListLogic } from "./EditorCourseList.logic";
import { AddCourseDialog } from "../AddCourseDialog";
import { Course } from "models/Course";

export interface EditorCourseListProps {
    courses: Course[];
    updateCourses: () => void;
    addCourse: (course: Course) => void;
    removeCourse: (uuid: string) => void;
}

export const EditorCourseList:React.FunctionComponent<EditorCourseListProps> = (props) => {

    const logic = useEditorCourseListLogic(props);
    const [
        courses,
        dialogState,
        openDialog,
        closeDialog,
        removeCourse
    ] = logic.useCoursesDialog();

    return <div className={styles["EditorCourseList"]}>
        <div className={styles["toolbar"]}>
            <Typography>Courses</Typography>

            <IconButton className={styles["button"]}
                        color="primary"
                        aria-label="add course"
                        onClick={() => {openDialog()}}>
                <AddIcon />
            </IconButton>
            <AddCourseDialog
                open={dialogState.isDialogOpened}
                courseUuid={dialogState.courseUuid}
                courses={courses}
                addCourse={dialogState.addCourse}
                onClose={closeDialog} />
        </div>
        <div className={styles["courses"]}>
            { courses.map((e, i) => <CourseListCard key={i}
                                                    label={e.name}
                                                    classes={10}

                                                    onRemove={() => {removeCourse(e.uuid)}}
                                                    onEdit={() => {openDialog(e.uuid)}}/>) }
        </div>
    </div>
}