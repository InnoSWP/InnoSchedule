import { map, roundTimeToFiveMinutes } from "utilities/Utilties";
import { DateTime } from "luxon";

test('map utility', () => {
    const mapResult = map(0.5, 0, 1, 0, 100);

    expect(mapResult).toBe(50);
});

test('roundTimeToFiveMinutes utility', () => {
    const timeToRound = DateTime.fromObject({ hour: 9, minute: 59});

    const roundedTime = roundTimeToFiveMinutes(timeToRound);

    expect(roundedTime).toEqual(DateTime.fromObject({hour : 10}));
});

