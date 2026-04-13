import React from 'react'

const CompleteTask = ({task}) => {
  return (
    <div className='h-[98%] w-80 sm:w-90 bg-green-600 rounded-2xl shrink-0'>
        <div className='h-[20%] w-full flex justify-between items-center space-between p-4'>
            <div className='h-8 w-fit px-2.5 py-0.7 bg-green-400 rounded-md'>Completed</div>
            <div className='text-base font-semibold'>{task.taskDate}</div>
        </div>
        
        <div className='p-5'>
            <h2 className='text-3xl font-bold mb-5'>{task.taskTitle}</h2>
            <p className='text-lg'>{task.taskDescription}</p>
        </div>
    </div>
  )
}

export default CompleteTask
