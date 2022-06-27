import { DraggableTimeslotProps } from "components/Timetable/TimeslotsLayer/DraggableTimeslot/DraggableTimeslot";
import { DateTime, Interval } from "luxon";
import { CommonGestureState, EventTypes, SharedGestureState, useDrag, Vector2 } from "@use-gesture/react";
import { useState } from "react";
import { clampInterval, map, roundTimeToFiveMinutes } from "utilities/Utilties";

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
                const { down,
                    xy: [x, y],
                    first,
                    last,
                    currentTarget,
                } = eventData;

                if(first) {
                    const boundingRect = (currentTarget as HTMLElement).getBoundingClientRect();
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
            const [nax, nay] = this.normalizeCoordsToAbsolutePivot(x, y);

            if(this.dragInColumnBounds(nax)) {
                setShadowColumnIndex(this.getCurrentDragColumn(nax));
            }

            if(this.dragInRowBounds(nay)) {
                setShadowTimeInterval(this.getCurrentDragTimeInterval(nay));
            }
        },

        normalizeCoordsToAbsolutePivot(x : number, y : number) {
            let scrollLeftOffset = window.document.documentElement.scrollLeft;
            let scrollTopOffset  = window.document.documentElement.scrollTop;

            return ([
                x - props.timetableDimensions.absolutePivot.x + scrollLeftOffset,
                y - props.timetableDimensions.absolutePivot.y + scrollTopOffset,
            ])
        },

        dragInColumnBounds(nx : number) {
            const td = props.timetableDimensions;

            const rawTableWidth = td.columnWidth * td.columnsCount;
            const borderOffset = (td.columnsCount - 1) / 2;

            const totalWidth = rawTableWidth + borderOffset;

            return 0 < nx && nx < totalWidth;
        },

        dragInRowBounds(ny : number) {
            return 0 < ny && ny < this.getTableHeight();
        },

        getTableHeight() {
            const td = props.timetableDimensions;

            const rawTableHeight = td.rowHeight * td.rowsCount;
            const borderOffset   = td.rowsCount / 10;

            return rawTableHeight + borderOffset;
        },

        getCurrentDragColumn(nx : number) {
            const td = props.timetableDimensions;

            const possibleColumn = Math.ceil(nx / td.columnWidth) - 1;

            // Clamping value to [0, td.columnsCount - 1]
            return Math.max(0, Math.min(possibleColumn, td.columnsCount - 1));
        },

        getCurrentDragTimeInterval(ny : number) {
            const exactStartTime = this.mapDragPositionToExactStartTime(ny);
            const roundedStartTime = roundTimeToFiveMinutes(exactStartTime);

            const intervalEndTime  = this.calculateIntervalEndTime(roundedStartTime);

            const dragInterval = Interval.fromDateTimes(roundedStartTime, intervalEndTime);

            // logInterval(clampInterval(dragInterval, props.timetableInterval));

            return clampInterval(dragInterval, props.timetableInterval);
        },

        mapDragPositionToExactStartTime(ny : number) {
            const tableStartMs = props.timetableInterval.start.toMillis();
            const tableEndMs   = props.timetableInterval.end.toMillis();

            const timeslotStartY = ny - relativeY;

            const newMillis = map(
                timeslotStartY,
                0, this.getTableHeight(),
                tableStartMs, tableEndMs
            );

            return DateTime.fromMillis(newMillis);
        },

        calculateIntervalEndTime(startTime : DateTime) {
            const intervalLength = props.timeInterval.length("minutes");
            return startTime.plus({ minute : intervalLength});
        }
    }
}