import {React ,useContext, useState } from 'react'
import { AuthContext } from '../../context/Authprovider';

const ReassineTask = ({currTask , onReassign}) => {

    const [allData, setUserdata] = useContext(AuthContext);

    const [employee, setEmployee] = useState('');
    const [date, setDate] = useState('');

    function handleReassign() {

        if (!employee || !date) {
            alert("Please select an employee and date");
            return;
        }

        const updatedEmployees = allData.employees.map(emp => {

            const filteredTasks = emp.tasks.filter(
                t => t.taskTitle !== currTask.task.taskTitle
            );

            if (emp.firstName === employee) {
                console.log("Reassigning Task to Employee:", emp.firstName);
                return {
                    ...emp,
                    taskCounts: {
                        ...emp.taskCounts,
                        newTask: emp.taskCounts.newTask + 1,
                    },
                    tasks: [
                        ...filteredTasks,
                        {
                            ...currTask.task,
                            active: false,
                            newTask: true,
                            completed: false,
                            failed: false,
                            reject: false,
                            taskDate: date
                        }
                    ]
                };
            }

            return {
                ...emp,
                tasks: filteredTasks
            };
        });

        const updatedData = {
            ...allData,
            employees: updatedEmployees,
            total: {
                ...allData.total,
                totalRejected: allData.total.totalRejected - 1,
            }
        };

        setUserdata(updatedData);
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        onReassign(currTask.task);
        alert("Task Reassigned Successfully ✅");
    }

    function handleDelete() {

        const updatedEmployees = allData.employees.map(emp => {
            const filteredTasks = emp.tasks.filter(
                t => t.taskTitle !== currTask.task.taskTitle
            );
            return {
                ...emp,
                tasks: filteredTasks,
            };
        });

        const updatedData = {
            ...allData,
            employees: updatedEmployees
        };

        setUserdata(updatedData);
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        onReassign(currTask.task);
        alert("Task Deleted Successfully ✅");
    }

    function handleCancel() {
        onReassign(currTask.task);

    }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">

        <div className="bg-gray-900 flex flex-col justify-between p-6 rounded-xl h-100 w-90">
            <div className='h-[40%] gap-3'>
                <h2 className="h-[20%] mb-3 justify-self-center text-red-700 font-bold">Task Reassign</h2>

                <h2 className='h-fit mb-3 text-lg font-bold'>Task : {currTask?.task?.taskTitle}</h2>
                <p className='h-fit mb-3 text-gray-300'>Description : {currTask?.task?.taskDescription}</p>

                <select
                    value={employee}
                    onChange={(e) => setEmployee(e.target.value)} className="h-10 w-full mt-4 border p-2 rounded">
                    <option value="" className='bg-gray-900 taxt-white'>Select Employee</option>
                    {currTask?.elem?.map((emp, idx) => {
                        return <option key={idx} value={emp.firstName} className='bg-gray-900 taxt-white'>{emp.firstName}</option>;
                    })}
                </select>

                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-10 w-full mt-4 border p-2 rounded"/>
            </div>

            <div className='flex justify-between'>
                <button onClick={() => handleReassign()} className="bg-green-500 text-white px-3 py-1 rounded mt-2">Reassign</button>

                <button onClick={() => handleDelete()} className="bg-red-500 text-white px-3 py-1 rounded mt-2">Delete</button>

                <button onClick={() => handleCancel()} className="bg-gray-500 text-white px-3 py-1 rounded mt-2">Cancel</button>
            </div>
        </div>
    </div>
    );
} 

export default ReassineTask
