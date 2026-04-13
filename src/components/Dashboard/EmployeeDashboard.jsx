import React from 'react'
import Header from '../../Other/Header'
import AcceptTask from '../../TaskList/AcceptTask'
import CompleteTask from '../../TaskList/CompleteTask'
import FailedTask from '../../TaskList/FailedTask'
import NewTask from '../../TaskList/NewTask'
import TaskListNumbers from '../../Other/TaskListNumbers'
import RejectTask from '../../TaskList/RejectTask'

const EmployeeDashboard = (props) => {
  return (
    <>
        <Header changeUser={props.changeUser} data={props.data}/>
        <div className='h-screen mt-10'>
            <TaskListNumbers data={props.data}/>
            <div className='text-4xl font-bold ml-10'>Task List</div>
            <div id="taskCard" className='flex justify-start items-center gap-3 overflow-x-auto h-[50%] w-full p-2.5 sm:p-10 mt-8'>

                {props.data.tasks.map((elem , idx)=>{
                    
                    if (elem.newTask == true) {
                        return <NewTask key={idx} task={elem}/>
                    }
                    else if(elem.active == true){
                        return <AcceptTask key={idx} task={elem}/>
                    }
                    else if (elem.completed==true) {
                        return <CompleteTask key={idx} task={elem}/>
                    }
                    else if (elem.reject==true) {
                        return <RejectTask key={idx} task={elem}/>
                    }
                    else if (elem.failed==true) {
                        return <FailedTask key={idx} task={elem}/>
                    }
                    
                })}
                
            </div>
        
        </div>
    </>
  )
}

export default EmployeeDashboard
