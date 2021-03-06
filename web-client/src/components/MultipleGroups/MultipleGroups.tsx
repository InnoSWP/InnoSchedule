import React from "react";
import styles from "./MultipleGroups.module.scss";
import { IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useMultipleGroupsLogic } from "./MultipleGroups.logic";
import { FieldData } from "../MultipleFields";

export interface MultipleGroupsProps {
    id: string;
    label: string;
    placeholder: string;
    type: "text" | "select";

    autoFocus?: boolean;
    autofill?: Array<GroupData>;
    variants?: Array<string>;
}

export interface GroupData {
    name: string;
    group: Array<FieldData>
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