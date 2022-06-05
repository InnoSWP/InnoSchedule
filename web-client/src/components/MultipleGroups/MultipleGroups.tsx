import React from "react";
import styles from "./MultipleGroups.module.scss";
import { IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useMultipleGroupsLogic } from "./MultipleGroups.logic";

export interface MultipleGroupsProps {
    id: string;
    label: string;
    placeholder: string;

    autoFocus?: boolean;
}

export const MultipleGroups:React.FunctionComponent<MultipleGroupsProps> = (props) => {

    const logic = useMultipleGroupsLogic(props);
    const [fields, addField] = logic.useMultipleGroups();

    return <div className={styles["MultipleGroups"]} id={"teachers"}>
        <Typography>{props.label}</Typography>
        { fields }
        <IconButton className={styles["button"]}
                    color="primary"
                    aria-label="add"
                    onClick={addField}>
            <AddIcon />
        </IconButton>
    </div>;
}