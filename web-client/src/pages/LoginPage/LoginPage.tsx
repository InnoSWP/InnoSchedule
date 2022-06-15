import React from "react";
import { useLoginPageLogic } from "./LoginPage.logic";

export const LoginPage:React.FunctionComponent = () => {

    const logic = useLoginPageLogic();

    return <p>Hello from login page</p>;
}