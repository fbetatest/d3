/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {Link} from 'react-router-dom'

import {getProjects} from './_requests'

import {KTSVG} from '../../../_metronic/helpers'
import {

  CardsWidget20,

} from '../../../_metronic/partials/widgets'
import { deleteProject } from '../projects/core/_requests'

const DashboardPage: FC = () => {

  const [projectsData, setProjectsData] = useState([
    {vid: 0,  projectName: 'Loading..', created: 0,  projectDescription: '', surveyors: [], tasks: []},
  ])

  useEffect(() => {
    console.log("useEffect")
    getProjects().then(val => {
      const {data} = val;
      setProjectsData(data);
      console.log(projectsData);
      
    }
    )
  }, [setProjectsData]);




return(<>
   

    <div className='row g-5 gx-xxl-12'>
    
      
        <div className='card card-xxl-stretch mb-5 mb-xxl-8'>


        <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Projects</span>
        </h3>
        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
  
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
          </button>
      
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        <div className='tab-content'>
          {/* begin::Tap pane */}
          <div className='tab-pane fade show active' id='kt_table_widget_5_tab_1'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4'>
                {/* begin::Table head */}
                <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='ps-4 rounded-start '>No.</th>
                <th className=''>Project Name</th>
                <th className=''>Description</th>
                <th className=''>Surveyors</th>
                <th className=''>Tasks</th>
                <th className=''>Created On</th>
        
                <th className='min-w-50px text-end rounded-end'></th>
              </tr>
            </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>


                {projectsData.map((val, id) => {
                return (
                  <tr key={id}>
                    <td>
                      <div className='ps-4'>{id + 1}</div>
                    </td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='d-flex justify-content-start flex-column'>
                          <Link
                            to={'../project/' + val.created}
                            className='text-dark fw-bold text-hover-primary mb-1 fs-6'
                          >
                            {val.projectName}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='fs-7 fw-semibold'>
                        {' '}
                        {val.projectDescription}
                      </span>
                    </td>
                    <td>
                      
                        {' '}
                        {val.surveyors.map((v, id) => {
                          return <span className='badge badge-light-success fs-7 fw-semibold me-2 mt-1' key={id}>
                            {v}
                            </span>
                        })
                        }
                      
                    </td>
                    <td>
                      
                      {' '}
                      {val.tasks.map((v, id) => {
                        return <span className='badge badge-light-warning fs-7 fw-semibold me-2 mt-1' key={id}>
                          {v}
                          </span>
                      })
                      }
                    
                  </td>

                    <td>
                      <a
                        href='#'
                        className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'
                      >
                        <span className='  fs-7 fw-semibold '>
                        {val.created ? new Date(val.created).toDateString() : ' '}
                        </span>
                      </a>
                    </td>

                    <td className='text-end'>
                      
                      <button
                     onClick = { () => {deleteProject(val.vid); setProjectsData(projectsData.filter(item => item.vid !== val.vid))} }
                  
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen027.svg'
                          className='svg-icon-3'
                        />
                      </button>
                    </td>
                  </tr>
                )
              })}

                
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
            {/* end::Table */}
          </div>
          {/* end::Tap pane */}

        </div>
      
     
    
      </div>
    </div>
    </div>
  </>

)
}
const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}


/*


 <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>

 <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-5'>
   <CardsWidget20
     className=''
     description='Active Projects'
     color='#a17e01'
     stats="12"
     img={toAbsoluteUrl('/media/patterns/vector-3.png')}
   />

 </div>



 <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-5'>
 <CardsWidget20
     className=''
     stats="7"
     description='Surveyors'
     color='rgb(2 50 62)'
     img={toAbsoluteUrl('/media/patterns/vector-3.png')}
   />
   
 </div>



</div>


*/