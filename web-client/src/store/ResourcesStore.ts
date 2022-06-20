import {
    AnyAction,
    createSlice,
    PayloadAction,
    Reducer,
    Slice
} from "@reduxjs/toolkit";

interface ResourcesState<T> {
    list: T[];
}

export class ResourcesStore<T> {

    public resourceReducer: Reducer<ResourcesState<T>, AnyAction>;
    public resourceActions: any;

    private readonly resourceName: string;
    private resourceSlice: Slice<ResourcesState<T>>;


    /**
     * Creates a new resource slice and returns its actions and reducer.
     *
     * For example if you want to add Rooms actions call ("rooms", "Room", [])
     * resourceActions will be: addResourceRoom and removeResourceRoom
     *
     * @param resourceName name for slice
     * @param actionPostfix will be added to name of the function
     * @param initialState initial state of the slice
     */
    constructor(
        resourceName: string,
        actionPostfix: string,
        initialState: T[] = []
    ) {
        this.resourceName = resourceName;

        const resourceAddName = "addResource" + actionPostfix;
        const resourceRemoveName = "removeResource" + actionPostfix;

        this.resourceSlice = createSlice({
            name: this.resourceName,
            initialState: {
                list: initialState
            } as ResourcesState<T>,
            reducers: {
                [resourceAddName]: (state, action: PayloadAction<{
                    index?: number,
                    toAdd: T
                }>) => {
                    let index = state.list.length;
                    if (action.payload.index) index = action.payload.index;

                    (state.list as T[])[index] = action.payload.toAdd;
                },
                [resourceRemoveName]: (state, action: PayloadAction<{
                    toRemove: T
                }>) => {
                    state.list = state.list.filter((e) => e !== action.payload.toRemove);
                }
            }
        });

        this.resourceActions = this.resourceSlice.actions;
        this.resourceReducer = this.resourceSlice.reducer;
    }
}




// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { Teacher } from "models/Teacher";
//
// interface TeachersState {
//     courses: Array<Teacher>;
// }
//
// const initialState: TeachersState = {
//     courses: [],
// }
//
// interface addTeacherPayloadActionProps {
//     teacherId: number;
//     teacherToAdd: Teacher;
// }
//
// export const teachersSlice = createSlice({
//     name: 'teachers',
//     initialState,
//     reducers: {
//         addTeacher: (state, action: PayloadAction<addTeacherPayloadActionProps>) => {
//             state.courses[action.payload.teacherId] = action.payload.teacherToAdd;
//         },
//         removeTeacher: (state, action: PayloadAction<string>) => {
//             state.courses = state.courses.filter((e, i) => e.name !== action.payload);
//         }
//     },
// })
//
// export const { addTeacher, removeTeacher } = teachersSlice.actions;
// export default teachersSlice.reducer;