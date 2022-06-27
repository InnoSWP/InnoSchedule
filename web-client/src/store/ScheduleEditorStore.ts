export const a = 5;

/* import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {Course, CourseGroup} from "models/Course";
import { Teacher } from 'models/Teacher';

interface CoursesState {
    courses: Array<Course>;
}

const initialState: CoursesState = {
    courses: [
        new Course(
            "Physical culture and sport (Theoretical)",
            "PC&S (Theoretical)",
            false,
            [
                new CourseGroup(
                    "default",
                    [
                        new Teacher(
                            "Rabab Marouf",
                            "ohwfuhwef"
                        )
                    ]
                )
            ]
        )
    ],
}

interface addCoursePayloadActionProps {
    courseId?: number;
    courseToAdd: Course;
}

export const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        addCourse: (state, action: PayloadAction<addCoursePayloadActionProps>) => {
            if (!action.payload.courseId) action.payload.courseId = state.courses.length

            state.courses[action.payload.courseId] = action.payload.courseToAdd;
        },
        removeCourse: (state, action: PayloadAction<number>) => {
            state.courses = state.courses.filter((e, i) => i !== action.payload);
        }
    },
})

export const { addCourse, removeCourse } = coursesSlice.actions;
export default coursesSlice.reducer;*/