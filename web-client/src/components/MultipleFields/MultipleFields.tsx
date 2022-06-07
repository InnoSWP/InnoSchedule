import React from "react";
import styles from "./MultipleFields.module.scss";
import { IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useMultipleFieldsLogic } from "./MultipleFields.logic";


export interface MultipleFieldsProps {
    id: string;
    label: string;
    placeholder: string;

    autoFocus?: boolean;
    hideLabel?: boolean;
}

export const MultipleFields:React.FunctionComponent<MultipleFieldsProps> = (props) => {

    const logic = useMultipleFieldsLogic(props);
    const [fields, addField] = logic.useMultipleFields();

    return <div className={styles["MultipleFields"]} id={"teachers"}>
        { props.hideLabel ? <span></span> : <Typography>{props.label}</Typography> }
        { fields }
        <IconButton className={styles["button"]}
                    color="primary"
                    aria-label="add"
                    onClick={addField}>
            <AddIcon />
        </IconButton>
    </div>;
}