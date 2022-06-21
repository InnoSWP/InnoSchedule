import { Teacher } from "models/Teacher";
import { updateResourceTeacher, useAppDispatch } from "store";
import { API_ENDPOINT_URL } from "./config";
import { ResourceStandardFetcherAPI } from "./ResourceStandardFetcherAPI";

interface TeacherData {
    id: string;
    name: string;
}

export const useTeachers = ():[
    fetchTeachers: () => void,
    addTeacher: (name: string) => void,
    removeTeacher: (uuid: string) => void
] => {

    const dispatch = useAppDispatch();

    const teacherFetcher = new ResourceStandardFetcherAPI<TeacherData, Teacher>(
        API_ENDPOINT_URL,
        "teachers",
        updateResourceTeacher,
        dispatch
    );

    return [teacherFetcher.updateResource, teacherFetcher.addResource, teacherFetcher.removeResource];
}