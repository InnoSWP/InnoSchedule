import React from "react";
import { useTimeslotLogic } from "./Timeslot.logic";
import styles from "./Timeslot.module.scss";
import { ReactDOMAttributes } from "@use-gesture/react";
import { DraggableTimeslotProps } from "components/Timetable/TimeslotsLayer/DraggableTimeslot/DraggableTimeslot";
import { Interval } from "luxon";

export interface TimeslotProps extends DraggableTimeslotProps {
    dragBind? : ReactDOMAttributes,
    shadow : boolean,
}

export const Timeslot: React.FC<TimeslotProps> = (props) => {
    const logic = useTimeslotLogic(props);

    return (
        <div
            style={logic.getPositionStyle()}
            className={props.shadow ? styles["shadow-timeslot"] : styles["timeslot"]}
            {...props.dragBind}
        >
            <span className={styles["discipline"]}>{props.discipline}</span>
            <span>{props.timeInterval.start.toFormat("HH:mm")}:{props.timeInterval.end.toFormat("HH:mm")}</span>
        </div>
    );
}