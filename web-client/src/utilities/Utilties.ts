import { DateTime } from "luxon";

export const map = (val : number,
    in_min : number,
    in_max : number,

    out_min : number,
    out_max : number
) => {
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

export const roundTimeToFiveMinutes = (time : DateTime) => {
    let roundedTime = time.startOf("minute");

    const remainder = 5 - (time.minute % 5);

    return roundedTime.plus({ minutes : remainder });
};