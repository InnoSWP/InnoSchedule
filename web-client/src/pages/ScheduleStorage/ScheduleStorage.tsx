import React from "react";
import styles from "./ScheduleStorage.module.scss";

import { useSetHeader } from "../Layout";
import { useScheduleStorageLogic } from "./ScheduleStorage.logic";
import { SchedulesList } from "components/SchedulesList";
import { FieldDialog } from "components/FieldDialog";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";

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

    return <div className={styles["ScheduleStorage"]}>
        <SchedulesList createNew={handleCreateNew} removeItems={handleRemoveOpen} />
        <FieldDialog

            label={"Add Course"}
            text={"Create a new course file"}
            fieldLabel={"File name"}
            confirmButtonText={"Create"}
            declineButtonText={"Cancel"}

            open={isCreateNewOpen}
            handleClose={handleCreateNewClose}
            handleSubmit={handleCreateNewSubmit}/>
        <ConfirmationDialog

            label={"Do you want to remove items?"}
            text={"This action can't be undone"}
            confirmButtonText={"Yes"}
            declineButtonText={"No"}

            open={isRemoveOpen}
            handleClose={handleRemoveClose}
            handleSubmit={handleRemoveConfirm}/>
    </div>;
}