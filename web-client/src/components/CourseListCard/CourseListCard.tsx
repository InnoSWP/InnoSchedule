import React from "react";
import styles from "./CourseListCard.module.scss";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

interface CourseListCardProps {
    label: string;
    classes: number;
}

export const CourseListCard:React.FunctionComponent<CourseListCardProps> = (props) => {
    return <Card className={styles["CourseListCard"]} variant="outlined">
        <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
                <b>{props.label}</b>
            </Typography>

            <Typography sx={{ fontSize: 14 }} gutterBottom>
                <b>Classes:</b> {props.classes} total
            </Typography>
        </CardContent>
        <CardActions>
            <Button>Edit</Button>
        </CardActions>
    </Card>;
}