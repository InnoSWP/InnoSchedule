import React from "react";
import styles from "./Field.module.scss";
import {IconButton, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface FieldProps {
    id: string;
    placeholder: string;
    onRemove: (id: string) => void;
    autoFocus?:boolean;
}

export const Field:React.FunctionComponent<FieldProps> = (props) => {
    return <div className={styles["Field"]}>
        <TextField
            autoFocus={props.autoFocus}
            margin="dense"
            id={props.id + "0"}
            fullWidth
            variant="standard"
            placeholder={props.placeholder}
        />
       <IconButton color="primary"
                   aria-label="delete"
                   size="small"
                   onClick={() => {props.onRemove(props.id)}}>
            <DeleteIcon />
        </IconButton>

    </div>;
}