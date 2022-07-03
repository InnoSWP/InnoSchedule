import React, { MutableRefObject, useLayoutEffect, useRef } from "react";
import { useTimeslotsDisplayLogic } from "components/Timetable/Timetable.logic";
import { TimetableGrid, TimetableGridDrilledProps } from "components/Timetable/TimetableGrid";
import styles from "components/Timetable/Timetable.module.scss";
import { TimeslotLayerDrilledProps, TimeslotsLayer } from "components/Timetable/TimeslotsLayer";
import { useRerenderOnResize } from "utilities/hooks/useRerenderOnResize";

export interface TimetableCombinedProps extends
    TimetableGridDrilledProps,
    TimeslotLayerDrilledProps
{ }

export const Timetable: React.FC<TimetableCombinedProps> = (props) => {
    let rerenderFlag = useRerenderOnResize();
    const logic = useTimeslotsDisplayLogic(props);
    const ref = useRef<HTMLTableElement>() as MutableRefObject<HTMLTableElement>;

    useLayoutEffect(() => {
        logic.calculateTimetableDimensions(ref);
    }, [props, rerenderFlag]);

    const columnObjects = Array.from( props.timeslots.keys() ) as never[];

    return (
        <div className={styles["timetable"]}>
            <TimetableGrid
                columnObjects={columnObjects}
                ref={ref}
                {...props}
            />
            { logic.timetableDimensions
            ? <TimeslotsLayer
                {...props}
                timetableDimensions={logic.timetableDimensions}
                timetableInterval={props.workingHours}
            />
            : <></> }
        </div>
    );
}