import { TimetableGridProps } from "components/Timetable/TimetableGrid/TimetableGrid";
import { Duration } from "luxon";

export const useTimetableGridLogic = (props : TimetableGridProps) => {
    return {
        workingHoursToHalfHourIntervals: () => {
           return props.workingHours.splitBy(Duration.fromObject({minutes : 30}));
        }
    }
}