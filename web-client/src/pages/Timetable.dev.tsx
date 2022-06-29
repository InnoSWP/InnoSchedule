import React from 'react';
import { DateTime, Interval } from "luxon";
import { Weekday } from "models/Weekday";
import { WeekDayColumnObjectWrapper } from "components/Timetable/TimetableGrid/ColumnObjectWrappers/WeekDayColumnObjectWrapper";
import { Timetable } from "components/Timetable/Timetable";

interface DevTimetableProps {}

export const DevTimetable:React.FunctionComponent<DevTimetableProps> = (props) => {

    const workingHours = Interval.fromDateTimes(
        DateTime.fromObject({
            hour: 9,
        }),
        DateTime.fromObject({
            hour: 17,
        })
    );

    const columnObjectWrappers = Object.values(Weekday)
        .filter((weekdayOrString) => typeof weekdayOrString !== "string")
        .map((weekday) => {
            return new WeekDayColumnObjectWrapper(weekday as Weekday);
        });

    return (
        <Timetable workingHours={workingHours} columnObjects={columnObjectWrappers}/>
    );
}

export default DevTimetable;
