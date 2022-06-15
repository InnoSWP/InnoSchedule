import { createData, Data } from "components/SchedulesList";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StorageState {
    schedules: Array<Data>;
}

const initialState: StorageState = {
    schedules: [
        createData('BS21 - Spring', 1),
        createData('BS22 - Summer', 0),
        createData('MS21 - Spring I block', 1),
        createData('MS21 - Spring II block', 1),
    ],
}

interface addCoursePayloadActionProps {
    scheduleId: number;
    scheduleToAdd: Data;
}

export const schedulesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        addSchedule: (state, action: PayloadAction<addCoursePayloadActionProps>) => {
            state.schedules[action.payload.scheduleId] = action.payload.scheduleToAdd;
        },
        removeSchedule: (state, action: PayloadAction<string>) => {
            state.schedules = state.schedules.filter((e) => e.name !== action.payload);
        }
    },
})

export const { addSchedule, removeSchedule } = schedulesSlice.actions;
export default schedulesSlice.reducer;