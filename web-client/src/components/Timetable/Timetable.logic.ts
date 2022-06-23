import { TimetableProps } from "components/Timetable/Timetable";
import { ForwardedRef, MutableRefObject, useMemo, useState } from "react";
import { Interval } from "luxon";

export type TimetableDimensions = {
    relativePivot : { x : number, y : number },
    absolutePivot : { x : number, y : number },

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
            let relativePivot = this.calculateRelativePivot(firstCell!);
            let absolutePivot = this.calculateAbsolutePivot(firstCell!);

            setDimensions({
                relativePivot,
                absolutePivot,
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

        calculateRelativePivot(cell: HTMLElement) {
            return { x: cell.offsetLeft, y: cell.offsetTop };
        },

        calculateAbsolutePivot(cell: HTMLElement) {
            let br = cell.getBoundingClientRect();
            return { x: br.x, y: br.y };
        },

        calculateRowsCount() {
            let minutesInInterval = props.workingHours.length('minute');
            return Math.ceil(minutesInInterval / 30);
        },
    }
}