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
import { Typography } from "@mui/material";

export const ScheduleEditor:React.FunctionComponent = () => {

    const logic = useScheduleEditorLogic();

    let { uuid } = useParams();
    if (!uuid) uuid = "new";

    const [courses, updateCourses, addCourse, removeCourse] = useCourses(uuid);
    const [setLabel] = useSetHeader("Editor", "/storage");

    const schedules = useAppSelector((state) => state.schedules.list);

    useEffect(() => {
        if (uuid && findScheduleByUuid(schedules, uuid).name !== "undefined") {
            setLabel(findScheduleByUuid(schedules, uuid).name);
        }
        updateCourses();
    }, [schedules]);

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
            <div className={styles["timetables"]}>
                <div>
                    <Typography sx={{
                        "font-size": "24px",
                        "margin-bottom": "16px",
                        "margin-left": "52px"
                    }}>Monday</Typography>
                    <DevTimetable onTimeslotClick={handlePropertiesOpen}/>
                </div>
            </div>
        </div>

        <TimeslotPropertiesDialog isOpen={isPropertiesDialogOpen}
                                  onClose={handlePropertiesClose} />
    </div>;
}