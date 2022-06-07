import React from "react";
import { Interval } from "luxon";
import { useTimetableLogic } from "./Timetable.logic";
import { TimetableRow } from "./TimetableRow";
import { TimetableHeader } from "./TimetableHeader";
import { ColumnObjectWrapper } from "components/Timetable/ColumnObjectWrappers/ColumnObjectWrapper";
import styles from "./Timetable.module.scss";

export interface TimetableProps {
    workingHours  : Interval,
    columnObjects : ColumnObjectWrapper<any>[],
}

export const Timetable : React.FunctionComponent<TimetableProps> = (props) => {
    let logic = useTimetableLogic(props);
    let intervals = logic.workingHoursToHalfHourIntervals();

    return <table className={styles["timetable"]}>
        <TimetableHeader {...props}></TimetableHeader>

        <tbody>
            { intervals.map(getTableRow.bind(this, props)) }
        </tbody>
    </table>
}

function getTableRow(props : TimetableProps, interval : Interval, index : number) {
    return <TimetableRow key={index} interval={interval} {...props}></TimetableRow>
}