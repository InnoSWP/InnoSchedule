import { updateResourceRoom, useAppDispatch } from "../store";
import { ResourceStandardFetcherAPI } from "./ResourceStandardFetcherAPI";
import { API_ENDPOINT_URL } from "./config";
import { Room } from "../models/Room";

interface RoomData {
    id: string;
    name: string;
}

export const useRooms = ():[
    fetchRooms: () => void,
    addRoom: (name: string) => void,
    removeRoom: (uuid: string) => void
] => {

    const dispatch = useAppDispatch();

    const roomFetcher = new ResourceStandardFetcherAPI<RoomData, Room>(
        API_ENDPOINT_URL,
        "rooms",
        updateResourceRoom,
        dispatch
    );

    return [roomFetcher.updateResource, roomFetcher.addResource, roomFetcher.removeResource];
}