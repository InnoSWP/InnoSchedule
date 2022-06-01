import { TimetableProps } from "./Timetable";
import { Duration } from "luxon";

export const useTimetableLogic = (props : TimetableProps) => {
    return {
        workingHoursToHalfHourIntervals: () => {
           return props.workingHours.splitBy(Duration.fromObject({minutes : 30}));
        }
    }
}