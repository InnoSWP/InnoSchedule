import React from "react";
import styles from "./ScheduleStorage.module.scss";

import { useSetHeader } from "../Layout";
import { useScheduleStorageLogic } from "./ScheduleStorage.logic";
import { DataTable } from "components/DataTable";
import { FieldDialog } from "components/FieldDialog";
import { ConfirmationDialog } from "components/ConfirmationDialog";
import { useAppSelector } from "store";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const ScheduleStorage:React.FunctionComponent = () => {

    const logic = useScheduleStorageLogic();
    useSetHeader("Storage");

    const [
        isCreateNewOpen,
        handleCreateNew,
        handleCreateNewClose,
        handleCreateNewSubmit
    ] = logic.useAddScheduleDialog();
    const [
        isRemoveOpen,
        handleRemoveOpen,
        handleRemoveClose,
        handleRemoveConfirm
    ] = logic.useRemoveScheduleDialog();

    const rows = useAppSelector((state) => state.schedules.list);
    const columns = [
        {
            id: "uuid",
            disablePadding: false,
            numeric: false,
            hidden: true,
            label: "File Name",
            type: "text"
        },
        {
            id: "name",
            disablePadding: false,
            numeric: false,
            label: "File Name",
            type: "text"
        }
        // {
        //     id: "published",
        //     disablePadding: false,
        //     numeric: false,
        //     label: "Published",
        //     type: "boolean"
        // }
    ];

    return <div className={styles["ScheduleStorage"]}>
        <DataTable
            label={"Schedules"}
            createNew={handleCreateNew}
            removeItems={handleRemoveOpen}
            rows={rows}
            headCells={columns}
            rowClickable />

        <FieldDialog

            label={"Add Course"}
            text={"Create a new course file"}
            fieldLabel={"File name"}
            confirmButtonText={"Create"}
            declineButtonText={"Cancel"}

            open={isCreateNewOpen}
            handleClose={handleCreateNewClose}
            handleSubmit={handleCreateNewSubmit} />

        <ConfirmationDialog

            label={"Do you want to remove items?"}
            text={"This action can't be undone"}
            confirmButtonText={"Yes"}
            declineButtonText={"No"}

            open={isRemoveOpen}
            handleClose={handleRemoveClose}
            handleSubmit={handleRemoveConfirm} />

        <Link to={"/resources"}><Button>Resources</Button></Link>
    </div>;
}