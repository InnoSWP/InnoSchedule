export const a = 7;

// import React from "react";
// import styles from "./ResourcesStorage.module.scss";
// import { DataGrid } from '@mui/x-data-grid';
//
// import { useSetHeader } from "../Layout";
// import { useResourcesStorageLogic } from "./ResourcesStorage.logic";
// import { SchedulesList } from "components/SchedulesList";
// import { FieldDialog } from "components/FieldDialog";
// import { ConfirmationDialog } from "../../components/ConfirmationDialog";
//
// export const ResourcesStorage:React.FunctionComponent = () => {
//
//     const logic = useResourcesStorageLogic();
//     useSetHeader("Storage");
//
//     const [
//         isCreateNewOpen,
//         handleCreateNew,
//         handleCreateNewClose,
//         handleCreateNewSubmit
//     ] = logic.useAddScheduleDialog();
//     const [
//         isRemoveOpen,
//         handleRemoveOpen,
//         handleRemoveClose,
//         handleRemoveConfirm
//     ] = logic.useRemoveScheduleDialog();
//
//     return <div className={styles["ResourcesStorage"]}>
//         <SchedulesList
//             createNew={handleCreateNew}
//             removeItems={handleRemoveOpen} />
//         <FieldDialog
//
//             label={"Add Course"}
//             text={"Create a new course file"}
//             fieldLabel={"File name"}
//             confirmButtonText={"Create"}
//             declineButtonText={"Cancel"}
//
//             open={isCreateNewOpen}
//             handleClose={handleCreateNewClose}
//             handleSubmit={handleCreateNewSubmit}/>
//         <ConfirmationDialog
//
//             label={"Do you want to remove items?"}
//             text={"This action can't be undone"}
//             confirmButtonText={"Yes"}
//             declineButtonText={"No"}
//
//             open={isRemoveOpen}
//             handleClose={handleRemoveClose}
//             handleSubmit={handleRemoveConfirm}/>
//
//         <DataGrid />
//     </div>;
// }