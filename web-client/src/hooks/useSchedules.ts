import { Teacher } from "models/Teacher";
import {updateResourceSchedule, useAppDispatch} from "store";
import { API_ENDPOINT_URL } from "./config";

interface ScheduleData {
    id: string;
    name: string;
}

export const useSchedules = ():[
    fetchSchedules: () => void,
    addSchedule: (name: string) => void,
    removeSchedule: (uuid: string) => void
] => {

    const dispatch = useAppDispatch();

    const fetchSchedules = () => {
        fetch(API_ENDPOINT_URL + "/api/v1/schedules/")
            .then((res) => res.text())
            .then((res) => JSON.parse(res) as ScheduleData[])
            .then((res) => {
                const newSchedules = res.map((e) => {
                    return {
                        uuid: e.id,
                        name: e.name
                    }
                }) as Teacher[];

                dispatch(updateResourceSchedule({
                    data: newSchedules
                }));
            });
    }

    const addSchedule = (name: string) => {

        const options = {
            method: "POST",
            body: JSON.stringify({
                name: name
            }),
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors' as RequestMode
        };

        fetch(API_ENDPOINT_URL + "/api/v1/schedules/", options)
            .then(() => {
                fetchSchedules();
            })
    }

    const removeSchedule = (uuid: string) => {

        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors' as RequestMode
        };

        fetch(API_ENDPOINT_URL + "/api/v1/schedules/"+uuid+"/", options)
            .then(() => {
                fetchSchedules();
            })
    }

    return [fetchSchedules, addSchedule, removeSchedule];
}