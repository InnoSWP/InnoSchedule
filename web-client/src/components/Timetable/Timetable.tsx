import React, { ForwardedRef, MutableRefObject, useEffect, useRef } from "react";
import { useTimeslotsDisplayLogic } from "components/Timetable/Timetable.logic";
import { TimetableGrid, TimetableGridProps } from "components/Timetable/TimetableGrid";
import styles from "components/Timetable/Timetable.module.scss";
import { TimeslotsLayer } from "components/Timetable/TimeslotsLayer";

export type TimetableProps = TimetableGridProps

export const Timetable: React.FC<TimetableProps> = (props) => {
    const logic = useTimeslotsDisplayLogic(props);
    const ref = useRef<HTMLTableElement>() as MutableRefObject<HTMLTableElement>;

    useEffect(() => {
        logic.calculateTimetableDimensions(ref);
    }, [props]);

    return (
        <div className={styles["timetable"]}>
            <TimetableGrid ref={ref} {...props}/>
            <TimeslotsLayer
                timetableDimensions={logic.timetableDimensions}
                timetableInterval={props.workingHours}
            />
        </div>
    );
}