import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type InitialState = {
    value: TasksState
}

type TasksState = {
    tasks: Array<Object>;
}

const initialState = {
    value: {
        tasks: []
    }
} as InitialState

export const tasks = createSlice({
    name: "auth",
    initialState,
    reducers
}) 