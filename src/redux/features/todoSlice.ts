// redux/slices/todosSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  title: string;
  id: string,
  description: string;
  dueDate: Date
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      return state.filter((todo) => {return todo._id !== action.payload});
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
        const updatedTodo = action.payload;
        const index = state.findIndex(todo => todo._id === updatedTodo._id);
        if (index !== -1) {
          state[index] = updatedTodo;
        }
      },
  },
});

export const { setTodos, addTodo, deleteTodo, editTodo } = todosSlice.actions;
export default todosSlice.reducer;
