import { IconButton, Typography } from "@mui/material";
import React from "react";
import styles from "./EditorCourseList.module.scss"
import AddIcon from '@mui/icons-material/Add';
import { CourseListCard } from "../CourseListCard";
import { useEditorCourseListLogic } from "./EditorCourseList.logic";
import { AddCourseDialog } from "../AddCourseDialog";
import { remove, useAppDispatch, useAppSelector } from "../../store/ScheduleEditorStore/ScheduleEditorStore.logic";

export interface EditorCourseListProps {

}

export const EditorCourseList:React.FunctionComponent<EditorCourseListProps> = (props) => {

    const logic = useEditorCourseListLogic(props);
    const [dialogState, openDialog, closeDialog] = logic.useDialog();

    const courses = useAppSelector((state) => state.courses.courses);
    const dispatch = useAppDispatch();


    return <div className={styles["EditorCourseList"]}>
        <div className={styles["toolbar"]}>
            <Typography>Courses</Typography>

            <IconButton className={styles["button"]}
                        color="primary"
                        aria-label="add course"
                        onClick={() => {openDialog(courses.length)}}>
                <AddIcon />
            </IconButton>
            <AddCourseDialog
                open={dialogState.isDialogOpened}
                courseId={dialogState.classId}
                onClose={closeDialog} />
        </div>
        <div className={styles["courses"]}>
            { courses.map((e, i) => <CourseListCard key={i}
                                                    label={e.name}
                                                    classes={10}

                                                    onRemove={() => {dispatch(remove(i))}}
                                                    onEdit={() => {openDialog(i)}}/>) }
        </div>
    </div>
}