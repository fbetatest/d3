import {PageTitle} from '../../../_metronic/layout/core'
import {ChartsWidget1, TablesWidget11} from '../../../_metronic/partials/widgets'
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../../_metronic/helpers'
import {useState, useEffect} from 'react'
import {getAllChecklist} from '../checklists/_requests'
import {getAllInterview} from '../interviews/_requests'

const ReportPage: FC = () => {
  const [checklistData, setChecklistData] = useState([
    {id: 0, checklistName: 'Loading..', projectName: '', created: 0},
  ])

  const [interviewData, setInterviewData] = useState([
    {id: 0, interviewName: 'Loading..', projectName: '', created: 0},
  ])

  useEffect(() => {
    getAllChecklist().then((val) => {
      const {data} = val
      console.log(data)
      setChecklistData(data)
    })

    getAllInterview().then((val) => {
      const {data} = val
      console.log(data)
      setInterviewData(data)
    })
  }, [])

  return (
    <>
      <div className='row g-5 gx-xxl-12'>
        <div className='col-xxl-12'>
          <div className='card card-xxl-stretch mb-5 mb-xxl-8'>
            <div className='card-header border-0 pt-5'>
              <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bold fs-3 mb-1'>Checklists</span>
              </h3>
              <div className='card-toolbar'></div>
            </div>
            <div className='card-body py-3'>
              {/* begin::Table container */}
              <div className='table-responsive'>
                {/* begin::Table */}
                <table className='table align-middle gs-0 gy-4'>
                  {/* begin::Table head */}
                  <thead>
                    <tr className='fw-bold text-muted bg-light'>
                      <th className='ps-4 rounded-start'>No.</th>
                      <th className=''>Name</th>
                      <th className=''>Project</th>
                      <th className=''>Created On</th>

                      <th className='min-w-20px text-end rounded-end'></th>
                    </tr>
                  </thead>
                  {/* end::Table head */}
                  {/* begin::Table body */}

                  <tbody>
                    {checklistData.map((val, id) => {
                      return (
                        <tr key={id}>
                          <td>
                            <div className='ps-4'>{id + 1}</div>
                          </td>
                          <td>
                            <div className='d-flex align-items-center'>
                              <div className='d-flex justify-content-start flex-column'>
                                <Link
                                  to={'../checklist-report/' + val.created}
                                  className='text-dark fw-bold text-hover-primary mb-1 fs-6'
                                >
                                  {val.checklistName}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className='badge badge-light-primary fs-7 fw-semibold'>
                              {' '}
                              {val.projectName}
                            </span>
                          </td>

                          <td>
                            <a
                              href='#'
                              className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'
                            >
                              {val.created ? new Date(val.created).toDateString() : ' '}
                            </a>
                          </td>

                          <td className='text-end'>
                            <Link
                              to={'../checklist-report/' + val.created}
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                            >
                              <KTSVG
                                path='/media/icons/duotune/general/gen057.svg'
                                className='svg-icon-3'
                              />
                            </Link>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                  {/* end::Table body */}
                </table>
                {/* end::Table */}
              </div>
              {/* end::Table container */}
            </div>
          </div>
        </div>
      </div>

      <div className='row g-5 gx-xxl-12'>
        <div className='col-xxl-12'>
          <div className='card card-xxl-stretch mb-5 mb-xxl-8'>
            <div className='card-header border-0 pt-5'>
              <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bold fs-3 mb-1'>Interviews</span>
              </h3>
              <div className='card-toolbar'></div>
            </div>
            <div className='card-body py-3'>
              {/* begin::Table container */}
              <div className='table-responsive'>
                {/* begin::Table */}
                <table className='table align-middle gs-0 gy-4'>
                  {/* begin::Table head */}
                  <thead>
                    <tr className='fw-bold text-muted bg-light'>
                      <th className='ps-4 rounded-start'>No.</th>
                      <th className=''>Name</th>
                      <th className=''>Project</th>
                      <th className=''>Created On</th>

                      <th className='min-w-20px text-end rounded-end'></th>
                    </tr>
                  </thead>
                  {/* end::Table head */}
                  {/* begin::Table body */}

                  <tbody>
                    {interviewData.map((val, id) => {
                      return (
                        <tr key={id}>
                          <td>
                            <div className='ps-4'>{id + 1}</div>
                          </td>
                          <td>
                            <div className='d-flex align-items-center'>
                              <div className='d-flex justify-content-start flex-column'>
                                <Link
                                  to={'../interview-report/' + val.created}
                                  className='text-dark fw-bold text-hover-primary mb-1 fs-6'
                                >
                                  {val.interviewName}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className='badge badge-light-primary fs-7 fw-semibold'>
                              {' '}
                              {val.projectName}
                            </span>
                          </td>

                          <td>
                            <a
                              href='#'
                              className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'
                            >
                              {val.created ? new Date(val.created).toDateString() : ' '}
                            </a>
                          </td>

                          <td className='text-end'>
                            <Link
                              to={'../interview-report/' + val.created}
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                            >
                              <KTSVG
                                path='/media/icons/duotune/general/gen057.svg'
                                className='svg-icon-3'
                              />
                            </Link>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                  {/* end::Table body */}
                </table>
                {/* end::Table */}
              </div>
              {/* end::Table container */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const ReportWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Reports</PageTitle>
      <ReportPage />
    </>
  )
}

export {ReportWrapper}

/*

 <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
       
        <ChartsWidget1 className='mb-5 mb-xxl-8' />
 
  
     
      </div>

  */
