import { RangeSelectorProps } from "./RangeSelector"
import { ChangeEvent } from "react";
import { RangeSelectorInterval } from "./RangeSelectorInterval";

export const useRangeSelectorLogic = (props: RangeSelectorProps) => {
    return {
        onChangeCallback: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

            const textFields = event.
                target.
                parentElement?.
                parentElement?.
                parentElement?.
                getElementsByClassName(
                    "MuiInput-input MuiInputBase-input css-1x51dt5-MuiInputBase-input-MuiInput-input"
                ) as HTMLCollectionOf<HTMLInputElement>;



            let valueFrom = "";
            let valueTo = "";
            if (textFields) {
                valueFrom = textFields[0].value;
                valueTo = textFields[1].value;
            }

            props.onChange(new RangeSelectorInterval(valueFrom, valueTo), event);
        }
    }
}