import React from "react";
import styles from "./RangeSelector.module.scss";
import { TextField } from "@mui/material";
import { useRangeSelectorLogic } from "./RangeSelector.logic";

export interface RangeSelectorProps {
    children: JSX.Element | string;
    type?: "time" | "date";
    width?: string;

    onChange: CallableFunction;
}

export const RangeSelector:React.FunctionComponent<RangeSelectorProps> = (props) => {

    const logic = useRangeSelectorLogic(props);

    return <div className={styles["RangeSelector"]}>

        {props.children}

        <TextField id="outlined-basic"
                   sx={{"width": props.width}}
                   type={props.type}
                   className={styles["working-hours-selector-field"]}
                   size={"medium"}
                   defaultValue="09:00"
                   variant="standard"
                   onChange={(event) => {
                       logic.onChangeCallback(event);
                   }}/>
        <span>-</span>
        <TextField id="outlined-basic"
                   sx={{
                       "width": props.width
                   }}
                   type={props.type}
                   className={styles["working-hours-selector-field"]}
                   size={"medium"}
                   defaultValue="19:00"
                   variant="standard"
                   onChange={(event) => {
                       logic.onChangeCallback(event);
                   }}/>
    </div>;
}