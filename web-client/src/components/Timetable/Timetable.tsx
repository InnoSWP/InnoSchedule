import React, { MutableRefObject, useLayoutEffect, useRef } from "react";
import { useTimeslotsDisplayLogic } from "components/Timetable/Timetable.logic";
import { TimetableGrid, TimetableGridProps } from "components/Timetable/TimetableGrid";
import styles from "components/Timetable/Timetable.module.scss";
import { TimeslotLayerDrilledProps, TimeslotsLayer } from "components/Timetable/TimeslotsLayer";
import { useRerenderOnResize } from "utilities/hooks/useRerenderOnResize";

export type TimetableProps = TimetableGridProps & TimeslotLayerDrilledProps;

export const Timetable: React.FC<TimetableProps> = (props) => {
    let rerenderFlag = useRerenderOnResize();
    const logic = useTimeslotsDisplayLogic(props);
    const ref = useRef<HTMLTableElement>() as MutableRefObject<HTMLTableElement>;

    useLayoutEffect(() => {
        logic.calculateTimetableDimensions(ref);
    }, [props, rerenderFlag]);

    return (
        <div className={styles["timetable"]}>
            <TimetableGrid ref={ref} {...props}/>
            <TimeslotsLayer
                {...props}
                timetableDimensions={logic.timetableDimensions}
                timetableInterval={props.workingHours}
            />
        </div>
    );
}