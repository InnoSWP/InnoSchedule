import { useState } from "react";
import { addResourceSchedule, removeResourceSchedule, useAppDispatch, useAppSelector} from "store";
import { ScheduleForList } from "models/ScheduleForList";

export const useScheduleStorageLogic = () => {

    const schedules = useAppSelector((state) => state.schedules.list);
    const dispatch = useAppDispatch();

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
                dispatch(addResourceSchedule({
                    index: schedules.length,
                    toAdd: new ScheduleForList(nameToAdd, 0)
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
                        if (selected.includes(element.name)) dispatch(removeResourceSchedule({
                            toRemove: element
                        }));
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