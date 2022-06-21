import { TimetableProps } from "components/Timetable/Timetable";
import { ForwardedRef, MutableRefObject, useMemo, useState } from "react";
import { Interval } from "luxon";

export type TimetableDimensions = {
    pivot : { x : number, y : number },

    columnWidth : number,
    columnsCount : number,

    rowHeight : number,
    rowsCount : number,
};

export const useTimeslotsDisplayLogic = (props: TimetableProps) => {
    let [dimensions, setDimensions] = useState<TimetableDimensions | undefined>(undefined);

    return {
        timetableDimensions : dimensions,
        calculateTimetableDimensions(ref: MutableRefObject<HTMLTableElement>) {
            let firstCell = this.getFirstTableCell(ref);
            let pivot = this.calculatePivotLocation(firstCell!);

            setDimensions({
                pivot,
                rowHeight: firstCell.offsetHeight,
                columnWidth: firstCell.offsetWidth,
                columnsCount: props.columnObjects.length,
                rowsCount: this.calculateRowsCount(),
            });
        },

        getFirstTableCell(ref: MutableRefObject<HTMLTableElement | null>): HTMLElement {
            return (ref.current
                    ?.children?.item(1)  // tbody      - 2nd child of the table
                    ?.children?.item(0)  // first row  - 1st child of the tbody
                    ?.children?.item(1)  // first cell - 2nd child of the row
            ) as HTMLElement;
        },

        calculatePivotLocation(cell: HTMLElement) {
            let boundingRect = cell.getBoundingClientRect();
            return {x: boundingRect.left, y: boundingRect.top};
        },

        calculateRowsCount() {
            let minutesInInterval = props.workingHours.length('minute');
            return Math.ceil(minutesInInterval / 30);
        },
    }
}