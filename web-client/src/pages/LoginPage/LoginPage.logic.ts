import {
    ChangeEvent,
    useState
} from "react";
import {isPlainObject} from "@reduxjs/toolkit";

export const useLoginPageLogic = () => {
    return {
        useLoginForm: ():[
            login: string,
            password: string,
            isPasswordShown: boolean,
            onLoginChange: (event: ChangeEvent<HTMLInputElement>) => void,
            onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void,
            onShowPasswordButtonClick: () => void
        ] => {
            const [login, setLogin] = useState<string>("");
            const [password, setPassword] = useState<string>("");
            const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

            const onLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
                setLogin(event.target.value);
            }

            const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value)
            }

            const onShowPasswordButtonClick = () => {
                setIsPasswordShown((state) => !state);
            }

            return [
                login,
                password,
                isPasswordShown,
                onLoginChange,
                onPasswordChange,
                onShowPasswordButtonClick
            ];
        }
    }
}