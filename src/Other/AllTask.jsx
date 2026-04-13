import {React, useContext } from 'react'
import { AuthContext } from '../context/Authprovider'

const AllTask = () => {
    const [allData] = useContext(AuthContext);
    // console.log("AllTask : ", allData);
  return (
    <>
        <div className='flex justify-between h:fit sm:h-14 w-full p-4 mt-7 bg-blue-400 rounded-full'>
            <h2 className='sm:ml-5 mr-2 sm:mr-0 text-sm sm:text-base font-bold sm:border-2 sm:h-7 sm:w-17 sm:pl-2 sm:rounded-xl'>Name</h2>
            <h3 className='font-bold text-sm sm:text-base sm:border-2 sm:h-7 sm:w-23 pl-2 sm:rounded-xl'>New Task</h3>
            <h3 className='font-bold text-sm sm:text-base text-yellow-300 sm:border-2 sm:h-7 sm:w-26 pl-2 sm:rounded-xl'>Active Task</h3>
            <h3 className='font-bold text-sm sm:text-base text-green-300 sm:border-2 sm:h-7 sm:w-35 pl-2 sm:rounded-xl'>Completed Task</h3>
            <h4 className='mr-5 font-bold text-sm sm:text-base text-red-300 sm:border-2 sm:h-7 sm:w-17 pl-2 sm:rounded-xl'>Failed</h4>
        </div>

        <div id='taskList' className='overflow-auto h-55 w-full'>
            {
                allData.employees.map((elem,idx)=>{
                    return <div key={idx} className='flex sm:justify-between h-14 w-full mt-2 p-4 bg-blue-400 rounded-full'>
                                <h2 className='sm:ml-7 w-15 justify-self-center font-bold'>{elem?.firstName}</h2>
                                <h3 className='font-bold w-15 ml-3 sm:mr-7'>{elem?.taskCounts?.newTask}</h3>
                                <h3 className='font-bold w-15 text-yellow-300 ml-4 sm:mr-7'>{elem?.taskCounts?.active}</h3>
                                <h3 className='font-bold w-15 text-green-300 ml-6 sm:mr-7'>{elem?.taskCounts?.completed}</h3>
                                <h4 className='mr-9 font-bold w-5 text-red-300 ml-14 sm:mr-7'>{elem?.taskCounts?.failed}</h4>
                            </div>
                })
            }
        </div>
    </>
  )
}

export default AllTask
