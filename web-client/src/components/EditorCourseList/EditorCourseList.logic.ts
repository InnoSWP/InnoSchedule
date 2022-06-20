import { EditorCourseListProps } from "./EditorCourseList";
import { useState } from "react";

interface DialogState {
    isDialogOpened: boolean;
    classId: number;
}

export const useEditorCourseListLogic = (props: EditorCourseListProps) => {
    return {
        useDialog: ():[DialogState, (id: number) => void, ()=> void] => {
            const [dialogState, setDialogState] = useState<DialogState>({
                isDialogOpened: false,
                classId: 0
            });

            const handleOpen = (id: number) => {
                setDialogState({
                    isDialogOpened: true,
                    classId: id
                });
            }
            const handleClose = () => {
                setDialogState({
                    isDialogOpened: false,
                    classId: 0
                });
            }

            return [dialogState, handleOpen, handleClose];
        }
    }
}