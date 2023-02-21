
import {PageTitle} from '../../../_metronic/layout/core'
import {JourneytimesView} from './journeytimesViews'
import {FC} from 'react'



const JourneytimesPage: FC = () => (
    <>
      {/* begin::Row */}
      <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
    
     
      </div>
      {/* end::Row */}
  
      <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        <JourneytimesView />
      
        </div>
       
      
    </div>
    </>
  )
                  
const JourneyTimeWrapper: FC = () => {


   
    return (
      <>
      
      <PageTitle breadcrumbs={[]}>Journeytime</PageTitle>
       <JourneytimesPage />
      </>
    )
  }
  
  export  {JourneyTimeWrapper}

