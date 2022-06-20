import React from "react";
import { useTimeslotLogic } from "components/Timetable/TimeslotsLayer/Timeslot/Timeslot.logic";
import styles from "components/Timetable/TimeslotsLayer/Timeslot/Timeslot.module.scss";
import { DateTime, Interval } from "luxon";
import { TimetableDimensions } from "components/Timetable/Timetable.logic";

export interface TimeslotProps {
    timeInterval : Interval,
    timetableDimensions : TimetableDimensions,
    timetableInterval : Interval,
    columnIndex : number,
}

export const Timeslot: React.FC<TimeslotProps> = (props) => {
    const logic = useTimeslotLogic(props);
    return (
        <div style={logic.getPositionStyle()} className={styles["timeslot"]}></div>
    );
}