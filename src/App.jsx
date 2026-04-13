import { useContext, useEffect, useState } from 'react'
import './App.css'
import Login from './components/Auth/Login'
import { AuthContext } from './context/Authprovider'
import EmployeeDashboard from './components/Dashboard/employeeDashboard'
import { useNavigate, Route, Routes } from 'react-router-dom'
import AddNewEmployee from './components/pages/AddNewEmployee'
import AdminDashboard from './components/Dashboard/adminDashboard'
import EditEmployee from './components/pages/EditEmployee'

function App() {

  const navigate = useNavigate(); 
  const [user,setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null); 
  const [allData] = useContext(AuthContext);

  useEffect(()=>{
    // console.log("Enter in UseEffect");
    if (!allData) return;
    
    const loggedInUser = localStorage.getItem("loggedInUser");

    if(loggedInUser){
      const userData =JSON.parse(loggedInUser);
      setUser(userData.role);
      setLoggedInUserData(userData.data);

      if (userData.role === 'admin') navigate('/admin-dashboard');
    if (userData.role === 'employee') navigate('/employee-dashboard');
    }
    
  }, [allData]);

  const handleLogin = (email , password)=>{
    if(allData.admin.find((e) => email === e.email && password === e.password)){
      const admin = allData.admin.find((e)=>email == e.email && password == e.password);
      if (admin) {
        setUser('admin');
        setLoggedInUserData(admin);
        localStorage.setItem('loggedInUser', JSON.stringify({role:'admin',data:admin}));
        navigate('/admin-dashboard');
      }
    }
    else if(allData.employees.find((e) => email === e.email && password === e.password)){
      const employee = allData.employees.find((e)=>email == e.email && password == e.password);
      if(employee){
        setUser('employee');
        setLoggedInUserData(employee);
        localStorage.setItem('loggedInUser', JSON.stringify({role:'employee',data:employee}));
        navigate('/employee-dashboard');
      }
    }
    else{
      alert("Invalid Email Or password");
    }
  }

  return (
    <Routes>
      <Route path="/" element={!user ? <Login handleLogin={handleLogin}/> : ''} />
      <Route path="/admin-dashboard" element={user === 'admin' ? <AdminDashboard changeUser={setUser} data={loggedInUserData}/> : <Login handleLogin={handleLogin}/>} />
      <Route path="/employee-dashboard" element={user === 'employee' ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData}/> : <Login handleLogin={handleLogin}/>} />
      <Route path="/add-employee" element={user === 'admin' ?<AddNewEmployee/> : <Login handleLogin={handleLogin}/>} />
      <Route path="/edit-employee" element={user === 'admin' ? <EditEmployee/> : <Login handleLogin={handleLogin}/>} />
      <Route path="*" element={<Login handleLogin={handleLogin}/>} />
    </Routes>
  )
}

export default App
