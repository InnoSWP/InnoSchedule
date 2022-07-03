import React from "react";
import { useTimetableRowLogic } from "components/Timetable/TimetableGrid/TimetableRow/TimetableRow.logic";
import { Interval } from "luxon";
import { TimetableGridProps } from "components/Timetable/TimetableGrid/TimetableGrid";
import axisStyles from "components/Timetable/TimetableGrid/TimetableAxis.module.scss";
import styles from "components/Timetable/TimetableGrid/TimetableRow/TimetableRow.module.scss";

export interface TimetableRowProps extends TimetableGridProps {
    interval : Interval,
}

export const TimetableRow: React.FunctionComponent<TimetableRowProps> = (props) => {
    const logic = useTimetableRowLogic(props);

    const formattedTime = logic.getIntervalBeginningTimeFormatted();
    return (
        <tr className={styles["timetableRow"]}>
            <td className={axisStyles["axisCell"]}> { formattedTime } </td>
            { props.columnObjects.map(getRowCell) }
        </tr>
    );
}

function getRowCell(object : never, index : number) {
    return <td key={index} className={styles["timetableRowCell"]}></td>
}