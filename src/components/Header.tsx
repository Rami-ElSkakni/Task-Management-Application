"use client";

import { Modal, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { getAllTasks, addTask } from "../../api/TaskAPI";
//import { setTodos, addTodo, deleteTodo } from '../redux/features/todoSlice';
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/features/todoSlice";
import { TailSpin } from "react-loader-spinner";
import { Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from 'yup';
function Header() {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState();
  const [details, setDetails] = useState();
  const [date, setDate] = useState();
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const { mutateAsync, isLoading } = useMutation(["alltasks"], addTask);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const taskHandler = (e: any) => {
    setTask(e.target.value);
  };

  const formHandler = async ({task, details, date}) => {
    console.log("header",date);
    const res = await mutateAsync({
      title: task,
      description: details,
      dueDate: date,
    });
    setOpen(false);
    dispatch(
      addTodo({
        _id: res._id,
        title: task,
        description: details,
        dueDate: date,
      })
    );
  };

  const validationSchema = Yup.object().shape({
    task: Yup.string().required('Task is required'),
    details: Yup.string().required('Details are required'),
    date: Yup.date().required('Date is required'),
  });

  return (
    <div>
      <div className="flex justify-between py-1  mt-3 border-b-orange-50">
        <div>Task Management</div>
        <button className="font-bold uppercase" onClick={handleOpen}>
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
          <div className="bg-white text-center w-2/5 m-auto max-w-sm mt-20 rounded-lg py-4">
            <h2 className="text-xl">Add a task</h2>
            <Formik
              initialValues={{
                task: "",
                details: "",
                date: "",
              }}
              onSubmit={formHandler} // Pass your form handling function here
              validationSchema={validationSchema}
            >
              {({isValid}) => (<Form className="flex flex-col w-4/5 m-auto gap-4">
                <Field
                  name="task"
                  className="border-2 py-2 px-1 rounded"
                  type="text"
                  placeholder="Task"
                />
                <ErrorMessage name="task" component="div" className="text-red-500 text-left" />
                <Field
                  name="details"
                  className="border-2 py-2 px-1 rounded"
                  type="text"
                  placeholder="Details"
                />
                <ErrorMessage name="details" component="div" className="text-red-500 text-left" />
                <Field
                  name="date"
                  className="border-2 py-2 px-1 rounded"
                  type="date"
                  placeholder="Pick a date"
                />
                <ErrorMessage name="date" component="div" className="text-red-500 text-left" />
                {!isLoading && (
                  <button
                    type="submit" // Important: Use type="submit" for the submit button
                    className={`bg-fuchsia-600 rounded text-white py-3 ${!isValid && 'opacity-50 cursor-not-allowed'}`}
                  >
                    Add task
                  </button>
                )}
                {isLoading && (
                  <div className="text-center flex justify-center">
                    <TailSpin
                      height="60"
                      width="60"
                      color="#4338CA"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                    />
                  </div>
                )}
              </Form>)}
            </Formik>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Header;
