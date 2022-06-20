import React, { Ref, useEffect, useRef } from "react";
import { Interval } from "luxon";
import { useTimetableGridLogic } from "components/Timetable/TimetableGrid/TimetableGrid.logic";
import { TimetableRow } from "components/Timetable/TimetableGrid/TimetableRow";
import { TimetableHeader } from "components/Timetable/TimetableGrid/TimetableHeader";
import { ColumnObjectWrapper } from "components/Timetable/TimetableGrid/ColumnObjectWrappers/ColumnObjectWrapper";
import styles from "components/Timetable/TimetableGrid/TimetableGrid.module.scss";

export interface TimetableGridProps {
    workingHours  : Interval,
    columnObjects : ColumnObjectWrapper<any>[],
}

export const TimetableGrid = React.forwardRef<HTMLTableElement, TimetableGridProps>(
    (props, ref) => {
    let logic = useTimetableGridLogic(props);
    let intervals = logic.workingHoursToHalfHourIntervals();

    return <table ref={ref} className={styles["timetable"]}>
        <TimetableHeader {...props}></TimetableHeader>

        <tbody>
            { intervals.map(getTableRow.bind(this, props)) }
        </tbody>
    </table>
});

function getTableRow(props : TimetableGridProps, interval : Interval, index : number) {
    return <TimetableRow key={index} interval={interval} {...props}></TimetableRow>
}