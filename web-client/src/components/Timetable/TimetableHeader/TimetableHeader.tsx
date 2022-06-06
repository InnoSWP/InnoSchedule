import React from "react";
import { useTimetableHeaderLogic } from "./TimetableHeader.logic";
import { TimetableProps } from "components/Timetable/Timetable";
import { ColumnObjectWrapper } from "components/Timetable/ColumnObjectWrappers/ColumnObjectWrapper";
import axisStyles from "../TimetableAxis.module.scss";
import styles from "components/Timetable/TimetableHeader/TimetableHeader.module.scss";

export interface TimetableHeaderProps extends TimetableProps {

}

export const TimetableHeader: React.FunctionComponent<TimetableHeaderProps> = (props) => {
    const logic = useTimetableHeaderLogic(props);

    return <thead>
        <tr>
            <th className={axisStyles.axisCell}></th>
            { props.columnObjects.map(getHeaderCell) }
        </tr>
    </thead>;
}

function getHeaderCell(columnObject : ColumnObjectWrapper<any>, index : number) {
    return <th
        key={ index }
        className={styles.timetableHeaderCell}
    >
        { columnObject.getString() }
    </th>
}