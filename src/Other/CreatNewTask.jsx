import {React, useContext, useState } from 'react'
import { AuthContext } from '../context/Authprovider';


const CreatNewTask = () => {
    const [allData,setUserdata] = useContext(AuthContext);
  
    const [taskTitle,setTaskTitle] = useState('');
    const [taskDate,setTaskDate] = useState('');
    const [firstName,setFirstName] = useState('');
    const [category,setCategory] = useState('');
    const [taskDescription,setTaskDescription] = useState('');
    
    const formHandel = (e)=>{
      e.preventDefault();
      const newTask={taskTitle , taskDate , firstName ,category , taskDescription , active: false , newTask: true , completed: false , failed: false, reject: false};
      const data = allData.employees;

      const employeeExists = data.some((elem) => firstName === elem.firstName);

      if (!employeeExists) {
        alert("Employee not found");
        return;
      }
      data.forEach(function(elem){
        if(firstName === elem.firstName){
          elem.tasks.push(newTask);
          elem.taskCounts.newTask = elem.taskCounts.newTask+1;
        }
      })
      localStorage.setItem('employees',JSON.stringify(data));
      setUserdata({...allData, employees: data});
      alert("Task Created Successfully");

      setTaskTitle('');
      setTaskDate('');
      setFirstName('');
      setCategory('');
      setTaskDescription('');
    }

  return (
    <>
      <form onSubmit={formHandel} className='sm:flex h-fit w-full mt-10 '>
        <div className='sm:ml-10 h-fit sm:w-[50%] sm:p-10 p-5 bg-gray-900 rounded-t-xl sm:rounded-t-none  sm:rounded-l-xl rounded-l-none'>
          <div className='taxt-base font-semibold '>Task Title</div>
          <input type='taxt' value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder='Make a Ui Design' className='h-5 w-full text-base text-white sm:m-3 m-2 p-5 border-2 border-gray-300 rounded-sm'></input>

          <div className='taxt-base font-semibold'>Date</div>
          <input type='date' value={taskDate} onChange={(e) => setTaskDate(e.target.value)} className='h-5 w-full text-base text-white sm:m-3 m-2 p-5 border-2 border-gray-300 rounded-sm'></input>

          <div className='taxt-base font-semibold'>Asign to</div>
          {/* <input type='taxt' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='Enter employee name' className='h-5 w-full text-base text-white sm:m-3 m-2 p-5 border-2 border-gray-300 rounded-sm'></input> */}
          <select
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} className="h-11 w-full text-base text-white sm:m-3 m-2 p-1 border-2 border-gray-300 rounded-sm">
            <option value="" className='bg-gray-900 taxt-white'>Select Employee</option>
            {allData?.employees?.map((emp, idx) => {
                return <option key={idx} value={emp.firstName} className='bg-gray-900 taxt-white'>{emp.firstName}</option>;
            })}
          </select>

          <div className='taxt-base font-semibold'>Category</div>
          <input type='taxt' value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Enter category of task' className='h-5 w-full text-base text-white sm:m-3 m-2 p-5 border-2 border-gray-300 rounded-sm'></input>
        </div>

        <div className='sm:mr-10 h-full sm:w-[50%] sm:p-10 p-5 bg-gray-900 rounded-b-xl sm:rounded-b-none sm:rounded-r-xl rounded-r-none'>
          <div className='taxt-base font-semibold'>Description</div>
          <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} className='sm:h-65 h-40 w-full mt-2 p-2 border-2 border-gray-300 rounded-sm text-lg text-white'></textarea>
          <button className='h-15 w-full mt-2 bg-green-500 taxt-base font-semibold rounded-sm cursor-pointer'>Create Task</button>
        </div>
      </form>
    </>
  )
}

export default CreatNewTask
