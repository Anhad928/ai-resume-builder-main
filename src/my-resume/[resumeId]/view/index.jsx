import Header from '@/components/custom/Header';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../service/GlobalApi';
import { RWebShare } from 'react-web-share';

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { resumeId } = useParams();

    useEffect(() => {
        GetResumeInfo();
    }, [resumeId]);

    const GetResumeInfo = async () => {
        try {
            const resp = await GlobalApi.GetResumeById(resumeId);
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        } catch (err) {
            console.error("Failed to fetch resume information:", err);
            setError('Failed to load resume data');
        } finally {
            setLoading(false);
        }
    };

    const HandleDownload = () => {
        window.print();
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print">
                <Header />
                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-2xl font-medium'>
                        Congrats! Your Ultimate AI-generated Resume is ready!
                    </h2>
                    <p className='text-center text-gray-400'>
                        Now you are ready to download your resume, and you can share the unique resume URL with your friends and family.
                    </p>
                    <div className='flex justify-between px-44 my-10'>
                        <Button onClick={HandleDownload}>Download</Button>
                        <RWebShare
                            data={{
                                text: "Hello Everyone, This is my resume. Please open the URL to see it.",
                                url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`,
                                title: `${resumeInfo?.firstName} ${resumeInfo?.lastName}'s resume`,
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <Button>Share</Button>
                        </RWebShare>
                    </div>
                </div>
            </div>
            <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <div id="print-area">
                    <ResumePreview />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default ViewResume;
