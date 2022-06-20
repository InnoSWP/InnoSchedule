import { configureStore } from '@reduxjs/toolkit'
import coursesReducer from "./ScheduleEditorStore";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ResourcesStore } from "./ResourcesStore";

import { Room } from "models/Room";
import { Teacher } from "models/Teacher";
import { Activity } from "models/Activity";
import { ScheduleForList } from "models/ScheduleForList";

// TODO Types for resource actions

const roomsStore = new ResourcesStore<Room>(
    "rooms",
    "Room",
    [
        new Room("107"),
        new Room("108")
    ]
);
export const { addResourceRoom, removeResourceRoom } = roomsStore.resourceActions;

const teachersStore = new ResourcesStore<Teacher>(
    "teachers",
    "Teacher",
    [
        new Teacher("Rabab"),
        new Teacher("Georgiy"),
        new Teacher("Artem"),
        new Teacher("Nursultan")
    ]
);
export const { addResourceTeacher, removeResourceTeacher } = teachersStore.resourceActions;

const activitiesStore = new ResourcesStore<Teacher>(
    "activities",
    "Activity",
    [
        new Activity("Lab"),
        new Activity("Tutorial"),
        new Activity("Lecture")
    ]
);
export const { addResourceActivity, removeResourceActivity } = activitiesStore.resourceActions;

const schedulesStore = new ResourcesStore<ScheduleForList>(
    "schedules",
    "Schedule",
    [
        new ScheduleForList('BS21 - Spring', 1),
        new ScheduleForList('BS22 - Summer', 0),
        new ScheduleForList('MS21 - Spring I block', 1),
        new ScheduleForList('MS21 - Spring II block', 1)
    ]
)
export const { addResourceSchedule, removeResourceSchedule } = schedulesStore.resourceActions;

const store = configureStore({
    reducer: {
        courses: coursesReducer,
        schedules: schedulesStore.resourceReducer,

        rooms: roomsStore.resourceReducer,
        teachers: teachersStore.resourceReducer,
        activities: activitiesStore.resourceReducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;