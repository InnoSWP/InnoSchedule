import React from "react";
import { useTimetableRowLogic } from "components/Timetable/TimetableRow/TimetableRow.logic";
import { Interval } from "luxon";
import { TimetableProps } from "components/Timetable/Timetable";
import { ColumnObjectWrapper } from "components/Timetable/ColumnObjectWrappers/ColumnObjectWrapper";

export interface TimetableRowProps extends TimetableProps {
    interval : Interval,
}

export const TimetableRow: React.FunctionComponent<TimetableRowProps> = (props) => {
    const logic = useTimetableRowLogic(props);

    return (
        <tr>
            { props.columnObjects.map(getRowCell) }
        </tr>
    );
}

function getRowCell(object : ColumnObjectWrapper<any>, index : number) {
    return <td key={index}></td>
}