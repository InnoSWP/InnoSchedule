import { DateTime } from "luxon";
import { Teacher } from "models/Teacher";
import { ScheduleForList } from "models/ScheduleForList";

export const map = (val : number,
    in_min : number,
    in_max : number,

    out_min : number,
    out_max : number
) => {
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

export const roundTimeToFiveMinutes = (time : DateTime) => {
    const roundedTime = time.startOf("minute");

    const remainder = 5 - (time.minute % 5);

    return roundedTime.plus({ minutes : remainder });
};

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