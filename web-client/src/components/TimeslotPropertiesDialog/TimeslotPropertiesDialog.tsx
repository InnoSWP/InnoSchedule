import React from "react";
import styles from "./TimeslotPropertiesDialog.module.scss";
import { useTimeslotPropertiesDialogLogic } from "./TimeslotPropertiesDialog.logic";
import { Box, Button, Checkbox, Drawer, FormControlLabel, TextField, Typography } from "@mui/material";
import { RangeSelector } from "components/RangeSelector";

export interface TimeslotPropertiesDialogProps {
    isOpen: boolean;

    onClose: () => void;
}

export const TimeslotPropertiesDialog:React.FunctionComponent<TimeslotPropertiesDialogProps> = (
    props
) => {

    const logic = useTimeslotPropertiesDialogLogic(props);

    const { isOpen, onClose } = props;

    return <div>
        <Drawer
            anchor={"right"}
            open={isOpen}
            onClose={onClose}
        >
            <Box className={styles["TimeslotPropertiesDialog"]} sx={{ "width": 350 }}>
                <div className={styles["toolbar"]}>
                    <Typography>
                        Properties
                    </Typography>
                    <Button variant="contained" className={styles["button"]} onClick={onClose}>
                        Save
                    </Button>
                </div>
                <div className={styles["content"]}>
                    <Typography><b>Physical Culture and Sport (Theoretical)</b></Typography>

                    <RangeSelector type={"time"}
                                   onChange={() => {}} />

                    <TextField label={"Activity"}
                               size={"small"}
                               variant={"standard"}
                               defaultValue={"Lecture"}/>
                    <TextField label={"Room"}
                               size={"small"}
                               variant={"standard"}
                               defaultValue={"301"} />
                    <TextField label={"Teacher"}
                               size={"small"}
                               variant={"standard"}
                               defaultValue={"Rabab Marouf"} />
                    <div className={styles["groups"]}>
                        <Typography>Groups:</Typography>
                        <div className={styles["groups-checkboxes"]}>
                            <FormControlLabel control={<Checkbox />} label="Group 1" />
                            <FormControlLabel control={<Checkbox />} label="Group 2" />
                            <FormControlLabel control={<Checkbox />} label="Group 3" />
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Group 4" />
                            <FormControlLabel control={<Checkbox />} label="Group 5" />
                            <FormControlLabel control={<Checkbox />} label="Group 6" />
                            <FormControlLabel control={<Checkbox />} label="Group 7" />
                        </div>
                    </div>

                </div>

            </Box>
        </Drawer>
    </div>

}