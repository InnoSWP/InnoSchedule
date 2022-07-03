import { clampInterval, createTimeslot, map, roundTimeToFiveMinutes } from "utilities/Utilties";
import { DateTime, Interval } from "luxon";

test('map utility', () => {
    const mapResult = map(0.5, 0, 1, 0, 100);

    expect(mapResult).toBe(50);
});

test('roundTimeToFiveMinutes utility', () => {
    const timeToRound = DateTime.fromObject({ hour: 9, minute: 59});

    const roundedTime = roundTimeToFiveMinutes(timeToRound);

    expect(roundedTime).toEqual(DateTime.fromObject({hour : 10}));
});

test('clampInterval utility', () => {
    const interval = Interval.fromDateTimes(
        DateTime.fromObject({
            hour: 9,
        }),
        DateTime.fromObject({
            hour: 11,
        })
    );

    const limits = Interval.fromDateTimes(
        DateTime.fromObject({
            hour: 10,
        }),
        DateTime.fromObject({
            hour: 18,
        })
    );

    let clamped = clampInterval(interval, limits);

    expect(clamped).toEqual(Interval.fromDateTimes(
        DateTime.fromObject({
            hour: 10,
        }),
        DateTime.fromObject({
            hour: 12,
        })
    ));
})

test("createTimeslot utility", () => {
    const createdTimeslot = createTimeslot("Some name", "09:00", "21:00");

    const standardTimeslot = {
        name : "Some name",
        interval : Interval.fromDateTimes(
            DateTime.fromObject({
                hour: 9
            }),
            DateTime.fromObject({
                hour: 21
            })
        )
    }

    expect(createdTimeslot).toEqual(standardTimeslot);
})

