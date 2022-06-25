import { DraggableTimeslotProps } from "components/Timetable/TimeslotsLayer/DraggableTimeslot/DraggableTimeslot";
import { DateTime, Interval } from "luxon";
import { CommonGestureState, EventTypes, SharedGestureState, useDrag, Vector2 } from "@use-gesture/react";
import { useState } from "react";
import { map, roundTimeToFiveMinutes } from "utilities/Utilties";

export type DragEventData = Omit<SharedGestureState & CommonGestureState & { axis: "x" | "y" | undefined; xy: Vector2 } & { _pointerId?: number; _pointerActive: boolean; _keyboardActive: boolean; _preventScroll: boolean; _delayed: boolean; canceled: boolean; cancel(): void; tap: boolean; swipe: Vector2 } & { event: EventTypes["drag"] }, "event"> & { event: EventTypes["drag"] };

export const useDraggableTimeslotLogic = (props: DraggableTimeslotProps) => {
    const [shadowTimeInterval, setShadowTimeInterval] = useState(props.timeInterval);
    const [shadowColumnIndex, setShadowColumnIndex] = useState(props.columnIndex);

    const [isDragging, setDragging] = useState(false);
    const [relativeY, setRelativeY] = useState(0);

    return {
        isDragging,
        shadowTimeInterval,
        shadowColumnIndex,

        useTimeslotDragBind() {
            return useDrag((eventData) => {
                let { down,
                    xy: [x, y],
                    first,
                    last,
                    currentTarget,
                } = eventData;

                if(first) {
                    let boundingRect = (currentTarget as HTMLElement).getBoundingClientRect();
                    setRelativeY(Math.floor(y - boundingRect.top));
                    return;
                }

                if(last) {
                    props.onDragReleaseCallback(shadowTimeInterval, shadowColumnIndex);
                }

                setDragging(down);
                this.setShadowTimeslotParameters(x, y);
            })();
        },

        setShadowTimeslotParameters(x : number, y : number) {
            let [nax, nay] = this.normalizeCoordsToAbsolutePivot(x, y);

            if(this.dragInColumnBounds(nax)) {
                setShadowColumnIndex(this.getCurrentDragColumn(nax));
            }

            if(this.dragInRowBounds(nay)) {
                setShadowTimeInterval(this.getCurrentDragTimeInterval(nay));
            }
        },

        normalizeCoordsToAbsolutePivot(x : number, y : number) {
            return ([
                x - props.timetableDimensions.absolutePivot.x,
                y - props.timetableDimensions.absolutePivot.y
            ])
        },

        dragInColumnBounds(nx : number) {
            let td = props.timetableDimensions;

            let rawTableWidth = td.columnWidth * td.columnsCount;
            let borderOffset = (td.columnsCount - 1) / 2;

            let totalWidth = rawTableWidth + borderOffset;

            return 0 < nx && nx < totalWidth;
        },

        dragInRowBounds(ny : number) {
            return 0 < ny && ny < this.getTableHeight();
        },

        getTableHeight() {
            let td = props.timetableDimensions;

            let rawTableHeight = td.rowHeight * td.rowsCount;
            let borderOffset   = td.rowsCount / 10;

            return rawTableHeight + borderOffset;
        },

        getCurrentDragColumn(nx : number) {
            let td = props.timetableDimensions;

            let possibleColumn = Math.ceil(nx / td.columnWidth) - 1;

            // Clamping value to [0, td.columnsCount - 1]
            return Math.max(0, Math.min(possibleColumn, td.columnsCount - 1));
        },

        getCurrentDragTimeInterval(ny : number) {
            let exactStartTime = this.mapDragPositionToExactStartTime(ny);
            let roundedStartTime = roundTimeToFiveMinutes(exactStartTime);

            let intervalEndTime  = this.calculateIntervalEndTime(roundedStartTime);

            return Interval.fromDateTimes(roundedStartTime, intervalEndTime);
        },

        mapDragPositionToExactStartTime(ny : number) {
            let tableStartMs = props.timetableInterval.start.toMillis();
            let tableEndMs   = props.timetableInterval.end.toMillis();

            let timeslotStartY = ny - relativeY;

            let newMillis = map(
                timeslotStartY,
                0, this.getTableHeight(),
                tableStartMs, tableEndMs
            );

            return DateTime.fromMillis(newMillis);
        },

        calculateIntervalEndTime(startTime : DateTime) {
            let intervalLength = props.timeInterval.length("minutes");
            return startTime.plus({ minute : intervalLength});
        }
    }
}