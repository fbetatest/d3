
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {

 
  TablesWidget14,
 
  CardsWidget20,

} from '../../../_metronic/partials/widgets'
import {FC} from 'react'

const ProjectsPage: FC = () => (
    <>
      {/* begin::Row */}
      <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
        {/* begin::Col */}
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-5'>
          <CardsWidget20
            className=''
            description='Active Projects'
            color='#a17e01'
            stats="12"
            img={toAbsoluteUrl('/media/patterns/vector-3.png')}
          />
       
        </div>
        {/* end::Col */}
  
        {/* begin::Col */}
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-5'>
        <CardsWidget20
            className=''
            stats="36"
            description='Completed Projects'
            color='rgb(2 50 62)'
            img={toAbsoluteUrl('/media/patterns/vector-3.png')}
          />
          
        </div>
        {/* end::Col */}
  
     
      </div>
      {/* end::Row */}
  
      <div className='row g-5 gx-xxl-12'>
      
      <div className='col-xxl-12'>
        <TablesWidget14 className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
    </div>
    </>
  )
                  
const ProjectsWrapper: FC = () => {
   
    return (
      <>
      <PageTitle breadcrumbs={[]}>Projects</PageTitle>
       <ProjectsPage />
      </>
    )
  }
  
  export  {ProjectsWrapper}

