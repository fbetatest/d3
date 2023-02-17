
import {PageTitle} from '../../../_metronic/layout/core'
import {


  TablesWidget15,
 


} from '../../../_metronic/partials/widgets'
import {FC} from 'react'

const InterviewsPage: FC = () => (
    <>
      {/* begin::Row */}
      
      {/* end::Row */}
  
      <div className='row g-5 gx-xxl-12'>
      
      <div className='col-xxl-12'>
        <TablesWidget15 className='card-xxl-stretch mb-5 mb-xxl-8' />
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

