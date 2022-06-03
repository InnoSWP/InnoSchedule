import "./App.css"

import React from 'react';
import { Timetable } from "components/Timetable";
import { DateTime, Interval } from "luxon";
import { Weekday } from "models/Weekday";
import { WeekDayColumnObjectWrapper } from "components/Timetable/ColumnObjectWrappers/WeekDayColumnObjectWrapper";


function App() {
  let workingHours = Interval.fromDateTimes(
      DateTime.fromObject({
        hour: 9,
      }),
      DateTime.fromObject({
        hour: 17,
      })
  );

  let columnObjectWrappers = Object.values(Weekday)
      .filter((weekdayOrString) => typeof weekdayOrString !== "string")
      .map((weekday) => {
        return new WeekDayColumnObjectWrapper(weekday as Weekday);
      });

  return (
    <Timetable workingHours={workingHours} columnObjects={columnObjectWrappers}/>
  );
}

export default App;
