import React, { useState } from 'react';
import { Weekday } from "models/Weekday";
import { Timetable } from "components/Timetable/Timetable";
import { capitalizeString, createInterval, createTimeslot } from "utilities/Utilties";
import { Timeslot } from "models/Timeslot";

interface DevTimetableProps {
    onTimeslotClick: () => void;
}

export const DevTimetable:React.FunctionComponent<DevTimetableProps> = (props) => {

    const workingHours = createInterval("09:00", "17:00");

    const [timeslots, setTimeslots] = useState(new Map<unknown, Timeslot[]>()
        .set(Weekday.MONDAY, [
            createTimeslot("MON", "09:00", "11:00"),
            createTimeslot("MON2", "13:00", "14:30"),
        ])
        .set(Weekday.TUESDAY, [])
        .set(Weekday.WEDNESDAY, [
            createTimeslot("WED", "11:00", "12:30"),
        ])
        .set(Weekday.THURSDAY, [])
        .set(Weekday.FRIDAY, [])
        .set(Weekday.SATURDAY, [])
        .set(Weekday.SUNDAY, [])
    );

    const weekdayToString = (obj : Weekday) => capitalizeString(Weekday[obj].toLowerCase());

    return (
        <Timetable
            columnObjectToString={weekdayToString}
            timeslots={timeslots}
            workingHours={workingHours}
            onTimeslotClick={() => console.log("bruh")}
            onTimeslotMove={setTimeslots}
        />
    );
}

export default DevTimetable;
