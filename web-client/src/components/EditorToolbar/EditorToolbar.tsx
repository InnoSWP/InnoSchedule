import React from "react";
import styles from "./EditorToolbar.module.scss";
import { Button, ButtonGroup, Divider } from "@mui/material";
import { RangeSelector } from "../RangeSelector";
import { RangeSelectorInterval } from "../RangeSelector/RangeSelectorInterval";

export interface EditorToolbarProps {

}

export const EditorToolbar:React.FunctionComponent<EditorToolbarProps> = () => {

    return <div className={styles["EditorToolbar"]}>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>Core courses</Button>
            <Button>Electives</Button>
        </ButtonGroup>

        <Divider variant="middle" orientation="vertical" flexItem />

        <RangeSelector type={"time"}
                       onChange={(e: RangeSelectorInterval) => {
                           console.log(e);
                       }}>
            {/*<AccessTimeIcon />*/}
        </RangeSelector>

        <Divider variant="middle" orientation="vertical" flexItem />

        <RangeSelector type={"date"}
                       onChange={(e: RangeSelectorInterval) => {
                           console.log(e);
                       }}>
            {/*<DateRangeIcon />*/}
        </RangeSelector>

        <Divider variant="middle" orientation="vertical" flexItem />

        <div className={styles["group"]}>
            <Button variant={"outlined"}>Save</Button>
            <Button variant={"contained"}>Publish</Button>
        </div>
    </div>
}