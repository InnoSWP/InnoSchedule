import { DraggableTimeslotProps } from "components/Timetable/TimeslotsLayer/DraggableTimeslot/DraggableTimeslot";
import { DateTime, Interval } from "luxon";
import { useSpring } from "react-spring";
import { useDrag, useGesture } from "@use-gesture/react";
import { useState } from "react";
import { start } from "repl";

export const useDraggableTimeslotLogic = (props: DraggableTimeslotProps) => {
    const [shadowTimeInterval, setShadowTimeInterval] = useState(props.timeInterval);
    const [shadowColumnIndex, setShadowColumnIndex] = useState(props.columnIndex);
    const [isDragging, setDragging] = useState(false);

    const [relativeX, setRelativeX] = useState(0);
    const [relativeY, setRelativeY] = useState(0);

    return {
        isDragging,
        shadowTimeInterval,
        shadowColumnIndex,

        useTimeslotDragBind() {
            return useGesture(
                {
                    onDrag: (eventData) => {
                        let { down,
                            movement: [mx, my],
                            xy: [x, y],
                            first,
                            last,
                            currentTarget,
                        } = eventData;

                        if(first) {
                            let boundingRect = (currentTarget as HTMLElement).getBoundingClientRect();

                            setRelativeX(x - boundingRect.left);
                            setRelativeY(Math.floor(y - boundingRect.top));

                            return;
                        }

                        if(last) {
                            props.onDragReleaseCallback(shadowTimeInterval, shadowColumnIndex);
                        }

                        setDragging(down);

                        this.setShadowTimeslotParameters(x, y);
                    }
                }
            )();
        },

            setShadowTimeslotParameters(x : number, y : number) {
            let [nx, ny]   = this.normalizeDragCoordsToPivot(x, y);

            if(this.dragInColumnBounds(nx, ny)) {
                setShadowColumnIndex(this.getCurrentDragColumn(nx, ny));
            }

            if(this.dragInRowBounds(nx, ny)) {
                this.getCurrentDragTimeInterval(nx, ny);
                // setShadowTimeInterval(this.getCurrentDragTimeInterval(nx, ny));
            }
        },

        normalizeDragCoordsToPivot(x : number, y : number) {
            return ([
                x - props.timetableDimensions.pivot.x,
                y - props.timetableDimensions.pivot.y
            ])
        },

        dragInColumnBounds(nx : number, ny : number) {
            let td = props.timetableDimensions;

            let rawTableWidth = td.columnWidth * td.columnsCount;
            let borderOffset = (td.columnsCount - 1) / 2;

            let totalWidth = rawTableWidth + borderOffset;

            return 0 < nx && nx < totalWidth;
        },

        dragInRowBounds(nx : number, ny : number) {
            return 0 < ny && ny < this.getTableHeight();
        },

        getTableHeight() {
            let td = props.timetableDimensions;

            let rawTableHeight = td.rowHeight * td.rowsCount;
            let borderOffset   = td.rowsCount / 10;

            return rawTableHeight + borderOffset;
        },

        getCurrentDragColumn(nx : number, ny : number) {
            let td = props.timetableDimensions;

            let possibleColumn = Math.ceil(nx / td.columnWidth) - 1;

            // Clamping value to [0, td.columnsCount - 1]
            return Math.max(0, Math.min(possibleColumn, td.columnsCount - 1));
        },

        getCurrentDragTimeInterval(nx : number, ny : number) {
            let tableStartMs = props.timetableInterval.start.toMillis();
            let tableEndMs   = props.timetableInterval.end.toMillis();

            let timeslotStartY = ny - 2 * relativeY;

            let newMillis = this.map(
                timeslotStartY,
                0, this.getTableHeight(),
                tableStartMs, tableEndMs
            );

            let intervalLength   = props.timeInterval.length("minutes");

            let roundedStartTime = this.roundTimeToFiveMinutes(DateTime.fromMillis(newMillis));
            let roundedEndTime   = roundedStartTime.plus({ minute : intervalLength});

            console.log(roundedStartTime.toISOTime());

            setShadowTimeInterval(Interval.fromDateTimes(roundedStartTime, roundedEndTime));
        },

        map(
            val : number,

            in_min : number,
            in_max : number,

            out_min : number,
            out_max : number
        ) {
            return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
        },

        roundTimeToFiveMinutes(time : DateTime) {
            let roundedTime = time.startOf("minute");

            const remainder = 5 - (time.minute % 5);

            return roundedTime.plus({ minutes : remainder });
        }
    }
}