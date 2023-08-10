// redux/slices/todosSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  title: string;
  id: string;
  description: string;
  dueDate: Date;
  completed: boolean;
}

const todosSlice = createSlice({
  name: "todos",
  initialState: [] as Todo[],
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      return state.filter((todo) => {
        return todo._id !== action.payload;
      });
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const updatedTodo = action.payload;
      const index = state.findIndex((todo) => todo._id === updatedTodo._id);
      if (index !== -1) {
        state[index] = updatedTodo;
      }
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      const obj = action.payload;
      const todo = state.find((todo) => { return todo._id === obj._id});
      if (todo) {
        todo.completed = true;
      }
    },
    unCompleteTodo: (state, action: PayloadAction<string>) => {
      const obj = action.payload;
      const todo = state.find((todo) => { return todo._id === obj._id});
      if (todo) {
        todo.completed = false;
      }
    },
  },
});

export const { setTodos, addTodo, deleteTodo, editTodo, completeTodo, unCompleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
