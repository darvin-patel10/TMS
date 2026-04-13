import { React, useContext, useState } from 'react'
import Header from '../../Other/Header'
import AllTask from '../../Other/AllTask'
import CreatNewTask from '../../Other/CreatNewTask'
import { useNavigate } from 'react-router-dom'
import AllEmployees from '../../Other/AllEmployees'
import { AuthContext } from '../../context/Authprovider'
import RejectTaskList from '../../Other/RejectTaskList'
import EmployeeTasklistNo from '../../Other/EmployeeTasklistNo'

const AdminDashboard = (props) => {

  const navigate = useNavigate();
  const [allData] = useContext(AuthContext);

  function setShowForm() {
    navigate('/add-employee');
  }

  return (
    <>
      <Header changeUser={props.changeUser} data={props.data}/>
      <EmployeeTasklistNo data={props.data}/>
      <CreatNewTask/>
      <div className='flex justify-between sm:ml-10 ml-5 sm:mt-15 mt-5 sm:mb-0 mb-5'>
        <h2 className='sm:text-4xl text-2xl font-bold'>All Employee List</h2>
        <button className='justify-self-end sm:mr-10 mr-3 bg-emerald-600 text-white sm:px-4 sm:py-2 px-2 py-2 rounded-lg cursor-pointer' onClick={() => setShowForm()}>Add New Employee</button>
      </div>

      <div id="taskCard" className='flex justify-start items-center gap-3 overflow-x-auto sm:h-110 h-90 w-full p-2.5 sm:p-10 mt-8'>
        {allData.employees.map((elem, idx) => {
          return <AllEmployees key={idx} employee={elem} />;
        })}
      </div>

      <h2 className='sm:text-4xl sm:ml-10 ml-4 mt-7 text-2xl font-bold'>Employee Performance</h2>

      <div className='h-100 w-full sm:p-10 mt-2'>
        <div className='h-full w-full bg-gray-900 rounded-xl sm:p-4 p-2 overflow-hidden'>
          <AllTask/>
        </div>
      </div>

      <h2 className='sm:text-4xl sm:ml-10 ml-4 mt-7 text-2xl font-bold'>Rejected Tasks</h2>

      <div className='h-100 w-full sm:p-10 mt-2'>
        <div className='h-full w-full bg-gray-900 rounded-xl sm:p-4 p-2 overflow-hidden'>
          <RejectTaskList/>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
