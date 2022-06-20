import { useState } from "react";
import {
    addResourceActivity,
    addResourceRoom,
    addResourceTeacher,
    useAppDispatch,
    useAppSelector
} from "store";
import { Room } from "models/Room";
import { Teacher } from "models/Teacher";
import { Activity } from "models/Activity";


export const useResourcesStorageLogic = () => {

    const schedules = useAppSelector((state) => state.schedules.list);
    const dispatch = useAppDispatch();

    return {
        useAddDialog: function (): [
            open: boolean,
            dialogLabel: string,
            resourceName: "teachers" | "rooms" | "activities",

            getHandleOpen: (resourceName: "teachers" | "rooms" | "activities") => () => void,
            handleClose: () => void,
            getSubmitForm: (resourceName: "teachers" | "rooms" | "activities") => (nameToAdd: string) => void
        ] {
            const [open, setOpen] = useState<boolean>(false);
            const [dialogLabel, setDialogLabel] = useState<string>("");
            const [resourceName, setResourceName] = useState<"teachers" | "rooms" | "activities">("teachers");

            const getHandleOpen = (resourceName: "teachers" | "rooms" | "activities") => {

                switch (resourceName) {
                    case "teachers":
                        return () => {
                            setResourceName(resourceName);
                            setDialogLabel("Add Teacher");
                            setOpen(true);
                        }
                    case "rooms":
                        return () => {
                            setResourceName(resourceName);
                            setDialogLabel("Add Room");
                            setOpen(true);
                        }
                    case "activities":
                        return () => {
                            setResourceName(resourceName);
                            setDialogLabel("Add Activity");
                            setOpen(true);
                        }
                }
            }

            const handleClose = () => {
                setOpen(false);
            }

            const submitForm = (resourceName: "teachers" | "rooms" | "activities") => {

                switch (resourceName) {
                    case "teachers":
                        return (nameToAdd: string) => {
                            dispatch(addResourceTeacher({
                                toAdd: new Teacher(nameToAdd)
                            }));
                            setOpen(false);
                        }
                    case "rooms":
                        return (nameToAdd: string) => {
                            dispatch(addResourceRoom({
                                toAdd: new Room(nameToAdd)
                            }));
                            setOpen(false);
                        }
                    case "activities":
                        return (nameToAdd: string) => {
                            dispatch(addResourceActivity({
                                toAdd: new Activity(nameToAdd)
                            }));
                            setOpen(false);
                        }
                }
            }

            return [open, dialogLabel, resourceName, getHandleOpen, handleClose, submitForm];
        },
        useRemoveDialog(): [
            open: boolean,
            handleOpen: (selected: readonly string[], setSelected: (selected: readonly string[]) => void) => void,
            handleClose: () => void,
            handleRemove: () => void
        ] {
            const [open, setOpen] = useState<boolean>(false);
            const [handleRemove, setHandleRemove] = useState<()=>void>(() => {});

            const handleOpen = (selected: readonly string[], setSelected: (selected: readonly string[]) => void) => {
                setOpen(true);

                // setHandleRemove(() => {return () => {
                //     schedules.forEach((element) => {
                //         if (selected.includes(element.name)) dispatch(removeResourceSchedule(element));
                //     });
                //     setSelected([]);
                // }})
            }

            const handleClose = () => {
                setOpen(false);
            }

            return [open, handleOpen, handleClose, handleRemove];
        }
    }
}