import React from "react";
import styles from "./Layout.module.scss";
import { useLayoutLogic } from "./Layout.logic";
import { Link, Outlet } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";
import {useInit} from "../../hooks/useInit";

export const Layout:React.FunctionComponent = () => {

    const logic = useLayoutLogic();
    const [label, buttonLink, setLabel, setButtonLink] = logic.useHeader();

    useInit();

    return <div className={styles["Layout"]}>
        <header className={styles["header"]}>
            {
                buttonLink == "" ?
                    null
                    :
                    (<Link to={buttonLink}>
                        <IconButton className={styles["button"]}
                                    color="info"
                                    aria-label="add course">
                            <ArrowBackIcon />
                        </IconButton>
                    </Link>)
            }
            <h1>{label}</h1>
        </header>
        <main className={styles["main"]}>
            <Outlet context={{setLabel, setButtonLink}} />
        </main>
        <footer className={styles["footer"]}></footer>
    </div>;
}

