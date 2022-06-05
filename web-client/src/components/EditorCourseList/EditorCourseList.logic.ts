import { EditorCourseListProps } from "./EditorCourseList";
import { useState } from "react";


export const useEditorCourseListLogic = (props: EditorCourseListProps) => {
    return {
        useDialog: ():[boolean, () => void, ()=> void] => {
            const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);

            const handleOpen = () => {
                setIsDialogOpened(true);
            }
            const handleClose = () => {
                setIsDialogOpened(false);
            }

            return [isDialogOpened, handleOpen, handleClose];
        }
    }
}