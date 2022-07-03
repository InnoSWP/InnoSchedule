import React from "react";
import { useTimetableHeaderLogic } from "components/Timetable/TimetableGrid/TimetableHeader/TimetableHeader.logic";
import { TimetableGridProps } from "components/Timetable/TimetableGrid/TimetableGrid";
import axisStyles from "components/Timetable/TimetableGrid/TimetableAxis.module.scss";
import styles from "components/Timetable/TimetableGrid/TimetableHeader/TimetableHeader.module.scss";

export type TimetableHeaderProps = TimetableGridProps

export const TimetableHeader: React.FunctionComponent<TimetableHeaderProps> = (props) => {
    const logic = useTimetableHeaderLogic(props);

    const getHeaderCell = (columnObject : never, index : number) => {
        return <th
            key={ index }
            className={styles.timetableHeaderCell}
        >
            { props.columnObjectToString(columnObject) }
        </th>
    }

    return <thead>
        <tr>
            <th className={axisStyles.axisCell}></th>
            { props.columnObjects.map(getHeaderCell) }
        </tr>
    </thead>;
}