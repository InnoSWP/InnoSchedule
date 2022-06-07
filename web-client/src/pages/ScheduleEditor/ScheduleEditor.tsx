import React from "react";
import styles from "./ScheduleEditor.module.scss";

import { EditorToolbar } from "../../components/EditorToolbar";
import { EditorCourseList } from "../../components/EditorCourseList";
import { useSetLabel } from "../Layout";

export const ScheduleEditor:React.FunctionComponent = () => {
    useSetLabel("BS21");

    return <div className={styles["ScheduleEditor"]}>
        <EditorToolbar />
        <EditorCourseList />
    </div>;
}