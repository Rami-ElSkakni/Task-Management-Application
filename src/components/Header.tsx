'use client'

import { Modal, Box, Typography } from "@mui/material";
import React, {useState} from "react";
import { useMutation } from "react-query";
import {getAllTasks, addTask} from '../../api/TaskAPI';
//import { setTodos, addTodo, deleteTodo } from '../redux/features/todoSlice';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../redux/features/todoSlice';
function Header() {

  const [open, setOpen] = useState(false);
  const [task, setTask] = useState();
  const [details, setDetails] = useState();
  const [date, setDate] = useState();
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const {mutateAsync} = useMutation(['alltasks'], addTask)


  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const taskHandler = (e: any) => {
    setTask(e.target.value);
  }

  const formHandler =  async (e: any) => {
    e.preventDefault();
    setOpen(false)
    const res = await mutateAsync({title: task, description: details, dueDate: date});
    dispatch(addTodo({id: res._id, title: task, description: details, dueDate: date}));
    setTask(undefined);
    setDetails(undefined);
    setDate(undefined);
  }


  return (
    <div>
    <div className="flex justify-between py-1  mt-3">
      <div>Task Management</div>
      <button className="font-bold" onClick={handleOpen}>
        <span className="bg-fuchsia-600 border rounded-full text-white border-none px-2 py-1 mr-1">
          +
        </span>{" "}
        New Task
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-white text-center w-2/5 m-auto mt-20 rounded-lg py-4">
          <h2 className="text-xl">Add a task</h2>
          <form className="flex flex-col w-4/5 m-auto gap-4">
          <input onChange={taskHandler} className="border-2 py-2 px-1 rounded" type="text" placeholder="Task"></input>
          <input onChange={(e: any) => setDetails(e.target.value)} type="text" placeholder="Details"></input>
          <input onChange={(e: any) => setDate(e.target.value)} type="date" placeholder="Pick a date"></input>
          <button onClick={formHandler} className="bg-fuchsia-600 rounded text-white py-3">Add task</button>
          </form>
        </div>
      </Modal>
    </div>

      
    </div>
  );
}

export default Header;
