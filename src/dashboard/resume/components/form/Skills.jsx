import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'

function Skills() {
    const [skillsList,setSkillsList]=useState([{
        name:'',
        rating:0
    }])
    const {resumeId}=useParams();
    const [loading,setLoading]=useState(false); 
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    useEffect(()=>{
        resumeInfo&&setSkillsList(resumeInfo?.skills)
      },[])
    const handleChange=(index,name,value)=>{
        const newEnteries=skillsList.slice();

        newEnteries[index][name]=value;
        console.log(newEnteries)
        setSkillsList(newEnteries);
    }
    const AddNewSkills=()=>{
        setSkillsList([...skillsList,{
            name:'',
            rating:0

        }])

    }
    const RemoveSkills=()=>{
        setSkillsList(skillsList=>skillsList.slice(0,-1))

    }

    const onSave=()=>{
        setLoading(true);
        const data={
            data:{
                skills:skillsList.map(({ id, ...rest}) => rest)
            }
        }

        GlobalApi.UpdateResumeDetail(resumeId,data)
        .then(resp=>{
            console.log(resp);
            setLoading(false)
            toast("Skills Updated")
        },(error)=>{

            setLoading(false);
            toast("server error try again")
        })

    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            skills:skillsList
        })

    },[skillsList])
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Skills</h2>
        <p>Add your top Professional Key Skills</p>

        <div>
            {skillsList?.map((item,index)=>(
                <div className="flex justify-between mb-2 border rounded-lg p-3 ">
                    <div>
                        <label className='text-s'>Name</label>
                        <Input className="w-full" onChange={(e)=>handleChange(index, 'name',e.target.value)}
                        defaultValue={item?.name}/>
                    </div>
                    <Rating style={{ maxWidth: 120 }} value={item.rating} 
                    onChange={(v)=>handleChange(index,'rating',v)} />
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" className="text-primary" onClick={AddNewSkills}> + Add more Skills </Button>
            <Button variant="outline" className="text-primary" onClick={RemoveSkills}> - Remove </Button>
            </div>
            
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
    </div>
  )
}

export default Skills