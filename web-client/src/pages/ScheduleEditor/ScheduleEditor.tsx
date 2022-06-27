import React from "react";
import styles from "./ScheduleEditor.module.scss";

import { EditorToolbar } from "../../components/EditorToolbar";
import { EditorCourseList } from "../../components/EditorCourseList";
import { useSetHeader } from "../Layout";
import DevTimetable from "../Timetable.dev";
import { useParams } from "react-router-dom";
import { useCourses } from "../../hooks/useCourses";

export const ScheduleEditor:React.FunctionComponent = () => {

    useSetHeader("B21 - Spring", "/storage");

    let { uuid } = useParams();
    if (!uuid) uuid = "new";
    const [courses, updateCourses, addCourse, removeCourse] = useCourses(uuid);

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
    </div>;
}