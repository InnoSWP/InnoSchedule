import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFieldDialogLogic } from "./FieldDialog.logic";

export interface FieldDialogProps {

    label: string,
    text: string,
    fieldLabel: string,
    confirmButtonText: string;
    declineButtonText: string;

    open: boolean;
    handleClose: () => void;
    handleSubmit: (value: string) => void;
}

export const FieldDialog: React.FunctionComponent<FieldDialogProps> = (props) => {

    const {
        label,
        text,
        fieldLabel,
        confirmButtonText,
        declineButtonText,
        open
    } = props;
    const logic = useFieldDialogLogic(props);

    const [name, onChange, handleClose, handleSubmit] = logic.useForm();

    return (
        <Dialog open={open}>
            <DialogTitle>{ label }</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    { text }
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={ fieldLabel }
                    type="string"
                    fullWidth
                    variant="standard"

                    onChange={onChange}
                    value={ name }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={ handleClose }>{ declineButtonText }</Button>
                <Button onClick={ handleSubmit }>{ confirmButtonText }</Button>
            </DialogActions>
        </Dialog>
    );
}