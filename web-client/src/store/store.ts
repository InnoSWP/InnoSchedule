import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ResourcesStore } from "./ResourcesStore";

import { Room } from "models/Room";
import { Teacher } from "models/Teacher";
import { Activity } from "models/Activity";
import { ScheduleForList } from "models/ScheduleForList";

// TODO Types for resource actions

const roomsStore = new ResourcesStore<Room>(
    "rooms",
    "Room"
);
export const { addResourceRoom, removeResourceRoom, updateResourceRoom } = roomsStore.resourceActions;

const teachersStore = new ResourcesStore<Teacher>(
    "teachers",
    "Teacher"
);
export const { addResourceTeacher, removeResourceTeacher, updateResourceTeacher } = teachersStore.resourceActions;

const activitiesStore = new ResourcesStore<Activity>(
    "activities",
    "Activity"
);
export const { addResourceActivity, removeResourceActivity, updateResourceActivity } = activitiesStore.resourceActions;

const schedulesStore = new ResourcesStore<ScheduleForList>(
    "schedules",
    "Schedule"
)
export const { addResourceSchedule, removeResourceSchedule, updateResourceSchedule } = schedulesStore.resourceActions;

const store = configureStore({
    reducer: {
        // courses: coursesReducer,
        schedules: schedulesStore.resourceReducer,

        rooms: roomsStore.resourceReducer,
        teachers: teachersStore.resourceReducer,
        activities: activitiesStore.resourceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;