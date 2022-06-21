import React from "react";
import styles from "./ResourcesStorage.module.scss";

import { useSetHeader } from "../Layout";
import { useResourcesStorageLogic } from "./ResourcesStorage.logic";
import { DataTable } from "components/DataTable";
import { FieldDialog } from "components/FieldDialog";
import { ConfirmationDialog } from "components/ConfirmationDialog";
import { useAppSelector } from "store";

export const ResourcesStorage:React.FunctionComponent = () => {

    const logic = useResourcesStorageLogic();
    useSetHeader("Resources", "/storage");

    const [
        isCreateNewOpen,
        dialogLabel,
        resourceName,
        getHandleCreateNew,
        handleCreateNewClose,
        getHandleCreateNewSubmit
    ] = logic.useAddDialog();
    const [
        isRemoveOpen,
        handleRemoveOpen,
        handleRemoveClose,
        handleRemoveConfirm
    ] = logic.useRemoveDialog();

    const teachersRows = useAppSelector((state) => state.teachers.list);
    const teachersColumns = [
        {
            id: "uuid",
            disablePadding: false,
            numeric: false,
            hidden: true,
            label: "UUID",
            type: "text"
        },
        {
            id: "name",
            disablePadding: false,
            numeric: false,
            label: "Teacher",
            type: "text"
        }
    ];

    const roomsRows = useAppSelector((state) => state.rooms.list);
    const roomsColumns = [
        {
            id: "uuid",
            disablePadding: false,
            numeric: false,
            hidden: true,
            label: "UUID",
            type: "text"
        },
        {
            id: "name",
            disablePadding: false,
            numeric: false,
            label: "Room",
            type: "text"
        }
    ]

    const activitiesRows = useAppSelector((state) => state.activities.list);
    const activitiesColumns = [
        {
            id: "uuid",
            disablePadding: false,
            numeric: false,
            hidden: true,
            label: "UUID",
            type: "text"
        },
        {
            id: "name",
            disablePadding: false,
            numeric: false,
            label: "Activity",
            type: "text"
        }
    ]

    return <div className={styles["ResourcesStorage"]}>
        <DataTable
            label={"Teachers"}
            createNew={ getHandleCreateNew("teachers") }
            removeItems={ handleRemoveOpen }
            rows={teachersRows}
            headCells={teachersColumns} />

        <DataTable
            label={"Rooms"}
            createNew={ getHandleCreateNew("rooms") }
            removeItems={ handleRemoveOpen }
            rows={roomsRows}
            headCells={roomsColumns} />

        <DataTable
            label={"Activities"}
            createNew={ getHandleCreateNew("activities") }
            removeItems={ handleRemoveOpen }
            rows={activitiesRows}
            headCells={activitiesColumns} />

        <FieldDialog

            label={ dialogLabel }
            text={"Add new resource"}
            fieldLabel={"Resource name"}
            confirmButtonText={"Create"}
            declineButtonText={"Cancel"}

            open={isCreateNewOpen}
            handleClose={handleCreateNewClose}
            handleSubmit={getHandleCreateNewSubmit(resourceName)} />
        <ConfirmationDialog

            label={"Do you want to remove items?"}
            text={"This action can't be undone"}
            confirmButtonText={"Yes"}
            declineButtonText={"No"}

            open={isRemoveOpen}
            handleClose={handleRemoveClose}
            handleSubmit={handleRemoveConfirm} />
    </div>;
}