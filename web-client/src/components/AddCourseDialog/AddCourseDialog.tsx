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
import { MultipleFields } from "../MultipleFields";

export interface AddCourseDialogProps {
    open: boolean;
    onClose: () => void;
    courseId: number;
}

export const AddCourseDialog:React.FunctionComponent<AddCourseDialogProps> = (props) => {

    const logic = useAddCourseDialogLogic(props);
    const [isDivision, setDivision] = useState<boolean>(false);
    const autofill = logic.useAutofill();

    setDivision(autofill.isDivision);

    /*
     TODO Autofill for MultipleGroups and MultipleFields
     TODO Add CourseAutofillData interface
     */
    return <Dialog open={props.open} onClose={props.onClose} scroll={"paper"} fullWidth>
        <DialogTitle>Add Course</DialogTitle>
        <DialogContent className={styles["AddCourseDialog"]}>
            <form id={"put-course"} onSubmit={logic.useForm()}>
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
                            defaultValue={autofill.name}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="acronym"
                            label="Acronym"
                            fullWidth
                            variant="standard"
                            defaultValue={autofill.acronym}
                        />
                    </div>

                    <div className={styles["teachers"]}>
                        <FormControlLabel control={<Switch checked={isDivision}
                                                           onClick={() => {
                                                               setDivision((isDivision) => !isDivision);
                                                           }} />}
                                          label="Division" />

                        { isDivision ?
                            <MultipleGroups id={"group"}
                                            label={"Groups"}
                                            placeholder={"Group"}
                                            autoFocus />
                            :
                            <MultipleFields id={"teacher"}
                                            label={"Teachers"}
                                            placeholder={"Teacher"}
                                            autoFocus /> }
                    </div>
                </FormGroup>
            </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button type={"submit"} form={"put-course"} onClick={props.onClose}>Add</Button>
        </DialogActions>
    </Dialog>;
}