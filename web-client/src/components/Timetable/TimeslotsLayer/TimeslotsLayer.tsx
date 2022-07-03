import React, { useState } from "react";
import { useTimeslotsLayerLogic } from "./TimeslotsLayer.logic";
import styles from "./TimeslotsLayer.module.scss";
import { DraggableTimeslot } from "components/Timetable/TimeslotsLayer/DraggableTimeslot";
import { TimetableDimensions } from "components/Timetable/Timetable.logic";
import { DateTime, Interval } from "luxon";
import { Timeslot } from "models/Timeslot";
import { callbackify } from "util";

export interface TimeslotLayerDrilledProps {
    onTimeslotClick : (timeslot : Timeslot) => void,
    onTimeslotMove  : (newState : Map<unknown, Timeslot[]>) => void,
    timeslots : Map<unknown, Timeslot[]>,
}

export interface TimeslotsLayerProps extends TimeslotLayerDrilledProps {
    timetableDimensions : TimetableDimensions,
    timetableInterval : Interval,
}

export const TimeslotsLayer: React.FC<TimeslotsLayerProps> = (props) => {
    const logic = useTimeslotsLayerLogic(props);

    return (
        <div className={styles["timeslots"]}>
            { renderAllTimeslots(props) }
        </div>
    );
}

function renderAllTimeslots(props : TimeslotsLayerProps) {
    let columnObjects = Array.from(props.timeslots.keys());

    return columnObjects.map((key, index) =>
        renderTimeslotsForColumn(props, key, index)
    )
}

function renderTimeslotsForColumn(props : TimeslotsLayerProps, key : unknown, columnIndex : number) {
    const timeslots = props.timeslots.get(key);

    if(!timeslots) return <></>

    return timeslots.map((timeslot, timeslotIndex) =>
        renderSingleTimeslot(props, timeslot, columnIndex, timeslotIndex)
    )
}

function renderSingleTimeslot(
    props : TimeslotsLayerProps,
    timeslot : Timeslot,
    columnIndex : number,
    timeslotIndex : number
) {
    const columnsAmount = props.timeslots.size;
    const uniqueKey = columnIndex*columnsAmount + timeslotIndex;

    return <DraggableTimeslot
        key={uniqueKey}
        onClick={() => props.onTimeslotClick(timeslot)}
        discipline={timeslot.name}
        timeInterval={timeslot.interval}
        timetableDimensions={props.timetableDimensions}
        timetableInterval={props.timetableInterval}
        columnIndex={columnIndex}
        onDragReleaseCallback={(newInterval, newColumnIndex) => {
            onDragReleaseCallback(props, timeslot, newInterval, newColumnIndex);
        }
        }
    />
}

function onDragReleaseCallback(
    props : TimeslotsLayerProps,
    oldTimeslot : Timeslot,
    newInterval : Interval,
    newColumnIndex : number
) {
    const clonedTimeslotsMap = new Map(props.timeslots);
    const newTimeslot = {
        name: oldTimeslot.name,
        interval : newInterval,
    }

    Array.from(clonedTimeslotsMap.keys()).forEach((key, index) => {
        const timeslots = clonedTimeslotsMap.get(key);

        if(!timeslots) return;

        clonedTimeslotsMap.set(key, timeslots.filter((val) => {
            return val !== oldTimeslot;
        }));

        if(index === newColumnIndex) {
            timeslots.push(newTimeslot);
            clonedTimeslotsMap.set(key, timeslots);
        }
    });

    props.onTimeslotMove(clonedTimeslotsMap);
}
