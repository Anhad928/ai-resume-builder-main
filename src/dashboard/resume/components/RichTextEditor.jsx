import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../../service/AIModel';
import { toast } from 'sonner';
const PROMPT=`position titile: {positionTitle} , give me description of your work in 3-4 bullet points in one array and in array format. Sample format:-[
  "Managed accounts payable and receivable, ensuring timely and accurate processing of invoices and payments.",
  "Prepared and analyzed financial statements, including balance sheets, income statements, and cash flow statements.",
  "Developed and maintained financial records and reports, providing insights into the company's financial performance.",
  "Collaborated with other departments to ensure accurate financial data and support business decisions."
]`
function RichTextEditor({onRichTextEditorChange,index,defaultValue}) {
    const [value,setValue]=useState(defaultValue);
    const{resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const [loading, setLoading]=useState(false);
    


    const GenerateSummaryFromAI=async()=>{
      setLoading(true);
      if(!resumeInfo.experience[index]?.title){
        toast("Please add title first");
        setLoading(false);
        return;
      }
        const prompt = PROMPT.replace("{positionTitle}",resumeInfo.experience[index]?.title);
        console.log(prompt);
        // const result=await AIChatSession.sendMessage(prompt);
        const result1 = await AIChatSession.sendMessage(prompt);
        console.log(result1.response.text());
        const resp=result1.response.text();
        console.log(resp);
        // const multistring = resp.join('\n');
        setValue(resp.replace(/",\s*"/g, '\n').replace(/[\[\]"]/g, '').replace(/\. /g, '.\n'));
        setLoading(false);

    }
    
  
    return (
    <div>
      <div className='flex justify-between my-2'>
        <label classname="text-xs">Summery</label>
        <Button variant="outline" size="sm" 
        onClick = {GenerateSummaryFromAI}
        className="flex gap-2 border-primary text-primary">
          {loading?
          <LoaderCircle className='animate-spins'/>:
          <>
          <Brain className='h-4 w-4'/> Generate from AI
          </> }
          
          </Button>
      </div>
    <EditorProvider>
      <Editor value={value} onChange={(e)=>{
        setValue(e.target.value);
        onRichTextEditorChange(e)
      }}>
         <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
         
         
        </Toolbar>
      </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor