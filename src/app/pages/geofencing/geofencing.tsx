
import {PageTitle} from '../../../_metronic/layout/core'

import {FC} from 'react'

const GeofencingPage: FC = () => (
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
                  
const GeofencingWrapper: FC = () => {
   
    return (
      <>
      <PageTitle breadcrumbs={[]}>Geofencing</PageTitle>
       <GeofencingPage />
      </>
    )
  }
  
  export  {GeofencingWrapper}

