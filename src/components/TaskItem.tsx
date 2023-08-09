import React from 'react'
import { useMutation } from "react-query";
import { deleteTask } from '../../api/TaskAPI';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../redux/features/todoSlice';
function TaskItem({task, desc, date, id}) {
    const dispatch = useDispatch();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    const {mutate} = useMutation(['deleteTask'], deleteTask, {onSuccess: () => dispatch(deleteTodo(id.toString()))})
    const deleteClickHandler = () => {
        mutate(id)
        
    }

  return (
    <div className='mt-8 px-4 py-6 rounded-md bg-indigo-700 text-white '>
      <div className='text-xs'>{task}</div>
      <div className='flex justify-between'>
        <div className='text-lg'>{desc}</div>
        <div onClick={deleteClickHandler} className='p-4 rounded-full bg-white border-cyan-200 cursor-pointer'></div>
      </div>
      <div className='text-xs'>{formattedDate}</div>
    </div>
  )
}

export default TaskItem
