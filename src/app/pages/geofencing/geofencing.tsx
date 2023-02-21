
import {PageTitle} from '../../../_metronic/layout/core'
import {GeofencingsView} from './geofencingsView'
import {FC} from 'react'



const GeofencingsPage: FC = () => (
    <>
      {/* begin::Row */}
      <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
    
     
      </div>
      {/* end::Row */}
  
      <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        <GeofencingsView />
      
        </div>
       
      
    </div>
    </>
  )
                  
const GeofencingsWrapper: FC = () => {


   
    return (
      <>
      
      <PageTitle breadcrumbs={[]}>Geofencing</PageTitle>
       <GeofencingsPage />
      </>
    )
  }
  
  export  {GeofencingsWrapper}

