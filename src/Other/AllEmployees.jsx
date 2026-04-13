import {React , useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Authprovider';

const AllEmployees = ({employee}) => {

    const navigate = useNavigate();

    const [allData, setUserdata] = useContext(AuthContext);

    function editEmployee() {
        navigate('/edit-employee', { state: { employee } });
    }

    function deleteEmployee() {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${employee.firstName}?`);
        if (confirmDelete) {
            const updatedEmployees = allData.employees.filter((emp) => emp.email !== employee.email);
            const newData = {
                ...allData,
                employees: updatedEmployees
            };
            setUserdata( newData );
            localStorage.setItem('employees', JSON.stringify(updatedEmployees));
            alert("Employee Deleted Successfully");
        }
    }


  return (
    <div className='h-[98%] w-80 sm:w-90 bg-blue-600 rounded-2xl shrink-0'>
        <div className='h-[20%] w-full flex justify-between items-center space-between p-4'>
            <div className='h-8 w-fit px-2.5 py-0.7 bg-blue-400 rounded-md'>Employee</div>
        </div>
        
        <div className='p-5 h-[60%]'>
            <h2 className='text-3xl font-bold mb-5'>{employee?.firstName}</h2>
            <p className='text-lg h-fit'>{employee?.email}</p>
        </div>

        <div className='flex justify-center gap-3'>
            <button className='h-13 w-35 bg-green-400 rounded-md cursor-pointer font-bold' onClick={editEmployee} >Edit</button>
            <button className='h-13 w-35 bg-red-400 rounded-md cursor-pointer font-bold' onClick={deleteEmployee} >Delete </button>
        </div>
    </div> 
  )
}

export default AllEmployees
