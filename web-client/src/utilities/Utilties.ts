import { DateTime, Interval } from "luxon";
import { Teacher } from "models/Teacher";
import { ScheduleForList } from "models/ScheduleForList";
import { Timeslot } from "models/Timeslot";

export const map = (val : number,
    in_min : number,
    in_max : number,

    out_min : number,
    out_max : number
) => {
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

export const clamp = (val : number, bounds : [number, number]) => {
    return Math.min(Math.max(val, bounds[0]), bounds[1]);
}

export const clampInterval = (interval : Interval, bound : Interval) => {
    const difference = interval.difference(bound);

    if(difference.length === 0) return interval;

    const diff   = difference[0];
    const length = diff.length();

    if(bound.abutsStart(diff)) {
        return interval
            .mapEndpoints((time) =>
                time.minus(length)
            );
    } else {
        return interval
            .mapEndpoints((time) =>
                time.plus(length)
            );
    }
}

export const logInterval = (interval : Interval) => {
    const start = interval.start.toFormat("HH:mm");
    const end = interval.end.toFormat("HH:mm");
    console.log(`${start} -> ${end}`);
}

export const roundTimeToFiveMinutes = (time : DateTime) => {
    const roundedTime = time.startOf("minute");

    const remainder = 5 - (time.minute % 5);

    return roundedTime.plus({ minutes : remainder });
};

export type TimeString = `${number}:${number}`;

export const createInterval = (timeStart : TimeString, timeEnd : TimeString) => {
    const dateTimeStart = DateTime.fromFormat(timeStart, "HH:mm");
    const dateTimeEnd   = DateTime.fromFormat(timeEnd, "HH:mm");

    return Interval.fromDateTimes(dateTimeStart, dateTimeEnd);
}

export const createTimeslot = (name : string, timeStart : TimeString, timeEnd : TimeString) => {
    return {
        name,
        interval : createInterval(timeStart, timeEnd),
    } as Timeslot;
}

export const findTeacherByName = (teachers:Teacher[], name: string):Teacher => {

    let found = new Teacher("undefined", "-1");
    teachers.forEach((e) => {
        if (e.name === name) found = e;
    });

    return found;
}

export const findScheduleByUuid = (schedules:ScheduleForList[], uuid: string):ScheduleForList => {

    let found = new ScheduleForList("undefined", 0, "-1");
    schedules.forEach((e) => {
        if (e.uuid === uuid) found = e;
    });

    return found;
}

export const capitalizeString = (
    str : string,
    locale = navigator.language
) => {
    const [firstLetter, ...rest] = str;
    return firstLetter.toLocaleUpperCase(locale) + rest.join('')
}
