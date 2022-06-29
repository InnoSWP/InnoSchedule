import React from 'react';
import { DateTime, Interval } from "luxon";
import { Weekday } from "models/Weekday";
import { WeekDayColumnObjectWrapper } from "components/Timetable/TimetableGrid/ColumnObjectWrappers/WeekDayColumnObjectWrapper";
import { Timetable } from "components/Timetable/Timetable";


function DevTimetable() {

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
        <>
        <Timetable
            workingHours={workingHours}
            columnObjects={columnObjectWrappers}
            onTimeslotClick={() => console.log("bruh")}
        />
        <Timetable
            workingHours={workingHours}
            columnObjects={columnObjectWrappers}
            onTimeslotClick={() => console.log("bruh")}
        />
        </>
    );
}

export default DevTimetable;