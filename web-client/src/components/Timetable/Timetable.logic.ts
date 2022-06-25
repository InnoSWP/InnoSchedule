import { TimetableProps } from "components/Timetable/Timetable";
import { MutableRefObject, useState } from "react";

export type TimetableDimensions = {
    relativePivot : { x : number, y : number },
    absolutePivot : { x : number, y : number },

    columnWidth : number,
    columnsCount : number,

    rowHeight : number,
    rowsCount : number,
};

export const useTimeslotsDisplayLogic = (props: TimetableProps) => {
    const [dimensions, setDimensions] = useState<TimetableDimensions | undefined>(undefined);

    return {
        timetableDimensions : dimensions,
        calculateTimetableDimensions(ref: MutableRefObject<HTMLTableElement>) {
            const firstCell = this.getFirstTableCell(ref);
            const relativePivot = this.calculateRelativePivot(firstCell!);
            const absolutePivot = this.calculateAbsolutePivot(firstCell!);

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
            const br = cell.getBoundingClientRect();
            return { x: br.x, y: br.y };
        },

        calculateRowsCount() {
            const minutesInInterval = props.workingHours.length('minute');
            return Math.ceil(minutesInInterval / 30);
        },
    }
}