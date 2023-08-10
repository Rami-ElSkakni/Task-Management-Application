"use client";
import React from "react";
import { useQuery } from "react-query";
import { getAllTasks } from "../../api/TaskAPI";
import TaskItem from "./TaskItem";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setTodos } from "../redux/features/todoSlice";
function Task() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const { data, refetch, isFetching } = useQuery(["alltasks"], getAllTasks, {
    staleTime: 3000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => dispatch(setTodos(data)),
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <div>
        {todos.length == 0 && <div className="text-center my-10">No tasks</div>}
        {todos.map((d) => {
          if (!d.completed) {
            return (
              <TaskItem
                key={d._id}
                id={d._id}
                task={d.title}
                desc={d.description}
                date={d.dueDate}
              />
            );
          }
        })}
      </div>

      <div>
        <h2 className="text-center font-bold text-xl mt-10">Completed Tasks</h2>
        {todos.map((d) => {
          if (d.completed) {
            return (
              <TaskItem
                key={d._id}
                id={d._id}
                task={d.title}
                desc={d.description}
                date={d.dueDate}
                color='#00AF3A'
              />
            );
          }
        })}
      </div>
    </>
  );
}

export default Task;
