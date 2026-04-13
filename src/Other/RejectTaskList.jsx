import {React , useContext , useState} from 'react'
import { AuthContext } from '../context/Authprovider';
import ReassineTask from '../components/Alart/reassineTask';

const RejectTaskList = () => {
    const [allData] = useContext(AuthContext);
    const [activeTask, setActiveTask] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
  return (
    <>

        <div className='flex justify-between h:fit sm:h-14 w-full p-4 mt-7 bg-blue-400 rounded-full'>
            <h3 className='font-bold text-sm sm:text-base text-yellow-300 sm:border-2 sm:h-7 sm:w-fit ml-2 pr-2 pl-2 sm:rounded-xl'> Task Title</h3>
            <h2 className='sm:ml-5 mr-2 sm:mr-0 text-sm sm:text-base font-bold sm:border-2 sm:h-7 sm:w-17 sm:pl-2 sm:rounded-xl'>Name</h2>
            <h3 className='font-bold text-sm sm:text-base sm:border-2 sm:h-7 sm:w-fit pl-2 pr-2 sm:rounded-xl'>Rejected Task</h3>
            <h3 className='font-bold text-sm sm:text-base text-green-300 sm:border-2 sm:h-7 sm:w-fit pl-2 pr-2 sm:rounded-xl'>Reasien Task</h3>
        </div>

        <div id='taskList' className='overflow-auto h-55 w-full'>
            {
                allData.employees.filter((elem)=>{
                    return elem.taskCounts.reject > 0 && elem.tasks.some(task => task.reject === true);
                }).map((elem,idx)=>{
                    return<div key={idx} className='flex sm:justify-between h-fit w-full mt-2 p-2 bg-blue-400 rounded-full'>
                    {elem?.tasks?.map((task,idx)=>{
                                    if(task?.reject == true){
                                        return<div key={idx} className='w-full sm:justify-between flex items-center'>
                                                <h3 className='font-bold sm:w-30 w-20 text-yellow-300 ml-2 sm:mr-1'>{task?.taskTitle}</h3>
                                                <h2 className='sm:ml-0 ml-2 mr-7 sm:mr-14 text-sm sm:text-base font-bold sm:h-7 sm:w-17 sm:pl-2 '>{elem?.firstName}</h2>
                                                <h3 className='font-bold text-sm sm:text-base sm:h-7 sm:w-fit pl-2 pr-2 m-2'>{elem?.taskCounts?.reject}</h3>
                                                {activeTask === task.taskTitle ?(
                                                    <button key={idx} onClick={() => setSelectedTask({task, elem: allData.employees, currelem: elem})} className='mr-1 sm:mr-5 ml-14 font-bold w-fit text-green-500 ml-6 bg-green-300 border-2 border-green-300 cursor-pointer rounded-full hover:border-2 hover:border-green-500 p-1'>Reasien Task</button> 
                                                ):(
                                                    <button key={idx} onClick={() => setActiveTask(task.taskTitle)} className='mr-5 font-bold w-fit text-red-500 ml-14 bg-red-300 border-2 border-red-300 cursor-pointer rounded-full hover:border-2 hover:border-red-500 p-1 sm:mr-5'>Remove</button>
                                                )}
                                        
                                        </div>
                                    }
                                })}
                        </div>                                
                })
            }
        </div> 

        {selectedTask && (
        <ReassineTask 
            currTask={selectedTask}
            
            onReassign={(task) => {
            // console.log("Reassign:", task);
            setSelectedTask(null);
            }}
        />
        )}
    </>
  )
}

export default RejectTaskList
