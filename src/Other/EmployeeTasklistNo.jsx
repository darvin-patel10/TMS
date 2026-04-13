import { React, useContext, useEffect ,useState } from 'react'
import { AuthContext } from '../context/Authprovider';

const EmployeeTasklistNo = () => {
    const [allData] = useContext(AuthContext);

    const [rejectCount, setRejectCount] = useState(0);
    const [failedCount, setFailedCount] = useState(0);

    const totalRejected = allData.employees.reduce((total, emp) => total + emp.taskCounts.reject, 0);
    const totalFailed = allData.employees.reduce((total, emp) => total + emp.taskCounts.failed, 0);

    useEffect(() => {
        setRejectCount(totalRejected);
        setFailedCount(totalFailed);
    }, [totalRejected, totalFailed]);


  return (
    <div className='flex justify-center items-center flex-wrap gap-5 h-fit w-full mb-5 p-5'>
        <div className='h-18 w-30 sm:h-30 sm:w-75 items-center bg-gray-400 rounded-2xl p-4 '>
            <h3 className='text-black sm:text-4xl font-extrabold text-lg'>{allData?.total?.totalRejected}</h3>
            <h3 className='text-black sm:text-2xl font-bold text-base'>Rejected</h3>
        </div>
        
        <div className='h-18 w-30 sm:h-30 sm:w-75 items-center bg-red-300 rounded-2xl p-4'>
            <h3 className='text-black sm:text-4xl font-extrabold text-lg'>{allData?.total?.totalFailed}</h3>
            <h3 className='text-black sm:text-2xl font-bold text-base'>Failed</h3>
        </div>
    </div>
  )
}

export default EmployeeTasklistNo
