import { map, roundTimeToFiveMinutes } from "utilities/Utilties";
import { DateTime } from "luxon";

test('map utility', () => {
    let mapResult = map(0.5, 0, 1, 0, 100);

    expect(mapResult).toBe(50);
});

test('roundTimeToFiveMinutes utility', () => {
    let timeToRound = DateTime.fromObject({ hour: 9, minute: 59});

    let roundedTime = roundTimeToFiveMinutes(timeToRound);

    expect(roundedTime).toEqual(DateTime.fromObject({hour : 10}));
});

