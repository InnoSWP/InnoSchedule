import React from "react";
import { useLoginPageLogic } from "./LoginPage.logic";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {IconButton, InputAdornment} from "@mui/material";

export const LoginPage:React.FunctionComponent = () => {

    const logic = useLoginPageLogic();
    const [
        login,
        password,
        isPasswordShown,
        onLoginChange,
        onPasswordChange,
        onShowPasswordButtonClick
    ] = logic.useLoginForm();



    return <Dialog open>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="login"
                label="Login"
                type="string"
                fullWidth
                variant="standard"
                onChange={onLoginChange}
                value={ login }
            />

            <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                type={ isPasswordShown ? "text" : "password" }
                fullWidth
                variant="standard"
                onChange={onPasswordChange}
                value={ password }

                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <IconButton
                            onClick={() => {onShowPasswordButtonClick()}}
                            aria-label="toggle password visibility"
                            onMouseDown={(event) => {
                                event.preventDefault();
                            }}
                        >
                            { isPasswordShown ? <VisibilityOff /> : <Visibility /> }
                        </IconButton>
                    </InputAdornment>,
                }}
            />
        </DialogContent>
        <DialogActions>
            <Button>Login</Button>
        </DialogActions>
    </Dialog>;
}