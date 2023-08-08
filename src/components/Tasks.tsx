'use client'
import React from 'react'
import { useQuery } from "react-query";
import {getAllTasks} from '../../api/TaskAPI';
import TaskItem from './TaskItem';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
function Task() {
  const todos = useSelector((state: RootState) => state.todos);
const {data, refetch, isFetching} = useQuery(['alltasks'], getAllTasks, {onSuccess: (data) => console.log(data)})

console.log(todos)

if (isFetching) {
  return <div>Loading...</div>
}

  return (
    <>
    {/* {data.map((d) => <TaskItem task={d.title} desc={d.description} date={d.dueDate} />)} */}
    <h1>Hi</h1>
    </>
  )
}

export default Task
