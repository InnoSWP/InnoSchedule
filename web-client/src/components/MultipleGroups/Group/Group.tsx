import React from "react";
import styles from "./Group.module.scss";
import { IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { MultipleFields } from "../../MultipleFields";

interface GroupProps {
    id: string;
    placeholder: string;
    onRemove: (id: string) => void;
    autoFocus?: boolean;
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
        />
        <MultipleFields  id={props.id + "-teachers"} placeholder={"Teacher"} label={"Teachers"} hideLabel={true} />
        <IconButton color="primary"
                    className={styles["button"]}
                   aria-label="delete"
                   size="small"
                   onClick={() => {props.onRemove(props.id)}}>
            <DeleteIcon />
        </IconButton>

    </div>;
}