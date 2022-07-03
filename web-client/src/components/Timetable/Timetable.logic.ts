import { TimetableCombinedProps } from "components/Timetable/Timetable";
import { MutableRefObject, useState } from "react";

export type TimetableDimensions = {
    absolutePivot : { x : number, y : number },
    relativePivot : { x : number, y : number },

    columnWidth : number,
    columnsCount : number,

    rowHeight : number,
    rowsCount : number,
};

export const useTimeslotsDisplayLogic = (props: TimetableCombinedProps) => {
    const [dimensions, setDimensions] = useState<TimetableDimensions | undefined>(undefined);

    return {
        timetableDimensions : dimensions,
        calculateTimetableDimensions(ref: MutableRefObject<HTMLTableElement>) {
            const firstCell = this.getFirstTableCell(ref);
            const relativePivot = this.calculateRelativePivotLocation(firstCell!);
            const absolutePivot = this.calculateAbsolutePivotLocation(firstCell!);

            setDimensions({
                absolutePivot,
                relativePivot,
                rowHeight: firstCell.offsetHeight,
                columnWidth: firstCell.offsetWidth,
                columnsCount: props.timeslots.size,
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

        calculateAbsolutePivotLocation(cell: HTMLElement) {
            let boundingRect = cell.getBoundingClientRect();
            let scrollLeftOffset = window.document.documentElement.scrollLeft;
            let scrollTopOffset  = window.document.documentElement.scrollTop;

            return {
                x: boundingRect.left + scrollLeftOffset,
                y: boundingRect.top + scrollTopOffset,
            };
        },

        calculateRelativePivotLocation(cell : HTMLElement) {
            return {
                x : cell.offsetLeft,
                y : cell.offsetTop,
            }
        },

        calculateRowsCount() {
            const minutesInInterval = props.workingHours.length('minute');
            return Math.ceil(minutesInInterval / 30);
        },
    }
}