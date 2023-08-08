'use client'

import { Modal, Box, Typography } from "@mui/material";
import React, {useState} from "react";
import { useQuery, useMutation } from "react-query";
import {getAllTasks, addTask} from '../../api/TaskAPI';
function Header() {

  const [open, setOpen] = useState(false);
  const [task, setTask] = useState();
  const [details, setDetails] = useState();
  const [date, setDate] = useState();

  const {data, refetch, isFetching} = useQuery(['alltasks'], getAllTasks, {onSuccess: (data) => console.log(data)})
  const {mutate} = useMutation(['alltasks'], addTask)

  //console.log(data)

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const taskHandler = (e: any) => {
    setTask(e.target.value);
  }

  const formHandler =  (e: any) => {
    e.preventDefault();
    setOpen(false)

    console.log({
      task,
      details,
      date
    });

   mutate({title: task, description: details, dueDate: date});

  }

  return (
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
  );
}

export default Header;
