import React from "react";
import styles from "./ScheduleEditor.module.scss";

import { Button } from "evergreen-ui";

export const ScheduleEditor:React.FunctionComponent = () => {
    return <div className={styles["ScheduleEditor"]}>
        <div className={styles["toolbar"]}>
            <Button>Core courses</Button>
            <Button>Electives</Button>
        </div>
    </div>;
}