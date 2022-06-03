import React from "react";
import { useLoginPageLogic } from "./LoginPage.logic";
import { useSetLabel } from "../Layout";

export const LoginPage:React.FunctionComponent = () => {

    const logic = useLoginPageLogic();

    useSetLabel("Hello");

    return <p>Hello from login page</p>;
}