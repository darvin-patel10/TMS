import {React,useContext} from 'react'
import { AuthContext } from '../context/Authprovider'

const NewTask = ({task}) => {

    const [allData,setUserdata] = useContext(AuthContext);

    function accseptTask(taskTitle) {
        const updatedEmployees = allData.employees.map(emp => {

            let updatedTasks = emp.tasks.map(task => {
                if (task.taskTitle === taskTitle) {

                    return {
                        ...task,
                        active: true,
                        newTask: false,
                        completed: false,
                        failed: false,
                        reject: false
                    };
                }
                return task;
            });


            const hasTask = emp.tasks.some(t => t.taskTitle === taskTitle);

            return {
                ...emp,
                tasks: updatedTasks,
                taskCounts: hasTask
                ? {
                    ...emp.taskCounts,
                    newTask: emp.taskCounts.newTask - 1,
                    active: emp.taskCounts.active + 1
                }
                : emp.taskCounts
            };
        });

        const updatedData = {
            ...allData,
            employees: updatedEmployees
        };

        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        if (loggedInUser && loggedInUser.role === 'employee') {

            const updatedUser = {
                ...loggedInUser,
                data: updatedEmployees.find(emp => emp.email === loggedInUser.data.email)
            };

            localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
        }

        setUserdata(updatedData);

        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    }

    function cancleTask(taskTitle) {
        const updatedEmployees = allData.employees.map(emp => {

            let updatedTasks = emp.tasks.map(task => {
                if (task.taskTitle === taskTitle) {

                    return {
                        ...task,
                        active: false,
                        newTask: false,
                        completed: false,
                        failed: false,
                        reject: true
                    };
                }
                return task;
            });


            const hasTask = emp.tasks.some(t => t.taskTitle === taskTitle);

            return {
                ...emp,
                tasks: updatedTasks,
                taskCounts: hasTask
                ? {
                    ...emp.taskCounts,
                    newTask: emp.taskCounts.newTask - 1,
                    reject: emp.taskCounts.reject + 1
                }
                : emp.taskCounts
            };
        });

        const updatedData = {
            ...allData,
            employees: updatedEmployees,
            total: {
                ...allData.total,
                totalRejected: allData.total.totalRejected + 1,
            }
        };

        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        if (loggedInUser && loggedInUser.role === 'employee') {

            const updatedUser = {
                ...loggedInUser,
                data: updatedEmployees.find(emp => emp.email === loggedInUser.data.email)
            };

            localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
        }

        setUserdata(updatedData);

        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    }


  return (
    <div className='h-[98%] w-80 sm:w-90 bg-blue-600 rounded-2xl shrink-0'>
        <div className='h-[20%] w-full flex justify-between items-center space-between p-4'>
            <div className='h-8 w-fit px-2.5 py-0.7 bg-blue-400 rounded-md'>New Task</div>
            <div className='text-base font-semibold'>{task.taskDate}</div>
        </div>
        
        <div className='p-5 h-[60%]'>
            <h2 className='text-3xl font-bold mb-5'>{task.taskTitle}</h2>
            <p className='text-lg h-fit'>{task.taskDescription}</p>
        </div>

        <div className='flex justify-center gap-3'>
            <button className='h-13 w-35 bg-green-400 rounded-md cursor-pointer font-bold' onClick={()=>{accseptTask(task.taskTitle)}}>Accept</button>
            <button className='h-13 w-35 bg-red-400 rounded-md cursor-pointer font-bold' onClick={()=>{cancleTask(task.taskTitle)}}>Cancle </button>
        </div>
    </div>    
  )
}

export default NewTask
