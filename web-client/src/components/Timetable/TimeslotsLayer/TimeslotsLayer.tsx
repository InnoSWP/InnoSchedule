import React from "react";
import { useTimeslotsLayerLogic } from "./TimeslotsLayer.logic";
import styles from "./TimeslotsLayer.module.scss";
import { Timeslot } from "components/Timetable/TimeslotsLayer/Timeslot";
import { TimetableDimensions } from "components/Timetable/Timetable.logic";
import { DateTime, Interval } from "luxon";

export interface TimeslotsLayerProps {
    timetableDimensions : TimetableDimensions | undefined,
    timetableInterval : Interval,
}

export const TimeslotsLayer: React.FC<TimeslotsLayerProps> = (props) => {
    const logic = useTimeslotsLayerLogic(props);

    let time = Interval.fromDateTimes(
        DateTime.fromObject({
            hour: 11,
        }),
        DateTime.fromObject({
            hour: 12,
            minute: 30,
        })
    );

    return (
        <div className={styles["timeslots"]}>
            {props.timetableDimensions ?
                <Timeslot
                    timeInterval={time}
                    timetableDimensions={props.timetableDimensions}
                    timetableInterval={props.timetableInterval}
                    columnIndex={5}
                />
                :
                <></>
            }
        </div>
    );
}