import React, { useState } from "react";
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
import { useAddCourseDialogLogic } from "./AddCourseDialog.logic";
import {MultipleFields} from "../MultipleFields";

interface AddCourseDialogProps {
    open: boolean;
    onClose: () => void;
}

export const AddCourseDialog:React.FunctionComponent<AddCourseDialogProps> = (props) => {

    const logic = useAddCourseDialogLogic();
    const [isDivision, setDivision] = useState<boolean>(false);

    return <Dialog open={props.open} onClose={props.onClose} scroll={"paper"} fullWidth>
        <DialogTitle>Add Course</DialogTitle>
        <DialogContent className={styles["AddCourseDialog"]}>
            <form onSubmit={logic.useForm()}>
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
                        <FormControlLabel control={<Switch checked={isDivision}
                                                           onClick={() => {
                                                               setDivision((isDivision) => !isDivision);
                                                           }} />}
                                          label="Division" />

                        { isDivision ? <MultipleGroups id={"group"} label={"Groups"} placeholder={"Group"} autoFocus /> :
                            <MultipleFields id={"teacher"} label={"Teachers"} placeholder={"Teacher"} autoFocus /> }
                    </div>

                    <button type="submit">Submit</button>

                </FormGroup>
            </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button onClick={props.onClose}>Add</Button>
        </DialogActions>
    </Dialog>;
}