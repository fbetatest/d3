
import {PageTitle} from '../../../_metronic/layout/core'
import {

  


} from '../../../_metronic/partials/widgets'
import {FC} from 'react'

const JourneyTimePage: FC = () => (
    <>
      {/* begin::Row */}
    
      {/* end::Row */}
  
      <div className='row g-5 gx-xxl-12'>
      
      <div className='col-xxl-12'>
      Under Construction
      </div>
    </div>
    </>
  )
                  
const JourneyTimeWrapper: FC = () => {
   
    return (
      <>
      <PageTitle breadcrumbs={[]}>Journey Time</PageTitle>
       <JourneyTimePage />
      </>
    )
  }
  
  export  {JourneyTimeWrapper}

