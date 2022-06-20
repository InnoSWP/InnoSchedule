import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Course } from "models/Course";

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
        addCourse: (state, action: PayloadAction<addCoursePayloadActionProps>) => {
            state.courses[action.payload.courseId] = action.payload.courseToAdd;
        },
        removeCourse: (state, action: PayloadAction<number>) => {
            state.courses = state.courses.filter((e, i) => i !== action.payload);
        }
    },
})

export const { addCourse, removeCourse } = coursesSlice.actions;
export default coursesSlice.reducer;