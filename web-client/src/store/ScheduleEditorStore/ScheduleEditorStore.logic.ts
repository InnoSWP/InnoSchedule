import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from "./ScheduleEditorStore";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Course } from "../../models/Course";

interface CoursesState {
    courses: Array<Course>;
}

const initialState: CoursesState = {
    courses: [],
}

interface addCoursePayloadActionProps {
    courseId: number;
    courseToAdd: Course;
}

export const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<addCoursePayloadActionProps>) => {
            state.courses[action.payload.courseId] = action.payload.courseToAdd;
        },
        remove: (state, action: PayloadAction<number>) => {
            state.courses = state.courses.filter((e, i) => i !== action.payload);
        }
    },
})

export const { add, remove } = coursesSlice.actions;
export default coursesSlice.reducer;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;