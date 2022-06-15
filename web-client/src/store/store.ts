import { configureStore } from '@reduxjs/toolkit'
import coursesReducer from "./ScheduleEditorStore";
import schedulesReducer from "./ScheduleStorageStore";
import teachersReducer from "./TeachersStore";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        courses: coursesReducer,
        schedules: schedulesReducer,
        teachers: teachersReducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;