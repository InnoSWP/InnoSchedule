import React, { useEffect } from "react";
import styles from "./ScheduleEditor.module.scss";

import { EditorToolbar } from "components/EditorToolbar";
import { EditorCourseList } from "components/EditorCourseList";
import { useSetHeader } from "../Layout";
import DevTimetable from "../Timetable.dev";
import { useParams } from "react-router-dom";
import { useCourses } from "hooks/useCourses";
import { TimeslotPropertiesDialog } from "components/TimeslotPropertiesDialog";
import { useScheduleEditorLogic } from "pages/ScheduleEditor/ScheduleEditor.logic";
import { useAppSelector } from "store";
import { findScheduleByUuid } from "utilities/Utilties";

export const ScheduleEditor:React.FunctionComponent = () => {

    const logic = useScheduleEditorLogic();

    let { uuid } = useParams();
    if (!uuid) uuid = "new";

    const [courses, updateCourses, addCourse, removeCourse] = useCourses(uuid);

    const schedules = useAppSelector((state) => state.schedules.list);

    let label = "Editor";
    useEffect(() => {
        updateCourses();
    }, []);

    if (uuid) label = findScheduleByUuid(schedules, uuid).name;
    useSetHeader(label, "/storage");

    const [
        isPropertiesDialogOpen,
        handlePropertiesOpen,
        handlePropertiesSubmit,
        handlePropertiesClose
    ] = logic.usePropertiesDialog();

    return <div className={styles["ScheduleEditor"]}>
        <EditorToolbar />
        <div className={styles["editor"]}>
            <EditorCourseList courses={courses}
                              updateCourses={updateCourses}
                              addCourse={addCourse}
                              removeCourse={removeCourse}/>
            <div className={styles["timetable"]}>
                <DevTimetable />
            </div>
        </div>

        <TimeslotPropertiesDialog isOpen={isPropertiesDialogOpen}
                                  onClose={handlePropertiesClose} />
    </div>;
}