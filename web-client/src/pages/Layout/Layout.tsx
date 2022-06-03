import React from "react";
import styles from "./Layout.module.scss";
import { useLayoutLogic } from "./Layout.logic";
import { Outlet } from "react-router-dom";

export const Layout:React.FunctionComponent = () => {

    const logic = useLayoutLogic();

    const [label, setLabel] = logic.useLabel();

    return <div className={styles["Layout"]}>
        <header className={styles["header"]}>
            <h1>{label}</h1>
        </header>
        <main className={styles["main"]}>
            <Outlet context={setLabel} />
        </main>
        <footer className={styles["footer"]}></footer>
    </div>;
}

