import React from 'react'

function Task() {
  return (
    <div className='mt-8 px-4 py-6 rounded-md bg-indigo-700 text-white '>
      <div className='text-xs'>High Priority</div>
      <div className='flex justify-between'>
        <div className='text-lg'>Buy presents</div>
        <div className='p-4 rounded-full bg-white border-cyan-200 cursor-pointer'></div>
      </div>
      <div className='text-xs'>Go and get Christmas presents for Lana and Sandra</div>
    </div>
  )
}

export default Task
