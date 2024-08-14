import React, { useEffect } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {

  const {user}=useUser();
  const [resumeList, setResumeList]=React.useState([]);
  useEffect(() => {
    user&&GetResumesList();
  },[user])



  /**
   * USed to get user resumes list
   */
  const GetResumesList=()=>{
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
    .then(resp=>{
       console.log("resp dats"+resp.data);
       setResumeList(resp.data.data);
    })
  }
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI Resume for your next Dream Job Role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <AddResume/>
        {resumeList.length>0&&resumeList.map((resume,index)=>(

          <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList}/>
        ))}
      </div>
    </div>
  )
}

export default Dashboard