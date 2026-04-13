import { React,useContext } from 'react'
import { AuthContext } from '../context/Authprovider'

const AcceptTask = ({task}) => {
    const [allData, setUserdata] = useContext(AuthContext);

    function completed(taskTitle) {

        const updatedEmployees = allData.employees.map(emp => {

        let updatedTasks = emp.tasks.map(task => {
        if (task.taskTitle === taskTitle) {
            return {
                ...task,
                active: false,
                newTask: false,
                completed: true,
                failed: false,
                reject: false
            };
        }
        return task;
        });

        // check if this employee had the task
        const hasTask = emp.tasks.some(t => t.taskTitle === taskTitle);

        return {
        ...emp,
        tasks: updatedTasks,
        taskCounts: hasTask
            ? {
                ...emp.taskCounts,
                completed: emp.taskCounts.completed + 1,
                active: emp.taskCounts.active - 1
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

    localStorage.setItem('employees', JSON.stringify(updatedEmployees));}


    function failed(taskTitle) {

            const updatedEmployees = allData.employees.map(emp => {

            let updatedTasks = emp.tasks.map(task => {
                if (task.taskTitle === taskTitle) {
                    return {
                        ...task,
                        active: false,
                        newTask: false,
                        completed: false,
                        failed: true,
                        reject: false
                    };
                }
                return task;
            });

            // check if this employee had the task
            const hasTask = emp.tasks.some(t => t.taskTitle === taskTitle);

            return {
                ...emp,
                tasks: updatedTasks,
                taskCounts: hasTask
                    ? {
                        ...emp.taskCounts,
                        failed: emp.taskCounts.failed + 1,
                        active: emp.taskCounts.active - 1
                    }
                    : emp.taskCounts
            };
        });

    const updatedData = {
        ...allData,
        employees: updatedEmployees,
        total: {
            ...allData.total,
            totalFailed: allData.total.totalFailed + 1,
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
    <div className='h-[98%] w-80 sm:w-90 bg-amber-400 rounded-2xl shrink-0'>
        <div className='h-[20%] w-full flex justify-between items-center space-between p-4'>
            <div className='h-8 w-15 px-2.5 py-0.7 bg-yellow-300 rounded-md'>Active</div>
            <div className='text-base font-semibold'>{task.taskDate}</div>
        </div>
        
        <div className='p-5 h-[60%]'>
            <h2 className='text-3xl font-bold mb-5'>{task.taskTitle}</h2>
            <p className='text-lg h-fit'>{task.taskDescription}</p>
        </div>

        <div className='flex justify-center gap-3'>
            <button className='h-13 w-35 bg-blue-400 rounded-md cursor-pointer font-bold' onClick={()=>{completed(task.taskTitle)}}>Completed</button>
            <button className='h-13 w-35 bg-red-400 rounded-md cursor-pointer font-bold' onClick={()=>{failed(task.taskTitle)}}>Failed </button>
        </div>
    </div>
  )
}

export default AcceptTask
