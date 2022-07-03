import { TimeslotProps } from "./Timeslot";
import { Interval } from "luxon";

export const useTimeslotLogic = (props: TimeslotProps) => {
    return {
        getPositionStyle() {
            const height = this.calculateTimeslotIntervalSize();
            const left   = this.calculateHorizontalOffset();
            const top    = this.calculateTopOffset();

            return {
                left,
                top,

                width: props.timetableDimensions.columnWidth - 4 + "px",
                height,
            }
        },

        calculateTimeslotIntervalSize() {
            return this.calculateIntervalSize(props.timeInterval);
        },

        calculateHorizontalOffset() {
            const pivotOffset  = props.timetableDimensions.relativePivot.x;
            const columnOffset = props.timetableDimensions.columnWidth * props.columnIndex;
            const borderOffset = (props.columnIndex - 1) / 2;
            const marginOffset = 2;

            return pivotOffset + columnOffset + borderOffset + marginOffset;
        },

        calculateTopOffset() {
            const dayStartToTimeslotInterval = Interval.fromDateTimes(
                props.timetableInterval.start,
                props.timeInterval.start,
            );

            const pivotOffset = props.timetableDimensions.relativePivot.y;
            const dayStartToTimeslotIntervalSize = this.calculateIntervalSize(dayStartToTimeslotInterval);

            return pivotOffset + dayStartToTimeslotIntervalSize;
        },

        calculateIntervalSize(interval : Interval) {
            const halfHourLength = props.timetableDimensions.rowHeight;
            const minutesInInterval = interval.length('minute');

            return (halfHourLength * minutesInInterval) / 30;
        },
    }
}