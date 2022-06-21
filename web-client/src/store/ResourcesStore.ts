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
     * to access resource you should use "state.{resourceName}.list"
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
        const resourceUpdateName = "updateResource" + actionPostfix;

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
                },
                [resourceUpdateName]: (state, action: PayloadAction<{
                    data: T[];
                }>) => {
                    (state.list as T[]) = action.payload.data;
                }
            }
        });

        this.resourceActions = this.resourceSlice.actions;
        this.resourceReducer = this.resourceSlice.reducer;
    }
}