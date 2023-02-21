
import {PageTitle} from '../../../_metronic/layout/core'
import {CoordinatessView} from './coordinatesViews'
import {FC} from 'react'



const CoordinatessPage: FC = () => (
    <>
      {/* begin::Row */}
      <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
    
     
      </div>
      {/* end::Row */}
  
      <div className='row g-5 gx-xxl-12'>
      <div className='col-xxl-12'>
        <CoordinatessView />
      
        </div>
       
      
    </div>
    </>
  )
                  
const CoordinatesWrapper: FC = () => {


   
    return (
      <>
      
      <PageTitle breadcrumbs={[]}>Coordinates</PageTitle>
       <CoordinatessPage />
      </>
    )
  }
  
  export  {CoordinatesWrapper}

