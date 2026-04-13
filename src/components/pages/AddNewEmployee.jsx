import React from 'react'
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/Authprovider';
import { useNavigate } from 'react-router-dom';
const AddNewEmployee = () => {

  const navigate = useNavigate();
  const [allData,setUserdata] = useContext(AuthContext);

  const [firstName,setFirstname] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');

  const formHandel = (e) => {
    e.preventDefault();

    if (!firstName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const employeeExists = allData.employees.some((elem) => email === elem.email);

    if (employeeExists) {
      alert("Employee with this email already exists");
      return;
    }

    const data = allData.employees;      
    
    const newEmployee = {
      id: data.length + 1,
      firstName,
      email,
      password,
      taskCounts: {
        active: 0,
        newTask: 0,
        completed: 0,
        failed: 0
      },
      tasks: []
    };

    data.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(data));
    setUserdata({ ...allData, employees: data });
    alert("Employee Added Successfully");
  }

  function cancelHandel(){
    setFirstname('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    navigate('/admin-dashboard');
  }

  return (
    <div className='h-screen w-screen flex items-center justify-center'>
        <form onSubmit={formHandel} className='h-150 w-150 p-6 bg-gray-900 rounded-lg flex flex-col items-start justify-center gap-5'>
            <h2 className='text-2xl mb-5 font-bold text-white'>Add New Employee</h2>

            <div className='taxt-base font-semibold '>Name</div>
            <input type="text" value={firstName} onChange={(e) => setFirstname(e.target.value)} placeholder='Name' className='w-full h-5 text-gray-50 text-lg border-2 border-gray-300 p-4 rounded-sm' />

            <div className='taxt-base font-semibold '>Email</div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='w-full h-5 text-gray-50 text-lg border-2 border-gray-300 p-4 rounded-sm' />

            <div className='taxt-base font-semibold '>Password</div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='w-full h-5 text-gray-50 text-lg border-2 border-gray-300 p-4 rounded-sm' />

            <div className='taxt-base font-semibold '>Confirm Password</div>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' className='w-full h-5 text-gray-50 text-lg border-2 border-gray-300 p-4 rounded-sm' />
            <div className='flex justify-end w-full gap-3 mt-5'>
              <button type='submit' className='justify-self-end bg-emerald-600 text-white sm:px-4 sm:py-2 px-2 py-2 rounded-lg cursor-pointer'>Add Employee</button>
              <button type='button' onClick={cancelHandel} className='justify-self-end bg-gray-500 text-white sm:px-4 sm:py-2 px-2 py-2 rounded-lg cursor-pointer'>Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default AddNewEmployee
