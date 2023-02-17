
import {PageTitle} from '../../../_metronic/layout/core'

import {FC} from 'react'

const CoordinatesPage: FC = () => (
    <>
   
      {/* end::Row */}
  
      <div className='row g-5 gx-xxl-12'>
      
      <div className='col-xxl-12'>
      Under Construction
      </div>
    </div>
    </>
  )
                  
const CoordinatesWrapper: FC = () => {
   
    return (
      <>
      <PageTitle breadcrumbs={[]}>Co-ordinates</PageTitle>
       <CoordinatesPage />
      </>
    )
  }
  
  export  {CoordinatesWrapper}

