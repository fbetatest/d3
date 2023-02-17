
import {PageTitle} from '../../../_metronic/layout/core'
import {ChecklistsView} from './checklistsView'
import {FC} from 'react'



const ChecklistsPage: FC = () => (
    <>
      {/* begin::Row */}
      <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
    
     
      </div>
      {/* end::Row */}
  
      <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        <ChecklistsView />
      
        </div>
       
      
    </div>
    </>
  )
                  
const ChecklistsWrapper: FC = () => {


   
    return (
      <>
      
      <PageTitle breadcrumbs={[]}>Checklist</PageTitle>
       <ChecklistsPage />
      </>
    )
  }
  
  export  {ChecklistsWrapper}

