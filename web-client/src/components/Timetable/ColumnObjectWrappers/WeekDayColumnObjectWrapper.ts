import { ColumnObjectWrapper } from "./ColumnObjectWrapper";
import { Weekday } from "models/Weekday"

export class WeekDayColumnObjectWrapper extends ColumnObjectWrapper<Weekday>{
    public constructor(weekday : Weekday) {
        super(weekday);
    }

    getString(): string {
        return Weekday[super.getValue()];
    }
}