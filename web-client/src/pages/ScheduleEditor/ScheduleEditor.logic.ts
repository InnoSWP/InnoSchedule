import { useState } from "react";

export const useScheduleEditorLogic = () => {
    return {
        usePropertiesDialog: ():[
            isOpen: boolean,
            handleOpen: () => void,
            handleSubmit: () => void,
            handleClose: () => void
        ] => {

            const [isOpen, setIsOpen] = useState<boolean>(false);

            const handleOpen = () => {
                setIsOpen(true);
            }

            const handleClose = () => {
                setIsOpen(false);
            }

            const handleSubmit = () => {

            }

            return [
                isOpen,
                handleOpen,
                handleSubmit,
                handleClose
            ]
        }
    }
}