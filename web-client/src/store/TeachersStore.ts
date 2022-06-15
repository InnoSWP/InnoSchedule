import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Teacher } from "../models/Teacher";

interface TeachersState {
    courses: Array<Teacher>;
}

const initialState: TeachersState = {
    courses: [],
}

interface addTeacherPayloadActionProps {
    teacherId: number;
    teacherToAdd: Teacher;
}

export const teachersSlice = createSlice({
    name: 'teachers',
    initialState,
    reducers: {
        addTeacher: (state, action: PayloadAction<addTeacherPayloadActionProps>) => {
            state.courses[action.payload.teacherId] = action.payload.teacherToAdd;
        },
        removeTeacher: (state, action: PayloadAction<number>) => {
            state.courses = state.courses.filter((e, i) => i !== action.payload);
        }
    },
})

export const { addTeacher, removeTeacher } = teachersSlice.actions;
export default teachersSlice.reducer;