import { IconButton, Typography } from "@mui/material";
import React from "react";
import styles from "./EditorCourseList.module.scss"
import AddIcon from '@mui/icons-material/Add';
import { CourseListCard } from "../CourseListCard";
import { useEditorCourseListLogic } from "./EditorCourseList.logic";
import { AddCourseDialog } from "../AddCourseDialog";

export interface EditorCourseListProps {

}

export const EditorCourseList:React.FunctionComponent<EditorCourseListProps> = (props) => {

    const logic = useEditorCourseListLogic(props);
    const [isDialogOpened, openDialog, closeDialog] = logic.useDialog();


    return <div className={styles["EditorCourseList"]}>
        <div className={styles["toolbar"]}>
            <Typography>Courses</Typography>

            <IconButton className={styles["button"]}
                        color="primary"
                        aria-label="add course"
                        onClick={openDialog}>
                <AddIcon />
            </IconButton>
            <AddCourseDialog open={isDialogOpened} onClose={closeDialog} />
        </div>
        <div className={styles["courses"]}>
            <CourseListCard label={"Physical culture and sport"} classes={10} />
            <CourseListCard label={"Physical culture and sport"} classes={10} />
            <CourseListCard label={"Physical culture and sport"} classes={10} />
            <CourseListCard label={"Physical culture and sport"} classes={10} />
            <CourseListCard label={"Physical culture and sport"} classes={10} />
            <CourseListCard label={"Physical culture and sport"} classes={10} />
        </div>
    </div>
}


// export default function FormDialog() {
//     const [open, setOpen] = React.useState(false);
//
//     const handleClickOpen = () => {
//         setOpen(true);
//     };
//
//     const handleClose = () => {
//         setOpen(false);
//     };
//
//     return (
//         <div>
//             <Button variant="outlined" onClick={handleClickOpen}>
//                 Open form dialog
//             </Button>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>Subscribe</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         To subscribe to this website, please enter your email address here. We
//                         will send updates occasionally.
//                     </DialogContentText>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         id="name"
//                         label="Email Address"
//                         type="email"
//                         fullWidth
//                         variant="standard"
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                     <Button onClick={handleClose}>Subscribe</Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }