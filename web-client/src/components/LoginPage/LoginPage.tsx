import React from "react";
import { useLoginPageLogic } from "./LoginPage.logic";
import { useSetLabel } from "../Layout";

export const LoginPage:React.FunctionComponent = () => {

    const logic = useLoginPageLogic();
    const setLabel = useSetLabel();

    setLabel("Login");

    return <p>Hello from login page</p>;
}