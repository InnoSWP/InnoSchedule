import { useEffect } from "react";

import { useTeachers } from "./useTeachers";
import { useSchedules } from "./useSchedules";
import { useActivities } from "./useActivities";
import { useRooms } from "./useRooms";

export const useInit = () => {

    const [fetchTeachers] = useTeachers();
    const [fetchSchedules] = useSchedules();
    const [fetchActivities] = useActivities();
    const [fetchRooms] = useRooms();

    useEffect(() => {
        fetchTeachers();
        fetchSchedules();
        fetchActivities();
        fetchRooms();
    }, [])
}