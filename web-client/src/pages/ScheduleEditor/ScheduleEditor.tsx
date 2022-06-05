import React from "react";
import styles from "./ScheduleEditor.module.scss";

import { EditorToolbar } from "../../components/EditorToolbar";
import {EditorCourseList} from "../../components/EditorCourseList";

export const ScheduleEditor:React.FunctionComponent = () => {
    return <div className={styles["ScheduleEditor"]}>
        <EditorToolbar />
        <EditorCourseList />
    </div>;
}