import React from "react";
import styles from "./Field.module.scss";
import {IconButton, MenuItem, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {FieldData} from "../MultipleFields";

interface FieldProps {
    id: string;
    placeholder: string;
    onRemove: (id: string) => void;
    type: "text" | "select";

    autoFocus?: boolean;
    autofill?: FieldData;
    variants?: Array<string>;
}

export const    Field:React.FunctionComponent<FieldProps> = (props) => {
    return <div className={styles["Field"]}>
        <TextField
            autoFocus={props.autoFocus}
            margin="dense"
            select={props.type === "select"}
            id={props.type === "select" ? undefined : props.id}
            inputProps={{
                id: props.type === "select" ? props.id : undefined
            }}
            fullWidth
            variant="standard"
            placeholder={props.placeholder}
            defaultValue={props.autofill?.name}
        >
            {props.variants?.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
       <IconButton color="primary"
                   aria-label="delete"
                   size="small"
                   onClick={() => {props.onRemove(props.id)}}>
            <DeleteIcon />
        </IconButton>

    </div>;
}