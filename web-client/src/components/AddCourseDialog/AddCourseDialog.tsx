import React from "react";
import styles from "./AddCourseDialog.module.scss";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Switch,
    TextField
} from "@mui/material";
import { MultipleGroups } from "../MultipleGroups";

interface AddCourseDialogProps {
    open: boolean;
    onClose: () => void;
}

export const AddCourseDialog:React.FunctionComponent<AddCourseDialogProps> = (props) => {

    return <Dialog open={props.open} onClose={props.onClose} scroll={"paper"}>
        <DialogTitle>Add Course</DialogTitle>
        <DialogContent className={styles["AddCourseDialog"]}>
            <FormGroup>
                <div className={styles["name-acronym-container"]}>
                    <TextField
                        className={styles["name"]}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Course name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="acronym"
                        label="Acronym"
                        fullWidth
                        variant="standard"
                    />
                </div>

                <div className={styles["teachers"]}>
                    <FormControlLabel control={<Switch />} label="Division" />
                    {/*{<MultipleFields id={"teacher"} label={"Teachers"} placeholder={"Teacher"} autoFocus />}*/}
                    {<MultipleGroups id={"group"} label={"Groups"} placeholder={"Group"} autoFocus />}
                </div>

            </FormGroup>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button onClick={props.onClose}>Add</Button>
        </DialogActions>
    </Dialog>;
}