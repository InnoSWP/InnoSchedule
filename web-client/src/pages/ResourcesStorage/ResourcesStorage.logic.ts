import { useState } from "react";
import { useTeachers } from "hooks/useTeachers";
import {useRooms} from "hooks/useRooms";
import { useActivities } from "hooks/useActivities";
import { useAppSelector } from "store";


export const useResourcesStorageLogic = () => {

    const [updateTeachers, addTeacher, removeTeacher] = useTeachers();
    const [updateRooms, addRoom, removeRoom] = useRooms();
    const [updateActivities, addActivity, removeActivity] = useActivities();

    const teachers = useAppSelector((state) => state.teachers.list);
    const rooms = useAppSelector((state) => state.rooms.list);
    const activities = useAppSelector((state) => state.activities.list);

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
                            addTeacher(nameToAdd);
                            setOpen(false);
                        }
                    case "rooms":
                        return (nameToAdd: string) => {
                            addRoom(nameToAdd);
                            setOpen(false);
                        }
                    case "activities":
                        return (nameToAdd: string) => {
                            addActivity(nameToAdd);
                            setOpen(false);
                        }
                }
            }

            return [open, dialogLabel, resourceName, getHandleOpen, handleClose, submitForm];
        },
        useRemoveDialog(): [
            open: boolean,
            getHandleOpen: (resourceName: "teachers" | "rooms" | "activities") =>
                (selected: readonly string[], setSelected: (selected: readonly string[]) => void)
                    => void,
            handleClose: () => void,
            handleRemove: () => void
        ] {
            const [open, setOpen] = useState<boolean>(false);
            const [handleRemove, setHandleRemove] = useState<()=>void>(() => {});

            const getHandleOpen = (resourceName: "teachers" | "rooms" | "activities") => {

                switch (resourceName) {
                    case "teachers":
                        return () => {
                            setOpen(true);
                            setHandleRemove(() => {
                                return (selected: readonly string[], setSelected: (selected: readonly string[]) => void) => {
                                    teachers.forEach((element) => {
                                        if (selected.includes(element.name)) removeTeacher(element.uuid);
                                    });
                                    setSelected([]);
                                }
                            })
                        }
                    case "activities":
                        return () => {
                            setOpen(true);
                            setHandleRemove(() => {
                                return (selected: readonly string[], setSelected: (selected: readonly string[]) => void) => {
                                    activities.forEach((element) => {
                                        if (selected.includes(element.name)) removeActivity(element.uuid);
                                    });
                                    setSelected([]);
                                }
                            })
                        }
                    case "rooms":
                        return () => {
                            setOpen(true);
                            setHandleRemove(() => {
                                return (selected: readonly string[], setSelected: (selected: readonly string[]) => void) => {
                                    rooms.forEach((element) => {
                                        if (selected.includes(element.name)) removeRoom(element.uuid);
                                    });
                                    setSelected([]);
                                }
                            })
                        }
                }
            }

            const handleClose = () => {
                setOpen(false);
            }

            return [open, getHandleOpen, handleClose, handleRemove];
        }
    }
}