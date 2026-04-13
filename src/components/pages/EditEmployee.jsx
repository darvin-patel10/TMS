import {React ,useContext, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/Authprovider';

const EditEmployee = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { employee } = location.state || {};

    const [allData,setUserdata] = useContext(AuthContext);
    
        const [firstName, setFirstname] = useState(employee?.firstName || '');
        const [email, setEmail] = useState(employee?.email || '');
        const [password, setPassword] = useState(employee?.password || '');
        const [confirmPassword, setConfirmPassword] = useState(employee?.password || '');

      const formHandel = (e) => {
        e.preventDefault();
        if (allData.employees.some((elem) => email === elem.email && email !== employee.email)) {
          alert("Email already exists");
          return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const updatedEmployees = allData.employees.map((emp) => {
          if (emp.email === employee.email) {
            return {
              ...emp,
              firstName: firstName,
              email: email,
              password: password
            };
          }
          return emp;
        });

        const adminPassword = prompt("Enter Admin Password to Update Employee");

        if(allData.admin[0].password === adminPassword){
            
            setUserdata((prevData) => ({
            ...prevData,
            employees: updatedEmployees
            }));

            localStorage.setItem('employees', JSON.stringify(updatedEmployees));
            alert("Employee Updated Successfully");
            navigate('/admin-dashboard');
        }
        else{
            alert("Incorrect Admin Password. Employee update failed.");
        }
    };

    function cancelHandel() {
        navigate('/admin-dashboard');
    }

  return (

    <div className='h-screen w-screen flex items-center justify-center'>
        <form onSubmit={formHandel} className='h-150 w-150 p-6 bg-gray-900 rounded-lg flex flex-col items-start justify-center gap-5'>
            <h2 className='text-2xl mb-5 font-bold text-white'>Edit Employee</h2>

            <div className='taxt-base font-semibold '>Name</div>
            <input type="text" value={firstName} onChange={(e) => setFirstname(e.target.value)} placeholder='Name' className='w-full h-5 text-gray-50 text-lg border-2 border-gray-300 p-4 rounded-sm' />

            <div className='taxt-base font-semibold '>Email</div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='w-full h-5 text-gray-50 text-lg border-2 border-gray-300 p-4 rounded-sm' />

            <div className='taxt-base font-semibold '>Password</div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='w-full h-5 text-gray-50 text-lg border-2 border-gray-300 p-4 rounded-sm' />

            <div className='taxt-base font-semibold '>Confirm Password</div>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' className='w-full h-5 text-gray-50 text-lg border-2 border-gray-300 p-4 rounded-sm' />
            <div className='flex justify-end w-full gap-3 mt-5'>
                <button type='submit' className='justify-self-end bg-emerald-600 text-white sm:px-4 sm:py-2 px-2 py-2 rounded-lg cursor-pointer'>Upadate</button>
                <button type='button' onClick={cancelHandel} className='justify-self-end bg-gray-500 text-white sm:px-4 sm:py-2 px-2 py-2 rounded-lg cursor-pointer'>Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default EditEmployee
