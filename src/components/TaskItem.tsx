import React from 'react'

function TaskItem({task, desc, date}) {

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  return (
    <div className='mt-8 px-4 py-6 rounded-md bg-indigo-700 text-white '>
      <div className='text-xs'>{task}</div>
      <div className='flex justify-between'>
        <div className='text-lg'>{desc}</div>
        <div className='p-4 rounded-full bg-white border-cyan-200 cursor-pointer'></div>
      </div>
      <div className='text-xs'>{formattedDate}</div>
    </div>
  )
}

export default TaskItem
