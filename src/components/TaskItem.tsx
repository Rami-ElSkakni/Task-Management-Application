import React, { useState } from "react";
import { useMutation } from "react-query";
import { deleteTask, editTask } from "../../api/TaskAPI";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo, completeTodo } from "../redux/features/todoSlice";
import { Modal, Skeleton } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
function TaskItem({ task, desc, date, id, color }) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  const { mutate } = useMutation(["deleteTask"], deleteTask, {
    onSuccess: () => dispatch(deleteTodo(id.toString())),
  });
  const { mutate: editMutate, isLoading } = useMutation(["editTask"], editTask, {
    //onSuccess: () => dispatch(editTodo({_id: id, title: updatedTask, description: details, dueDate: Updateddate})),
  });


  const deleteClickHandler = () => {
    mutate(id);
  };

  const taskClickHandler = () => {
    setOpen(true);
  };
  const taskHandler = (e: any) => {
    setTask(e.target.value);
  }

  const completedHandler = () => {
    dispatch(completeTodo({_id: id}))
  }

  const validationSchema = Yup.object({
    updatedTask: Yup.string().required("Task is required"),
    details: Yup.string().required("Details are required"),
    Updateddate: Yup.date().required("Date is required"),
  });

  const formHandler =  async ({updatedTask, details, Updateddate}) => {
    setOpen(false);
    setTask(updatedTask);
    setDate(Updateddate);
    setDetails(details)
    editMutate({_id: id, title: updatedTask, description: details, dueDate: Updateddate})

    //const res = await mutateAsync({title: task, description: details, dueDate: date});
    dispatch(editTodo({_id: id, title: updatedTask, description: details, dueDate: Updateddate}))

  }


  return (
    <div className="mt-8 px-4 py-6 rounded-md bg-indigo-700 text-white" style={{backgroundColor: color}}>
      {!isLoading && <div className="text-xs">{task}</div>}
      {isLoading && <Skeleton variant="text" sx={{ bgcolor: 'grey.900', fontSize: '.75rem', width: 0.2 }} />}
      <div className="flex justify-between">
        {!isLoading && <div className="text-lg">{desc}</div>}
        {isLoading && <Skeleton variant="text" sx={{ bgcolor: 'grey.900', fontSize: '.75rem', width: 0.7 }} />}
        {!isLoading && <div className="flex gap-5 items-center">
          <div
            onClick={taskClickHandler}
          >
            <FontAwesomeIcon className="cursor-pointer" icon={faPen} />
          </div>
          <div
            onClick={deleteClickHandler}
            // className="p-2 w-1 h-1 rounded-full bg-white border-red-500 border-2 cursor-pointer"
          >
            <FontAwesomeIcon icon={faTrash} className="cursor-pointer text-red"/>
          </div>
          <div onClick={completedHandler}
            className="p-2 w-1 h-1 rounded-full bg-white border-red-500 border-2 cursor-pointer"
          >
            
          </div>
        </div>}
      </div>
      {!isLoading && <div className="text-xs">{formattedDate}</div>}
      {isLoading && <Skeleton variant="text" sx={{ bgcolor: 'grey.900', fontSize: '.75rem', width: 0.2 }} />}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-white text-center w-2/5 max-w-sm m-auto mt-20 rounded-lg py-4">
          <h2 className="text-xl">Edit task</h2>
          <Formik
            initialValues={{
              updatedTask: "",
              details: "",
              Updateddate: "",
            }}
            onSubmit={formHandler}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col w-4/5 m-auto gap-4">
                <Field
                  name="updatedTask"
                  className="border-2 py-2 px-1 rounded"
                  type="text"
                  placeholder="Task"
                />
                <ErrorMessage name="updatedTask" component="div" className="text-red-500 text-left" />

                <Field
                  name="details"
                  className="border-2 py-2 px-1 rounded"
                  type="text"
                  placeholder="Details"
                />
                <ErrorMessage name="details" component="div" className="text-red-500 text-left" />

                <Field
                  name="Updateddate"
                  className="border-2 py-2 px-1 rounded"
                  type="date"
                  placeholder="Pick a date"
                />
                <ErrorMessage name="Updateddate" component="div" className="text-red-500 text-left" />

                <button
                  type="submit"
                  className={`bg-fuchsia-600 rounded text-white py-3 ${
                    isSubmitting && 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={isSubmitting}
                >
                    Edit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
}

export default TaskItem;
