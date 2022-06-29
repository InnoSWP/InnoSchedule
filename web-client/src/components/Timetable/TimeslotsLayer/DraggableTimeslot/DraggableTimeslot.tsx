import React from "react";
import { useDraggableTimeslotLogic } from "components/Timetable/TimeslotsLayer/DraggableTimeslot/DraggableTimeslot.logic";
import { Interval } from "luxon";
import { TimetableDimensions } from "components/Timetable/Timetable.logic";
import { Timeslot } from "./Timeslot";

export interface TimeslotDisplayParameters {
    timeInterval: Interval,
    columnIndex : number,
}

export interface DraggableTimeslotProps extends TimeslotDisplayParameters {
    discipline : string,
    timetableDimensions : TimetableDimensions,
    timetableInterval : Interval,
    onDragReleaseCallback : (interval : Interval, columnIndex : number) => void,
    onClick : () => void,
}

export const DraggableTimeslot: React.FC<DraggableTimeslotProps> = (props) => {
    const logic = useDraggableTimeslotLogic(props);

    return (
        <>
            <Timeslot
                {...props}
                shadow={false}
                dragBind={logic.useTimeslotDragBind()}
            />

            {
                logic.isDragging ?
                    <Timeslot
                        {...props}
                        columnIndex={logic.shadowColumnIndex}
                        timeInterval={logic.shadowTimeInterval}
                        shadow={true}
                    />
                        :
                    null
            }
        </>
    );
}