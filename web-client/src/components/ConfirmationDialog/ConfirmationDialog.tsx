import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRemoveScheduleDialogLogic } from "./ConfirmationDialog.logic";

export interface AddScheduleDialogProps {

    label: string;
    text: string;
    confirmButtonText: string;
    declineButtonText: string;

    open: boolean;
    handleClose: () => void;
    handleSubmit: () => void;
}

export const ConfirmationDialog: React.FunctionComponent<AddScheduleDialogProps> = (props) => {

    const { open, handleClose, handleSubmit } = props;
    const logic = useRemoveScheduleDialogLogic(props);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {props.label}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{props.declineButtonText}</Button>
                <Button onClick={() => {
                    handleSubmit();
                    handleClose();
                }} autoFocus>
                    {props.confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>

    );
}