import React, { useState } from "react";
import { useTimeslotsLayerLogic } from "./TimeslotsLayer.logic";
import styles from "./TimeslotsLayer.module.scss";
import { DraggableTimeslot } from "components/Timetable/TimeslotsLayer/DraggableTimeslot";
import { TimetableDimensions } from "components/Timetable/Timetable.logic";
import { DateTime, Interval } from "luxon";

export interface TimeslotLayerDrilledProps {
    onTimeslotClick : () => void, // TODO : Implement callback properly
}

export interface TimeslotsLayerProps extends TimeslotLayerDrilledProps {
    timetableDimensions : TimetableDimensions | undefined,
    timetableInterval : Interval,
}

export const TimeslotsLayer: React.FC<TimeslotsLayerProps> = (props) => {
    const [time, setTime] = useState(
        Interval.fromDateTimes(
            DateTime.fromObject({
                hour: 11,
            }),
            DateTime.fromObject({
                hour: 12,
                minute: 30,
            })
        )
    );
    const [column, setColumn] = useState(5);

    const logic = useTimeslotsLayerLogic(props);

    return (
        <div className={styles["timeslots"]}>
            {props.timetableDimensions ?
                <DraggableTimeslot
                    onClick={props.onTimeslotClick}
                    discipline="Physical Culture and Sport (Theoretical)"
                    timeInterval={time}
                    timetableDimensions={props.timetableDimensions}
                    timetableInterval={props.timetableInterval}
                    columnIndex={column}
                    onDragReleaseCallback={(interval, columnIndex) => {
                        setTime(interval); setColumn(columnIndex);
                    }
                    }
                />
                :
                <></>
            }
        </div>
    );
}