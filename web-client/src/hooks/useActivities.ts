import { updateResourceActivity, useAppDispatch } from "../store";
import { ResourceStandardFetcherAPI } from "./ResourceStandardFetcherAPI";
import { Activity } from "models/Activity";
import { API_ENDPOINT_URL } from "./config";

interface ActivityData {
    id: string;
    name: string;
}

export const useActivities = ():[
    fetchActivities: () => void,
    addActivity: (name: string) => void,
    removeActivity: (uuid: string) => void
] => {

    const dispatch = useAppDispatch();

    const activityFetcher = new ResourceStandardFetcherAPI<ActivityData, Activity>(
        API_ENDPOINT_URL,
        "activities",
        updateResourceActivity,
        dispatch
    );

    return [activityFetcher.updateResource, activityFetcher.addResource, activityFetcher.removeResource];
}