// import {configureStore} from '@reduxjs/toolkit'

// export const store = configureStore({
//     reducer: {

//     }
// })

import { configureStore } from '@reduxjs/toolkit';
//import todosReducer from './slices/todosSlice';
import todoSlice from './features/todoSlice';

const store = configureStore({
  reducer: {
    todos: todoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;