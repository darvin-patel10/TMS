import React from 'react'

const TaskListNumbers = ({data}) => {
  return (
    <div className='flex justify-center items-center flex-wrap gap-5 h-fit w-full mb-5 p-5'>
        <div className='h-18 w-30 sm:h-30 sm:w-75 items-center bg-blue-300 rounded-2xl p-4 '>
            <h3 className='text-black sm:text-4xl font-extrabold text-lg'>{data.taskCounts.newTask}</h3>
            <h3 className='text-black sm:text-2xl font-bold text-base'>New Task</h3>
        </div>
        <div className='h-18 w-30 sm:h-30 sm:w-75 items-center bg-green-300 rounded-2xl p-4 '>
            <h3 className='text-black sm:text-4xl font-extrabold text-lg'>{data.taskCounts.completed}</h3>
            <h3 className='text-black sm:text-2xl font-bold text-base'>Completed</h3>
        </div>
        <div className='h-18 w-30 sm:h-30 sm:w-75 items-center bg-yellow-200 rounded-2xl p-4 '>
            <h3 className='text-black sm:text-4xl font-extrabold text-lg'>{data.taskCounts.active}</h3>
            <h3 className='text-black sm:text-2xl font-bold text-base'>Accepted</h3>
        </div>
        <div className='h-18 w-30 sm:h-30 sm:w-75 items-center bg-red-300 rounded-2xl p-4'>
            <h3 className='text-black sm:text-4xl font-extrabold text-lg'>{data.taskCounts.failed}</h3>
            <h3 className='text-black sm:text-2xl font-bold text-base'>Failed</h3>
        </div>
    </div>
  )
}

export default TaskListNumbers
