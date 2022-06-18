import { useState } from "react";
import { addSchedule, removeSchedule, useAppDispatch, useAppSelector } from "store";
import { createData } from "models/CoursesListData";


export const useScheduleStorageLogic = () => {

    const schedules = useAppSelector((state) => state.schedules.schedules);
    const dispatch = useAppDispatch();

    return {
        useAddScheduleDialog(): [
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
                dispatch(addSchedule({
                    scheduleId: schedules.length,
                    scheduleToAdd: createData(nameToAdd, schedules.length)
                }));

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
                        if (selected.includes(element.name)) dispatch(removeSchedule(element.name));
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