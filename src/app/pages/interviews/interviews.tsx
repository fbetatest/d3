
import {PageTitle} from '../../../_metronic/layout/core'
import {InterviewsView} from './interviewsView'
import {FC} from 'react'

const InterviewsPage: FC = () => (
    <>
      {/* begin::Row */}
      
      {/* end::Row */}
  
      <div className='row g-5 gx-xxl-12'>
      
      <div className='col-xxl-12'>
      <InterviewsView />
      </div>
    </div>
    </>
  )
                  
const InterviewsWrapper: FC = () => {
   
    return (
      <>
      <PageTitle breadcrumbs={[]}>Interview</PageTitle>
       <InterviewsPage />
      </>
    )
  }
  
  export  {InterviewsWrapper}

