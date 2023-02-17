
import {PageTitle} from '../../../_metronic/layout/core'

import {FC} from 'react'

const TicketsraisedPage: FC = () => (
    <>
   
      {/* end::Row */}
  
      <div className='row g-5 gx-xxl-12'>
      
      <div className='col-xxl-12'>
        Under Construction
      </div>
    </div>
    </>
  )
                  
const TicketsraisedWrapper: FC = () => {
   
    return (
      <>
      <PageTitle breadcrumbs={[]}>Tickets Raised</PageTitle>
       <TicketsraisedPage />
      </>
    )
  }
  
  export  {TicketsraisedWrapper}

