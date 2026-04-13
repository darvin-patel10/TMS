import React from 'react'

const RejectTask = ({task}) => {
  return (
    <div className='h-full w-80 sm:w-90 bg-gray-600 rounded-2xl shrink-0'>
      <div className='h-[20%] w-full flex justify-between items-center space-between p-4'>
          <div className='h-8 w-fit px-2.5 py-0.7 bg-gray-400 rounded-md'>Rejected Task</div>
          <div className='text-base font-semibold'>{task?.taskDate}</div>
      </div>
      
      <div className='p-5 h-[60%]'>
          <h2 className='text-3xl font-bold mb-5'>{task.taskTitle}</h2>
          <p className='text-xl h-fit'>Rejected</p>
      </div>
    </div>
  )
}

export default RejectTask
