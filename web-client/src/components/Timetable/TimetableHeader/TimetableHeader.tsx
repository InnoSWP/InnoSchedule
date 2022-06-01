import React from "react";
import { useTimetableHeaderLogic } from "./TimetableHeader.logic";
import { TimetableProps } from "components/Timetable/Timetable";
import { ColumnObjectWrapper } from "components/Timetable/ColumnObjectWrappers/ColumnObjectWrapper";

export interface TimetableHeaderProps extends TimetableProps {

}

export const TimetableHeader: React.FunctionComponent<TimetableHeaderProps> = (props) => {
    const logic = useTimetableHeaderLogic(props);

    return <thead>
        <tr>
            { props.columnObjects.map(getHeaderCell) }
        </tr>
    </thead>;
}

function getHeaderCell(columnObject : ColumnObjectWrapper<any>, index : number) {
    return <td key={ index }> { columnObject.getString() } </td>
}