import { TimetableRowProps } from "components/Timetable/TimetableRow/TimetableRow";

export const useTimetableRowLogic = (props: TimetableRowProps) => {
    return {
        getIntervalBeginningTimeFormatted() {
            return props.interval.start.toFormat("H:mm")
        }
    }
}