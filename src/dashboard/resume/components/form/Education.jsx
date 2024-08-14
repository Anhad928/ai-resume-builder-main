import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Education() {
    const [educationalList, setEducationalList] = useState([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        resumeInfo?.Education.length>0&&setEducationalList(resumeInfo?.Education)
        
    },[])

    const handleChange = (index, event) => {
        const newEnteries=educationalList.slice();
        const {name,value}=event.target;
        newEnteries[index][name]=value;
        // console.log(newEnteries)
        setEducationalList(newEnteries);
    };

    const AddNewEducation = () => {
        setEducationalList([...educationalList, {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }]);
    };

    const RemoveEducation = () => {
        setEducationalList(educationalList.slice(0, -1));
    };

    // useEffect(()=>{
    //     setResumeInfo({
    //         ...resumeInfo,
    //         education:educationalList
    //     })
    //     console.log(educationalList)
    // },[educationalList])

    useEffect(() => {
        setResumeInfo(prev => ({
            ...prev,
            Education: educationalList
        }));
    }, [educationalList, setResumeInfo]);

    const onSave = () => {
        setLoading(true)
        const data={
            data:{
                Education:educationalList?.map(({ id, ...rest }) => rest)
            }
        }

         console.log(educationalList)
        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(res=>{
            console.log(res);
            setLoading(false);
            toast('Details updated !')
        },(error)=>{
            setLoading(false);
        })
    };

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add your Educational Details</p>
            <div>
                {educationalList.map((item, index) => (
                    <div key={index}>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div className='col-span-2'>
                                <label className='text-xs'>University Name</label>
                                <Input name="universityName" onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.universityName} />
                            </div>
                            <div>
                                <label className='text-xs'>Degree</label>
                                <Input name="degree" onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.degree} />
                            </div>
                            <div>
                                <label className='text-xs'>Major</label>
                                <Input name="major" onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.major} />
                            </div>
                            <div>
                                <label className='text-xs'>Start Date</label>
                                <Input type="date" name="startDate" onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.startDate} />
                            </div>
                            <div>
                                <label className='text-xs'>End Date</label>
                                <Input type="date" name="endDate" onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.endDate} />
                            </div>
                            <div className='col-span-2'>
                                <label className='text-xs'>Description</label>
                                <Input name="description" onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.description} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" className="text-primary" onClick={AddNewEducation}> + Add more Education </Button>
                    <Button variant="outline" className="text-primary" onClick={RemoveEducation}> - Remove </ Button>
                </div>
                
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    </div>
    );
}

export default Education;