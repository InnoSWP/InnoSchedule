import React from "react";
import styles from "./Group.module.scss";
import { IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { MultipleFields } from "../../MultipleFields";
import {GroupData} from "../MultipleGroups";

interface GroupProps {
    id: string;
    placeholder: string;
    onRemove: (id: string) => void;
    autoFocus?: boolean;
    autofill?: GroupData;
}

export const Group:React.FunctionComponent<GroupProps> = (props) => {
    return <div className={styles["Group"]}>
        <TextField
            className={styles["first"]}
            autoFocus={props.autoFocus}
            margin="dense"
            id={props.id + "-input"}
            fullWidth
            variant="standard"
            placeholder={props.placeholder}
            defaultValue={props.autofill?.name}
        />
        <MultipleFields  id={props.id + "-teachers"}
                         placeholder={"Teacher"}
                         label={"Teachers"}
                         hideLabel={true}
                         autofill={props.autofill?.group} />
        <IconButton color="error"
                    className={styles["button"]}
                    aria-label="delete"
                    size="small"
                    onClick={() => {props.onRemove(props.id)}}>
            <DeleteIcon />
        </IconButton>

    </div>;
}