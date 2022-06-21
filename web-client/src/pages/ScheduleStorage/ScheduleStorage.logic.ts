import { useState } from "react";
import { useAppSelector } from "store";
import { useSchedules } from "../../hooks/useSchedules";

export const useScheduleStorageLogic = () => {

    const schedules = useAppSelector((state) => state.schedules.list);

    const [updateSchedules, addSchedule, removeSchedule] = useSchedules();

    return {
        useAddScheduleDialog: function (): [
            open: boolean,

            handleOpen: () => void,
            handleClose: () => void,
            submitForm: (name: string) => void
        ] {
            const [open, setOpen] = useState<boolean>(false);

            const handleOpen = () => {
                setOpen(true);
            }

            const handleClose = () => {
                setOpen(false);
            }

            const submitForm = (nameToAdd: string) => {
                addSchedule(nameToAdd);
                setOpen(false);
            }

            return [open, handleOpen, handleClose, submitForm];
        },
        useRemoveScheduleDialog(): [
            open: boolean,
            handleOpen: (selected: readonly string[], setSelected: (selected: readonly string[]) => void) => void,
            handleClose: () => void,
            handleRemove: () => void
        ] {
            const [open, setOpen] = useState<boolean>(false);
            const [handleRemove, setHandleRemove] = useState<()=>void>(() => {});

            const handleOpen = (selected: readonly string[], setSelected: (selected: readonly string[]) => void) => {
                setOpen(true);

                setHandleRemove(() => {return () => {
                    schedules.forEach((element) => {
                        if (selected.includes(element.name)) {
                            removeSchedule(element.uuid);
                        }
                    });
                    setSelected([]);
                }})
            }

            const handleClose = () => {
                setOpen(false);
            }

            return [open, handleOpen, handleClose, handleRemove];
        }
    }
}