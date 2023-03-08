import {useParams} from 'react-router-dom'

import {PageTitle} from '../../../../_metronic/layout/core'
import {FC} from 'react'
import {useFormik} from 'formik'
import {useState, useEffect} from 'react'
import {getProject} from '../core/_requests'
import {getChecklistByProject} from '../../checklistid/_requests'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../../../_metronic/helpers'
import {getInterviewByProject} from '../../interviewid/_requests'

import {getGeofencingByProject} from '../../geofencingid/_requests'
import { getCoordinatesByProject } from '../../coordinatesid/_requests'
const ProjectsID: FC = () => {
  const [projectsData, setProjectsData] = useState({
    vid: 0,
    projectName: 'Loading..',
    created: 0,
    projectDescription: '',
    surveyors: [],
    tasks: [],
  })

  const [checklistData, setChecklistData] = useState([
    {id: 0, checklistName: 'Loading..', projectName: '', created: 0},
  ])

  const [interviewData, setInterviewData] = useState([
    {id: 0, interviewName: 'Loading..', projectName: '', created: 0},
  ])

  const [geofencingData, setGeofencingData] = useState([
    {id: 0, geofencingName: 'Loading..', projectName: '', created: 0},
  ])

  const [coordinatesData, setCoordinatesData] = useState([
    {id: 0, coordinatesName: 'Loading..', projectName: '', created: 0},
  ])

  const [showChecklist, setShowChecklist] = useState(false)

  const [showInterview, setShowInterview] = useState(false)

  const [showGeofencing, setShowGeofencing] = useState(false)

  const [showCoordinates, setShowCoordinates] = useState(false)

  

  let {id} = useParams()
  let tempId = '0'
  if (id) tempId = id
  console.log(id)
  const vid: number = +tempId
  useEffect(() => {
    console.log('useEffect')

    getProject(vid).then((val) => {
      const {data} = val
      setProjectsData(data)
      console.log(data)
      console.log(projectsData)

      getChecklistByProject(data.projectName).then((val) => {
        const {data} = val
        console.log(data)
        if (data.length) setShowChecklist(true)
        setChecklistData(data)
      })

      getInterviewByProject(data.projectName).then((val) => {
        const {data} = val
        console.log(data)
        if (data.length) setShowInterview(true)
        setInterviewData(data)
      })

      getGeofencingByProject(data.projectName).then((val) => {
        const {data} = val
        console.log(data)
        if (data.length) setShowGeofencing(true)
        setGeofencingData(data)
      })

      getCoordinatesByProject(data.projectName).then((val) => {
        const {data} = val
        console.log(data)
        if (data.length) setShowCoordinates(true)
        setCoordinatesData(data)
      })
    })
  }, [])

  return (
    <>
      <div className='card card-xxl-stretch mb-5 mb-xxl-8 mw-800px'>
        <div className='card-body py-3 pt-3 pb-3'>
          <div className='row g-5 gx-xxl-12'>
            <div className='col-xxl-12'>
              <div className='fw-bold fs-3 my-0'>{projectsData.projectName}</div>
              <div className='mt-4'>{projectsData.projectDescription}</div>
              <div className='mt-4'>
                {' '}
                {projectsData.created
                  ? 'Created on: ' + new Date(projectsData.created).toDateString()
                  : ' '}
              </div>
              <div className='mt-4'>
                Surveyors:{' '}
                {projectsData.surveyors.map((v, id) => {
                  return (
                    <span className='badge badge-light-primary fs-7 fw-semibold me-2' key={id}>
                      {v}
                    </span>
                  )
                })}
              </div>

              <div className='mt-4'>
                Tasks:{' '}
                {projectsData.tasks.map((v, id) => {
                  return (
                    <span className='badge badge-light-warning fs-7 fw-semibold me-2 mt-1' key={id}>
                      {v}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showInterview ? (
        <>
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
      ) : (
        ''
      )}

      {showChecklist ? (
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
        </>
      ) : (
        ''
      )}


{showGeofencing ? (
        <>
          <div className='row g-5 gx-xxl-12'>
            <div className='col-xxl-12'>
              <div className='card card-xxl-stretch mb-5 mb-xxl-8'>
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold fs-3 mb-1'>Geofencing</span>
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
                        {geofencingData.map((val, id) => {
                          return (
                            <tr key={id}>
                              <td>
                                <div className='ps-4'>{id + 1}</div>
                              </td>
                              <td>
                                <div className='d-flex align-items-center'>
                                  <div className='d-flex justify-content-start flex-column'>
                                    <Link
                                      to={'../geofencing/' + val.created}
                                      className='text-dark fw-bold text-hover-primary mb-1 fs-6'
                                    >
                                      {val.geofencingName}
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
                                  to={'../geofencing/' + val.created}
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
      ) : (
        ''
      )}




{showCoordinates ? (
        <>
          <div className='row g-5 gx-xxl-12'>
            <div className='col-xxl-12'>
              <div className='card card-xxl-stretch mb-5 mb-xxl-8'>
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold fs-3 mb-1'>Coordinates</span>
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
                        {coordinatesData.map((val, id) => {
                          return (
                            <tr key={id}>
                              <td>
                                <div className='ps-4'>{id + 1}</div>
                              </td>
                              <td>
                                <div className='d-flex align-items-center'>
                                  <div className='d-flex justify-content-start flex-column'>
                                    <Link
                                      to={'../coordinates/' + val.created}
                                      className='text-dark fw-bold text-hover-primary mb-1 fs-6'
                                    >
                                      {val.coordinatesName}
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
                                  to={'../coordinates/' + val.created}
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
      ) : (
        ''
      )}


    </>
  )
}

const ProjectsIDWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Project View</PageTitle>
      <ProjectsID />
    </>
  )
}

export {ProjectsIDWrapper}

/*
  {projectsData.map((val, id) => {
                return (
<div key={id}>
                    <div className="fw-bold fs-3 my-0">{val.projectName}</div>
                    <div>{val.projectDescription}</div>
                    <div>Created on: {val.created}</div>
                    
                    </div>

                )
  })}
  */
