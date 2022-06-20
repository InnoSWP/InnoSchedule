/*
    Implementors of this interface should wrap objects
    to be used as Timetable column headers
*/
export abstract class ColumnObjectWrapper<T> {
    protected constructor(public value : T) { }

    public getValue() : T {
        return this.value;
    }
    // String representation of the object to be used as column header
    abstract getString() : string;
}