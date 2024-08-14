import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModel';

const prompt="Job Title: {jobTitle} , Depends on job title give me list of  summary for 3 levels, 1.Fresher Level, 2.Mid Level and 3.Experienced Level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"
function Summery({enabledNext}) {
    const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext);
    const [summery, setSummery]=useState();
    const [loading, setLoading]=useState(false);
    const params=useParams();
    const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState();
    useEffect(()=>{
        summery&&setResumeInfo({
            ...resumeInfo,
            summery:summery
        })
    },[summery])

    const GenerateSummaryFromAI=async()=>{
        setLoading(true);
        const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
        console.log(PROMPT);
        const result=await AIChatSession.sendMessage(PROMPT);
        console.log(JSON.parse(result.response.text()));
        setAiGenerateSummeryList(JSON.parse(result.response.text()))
        setLoading(false);
    }


    const onSave=(e)=>{
        e.preventDefault();
        setLoading(true)
        const data={
            summery:summery
        }
        GlobalApi.UpdateResumeDetail1(params?.resumeId,data).then(resp=>{
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            console.log("updated")
            toast("Details updated")
        },(error)=>{
            setLoading(false);
        })
    }
  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summary/ Professional Summary</h2>
        <p>Add Summary/ Professional Summary for your Job Title </p>
        

        <form className='mt-7' onSubmit={onSave}>
            <div className='flex justify-between items-end'>
                <label>Add Summary</label>
                <Button variant="outline" onClick={()=>GenerateSummaryFromAI()}
                type="button" size="sm" className="border-primary text-primary flex gap-2">
                    <Brain className='h-4 w-4'/>Generate from AI</Button>
            </div>
            <Textarea className="mt-5" value ={summery}required
            defaultValue={summery?summery:resumeInfo?.summery}
            onChange={(e)=>setSummery(e.target.value)}/>
            <div className='mt-2 flex justify-end'>
            <Button type="submit"
                disabled={loading}>
                    {loading?<LoaderCircle className='animate-spin' />:'Save'}
                    </Button>
            </div>
            </form>
        </div>

        {aiGeneratedSummeryList&& <div className='my-5'>
            <h2 className='font-bold text-lg'>Suggestions</h2>
            {aiGeneratedSummeryList?.map((item,index)=>(
                <div key={index} 
                onClick={()=>setSummery(item?.summary)}
                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                    <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                    <p>{item?.summary}</p>
                    {/* <p>{item?.yo}</p> */}
                </div>
            ))}
        </div>}
    </div>
  )
}

export default Summery