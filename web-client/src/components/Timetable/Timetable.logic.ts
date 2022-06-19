import { TimetableProps } from "components/Timetable/Timetable";
import { ForwardedRef, MutableRefObject, useMemo, useState } from "react";

export type CoordinatePoint = { x : number, y : number }
export type TimetableDimensions = {
    pivot : CoordinatePoint,
    halfHourLength : number,
    columnWidth : number,
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
                halfHourLength: firstCell.offsetHeight,
                columnWidth: firstCell.offsetWidth,
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
            return {x: cell.offsetLeft, y: cell.offsetTop};
        },
    }
}