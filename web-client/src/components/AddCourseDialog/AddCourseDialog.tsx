import React, {useEffect, useState} from "react";
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
import {GroupData, MultipleGroups} from "components/MultipleGroups";
import { useAddCourseDialogLogic } from "./AddCourseDialog.logic";
import { MultipleFields } from "components/MultipleFields";
import { useAppSelector } from "store";
import { Course } from "models/Course";

export interface AddCourseDialogProps {
    open: boolean;
    onClose: () => void;

    courses: Course[];
    courseUuid?: string;
    addCourse: (course: Course) => void;
}

export interface CourseData {
    name: string;
    acronym: string;
    isDivision: boolean;

    groups: Array<GroupData>;

}

export const AddCourseDialog:React.FunctionComponent<AddCourseDialogProps> = (props) => {

    const logic = useAddCourseDialogLogic(props);
    const autofill = logic.useAutofill();
    const [isDivision, setDivision] = useState<boolean>(false);

    useEffect(() => {
        if (autofill) setDivision(autofill.isDivision);
        else setDivision(false);
    }, [props]);

    const teachers = useAppSelector((state) => state.teachers.list).map((element) => element.name);

    return <Dialog open={props.open} scroll={"paper"} fullWidth> {/*onClose={props.onClose}*/}
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
                            defaultValue={autofill?.name}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="acronym"
                            label="Acronym"
                            fullWidth
                            variant="standard"
                            defaultValue={autofill?.acronym}
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
                                            type={"select"}
                                            variants={teachers}
                                            autoFocus
                                            autofill={autofill?.groups} />
                            :
                            <MultipleFields id={"teacher"}
                                            label={"Teachers"}
                                            placeholder={"Teacher"}
                                            type={"select"}
                                            variants={teachers}
                                            autoFocus
                                            autofill={autofill?.groups[0].group} /> }
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