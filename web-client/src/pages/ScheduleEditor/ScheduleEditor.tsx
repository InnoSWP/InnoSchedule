import React from "react";
import styles from "./ScheduleEditor.module.scss";

import { EditorToolbar } from "../../components/EditorToolbar";
import { EditorCourseList } from "../../components/EditorCourseList";
import { useSetHeader } from "../Layout";
import DevTimetable from "../Timetable.dev";

export const ScheduleEditor:React.FunctionComponent = () => {

    useSetHeader("BS21", "/storage");

    return <div className={styles["ScheduleEditor"]}>
        <EditorToolbar />
        <div className={styles["editor"]}>
            <EditorCourseList />
            <div className={styles["timetable"]}>
                <DevTimetable />
            </div>
        </div>
    </div>;
}