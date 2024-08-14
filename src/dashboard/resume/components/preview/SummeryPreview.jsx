import React from 'react'

function SummeryPreview({resumeInfo}) {
  return (
    <p className='text-s'>
        {resumeInfo?.summery}
    </p>
  )
}

export default SummeryPreview