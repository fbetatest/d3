import {PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'
import {FC} from 'react'
import {useFormik} from 'formik'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import {createProject, editProject, getSurveyors} from './core/_requests'
import {getProject} from './core/_requests'
import {KTSVG} from '../../../_metronic/helpers'
import {Formik, Form, Field, FieldArray} from 'formik'
const EditProject: FC = () => {
  const navigate = useNavigate()

  const [projectsData, setProjectsData] = useState({
    vid: 0,
    projectName: 'Loading..',
    created: 0,
    projectDescription: '',
    surveyors: [],
    tasks: [],
  })

  let {id} = useParams()
  let tempId = '0'
  if (id) tempId = id
  console.log(id)
  const vid: number = +tempId

  const [surveyorsList, setSurveyorsList] = useState(['Loading..'])
  const [tasksList, setTasksList] = useState([
    'Interviews',
    'Checklists',
    'Geo-fencing',
    'Journey Time',
    ' Co-ordinates',
  ])

  useEffect(() => {
    getProject(vid).then((val) => {
      const {data} = val
      setProjectsData(data)
      console.log(data)
      console.log(projectsData)
      let tempProjectsData = data
      let tempTasks = tasksList

      data.tasks.map((name: string) => {
        console.log(name)
        tempTasks = tempTasks.filter((item: any) => item !== name)
      })
      setTasksList(tempTasks)

      getSurveyors().then((val) => {
        const {data} = val

        let tempSurveyors = data

        tempProjectsData.surveyors.map((name: string) => {
          console.log(name)
          tempSurveyors = tempSurveyors.filter((item: any) => item !== name)
        })

        setSurveyorsList(tempSurveyors)
      })
    })
  }, [])

  return (
    <>
      {/* begin::Row */}

      {/* end::Row */}
      <PageTitle breadcrumbs={[]}>Edit Project</PageTitle>

      <div className='card card-xxl-stretch mb-5 mb-xxl-8 mw-900px'>
        <div className='card-body py-3'>
          <div className='row g-5 gx-xxl-12'>
            <div className='col-xxl-12'>
              <div className='fw-bold fs-3 my-0 mb-5'>{projectsData.projectName}</div>

              {projectsData.projectName != 'Loading..' ? (
                <Formik
                  initialValues={{
                    surveyors: projectsData.surveyors,
                    tasks: projectsData.tasks,
                  }}
                  onSubmit={(values) => {
                    console.log(values)
                    editProject(projectsData.projectName, projectsData.projectDescription,
                        values.surveyors, values.tasks, projectsData.vid).then(()=>navigate('/'))
               
                  }}
                >
                  {(formik) => (
                    <Form>
                      <label htmlFor='surveyors' className='fw-bold fs-6 mb-2'>
                        Surveyors
                      </label>
                      <div role='group' aria-labelledby='my-radio-group mb-4'>
                        {projectsData.surveyors.map((name, id) => {
                          return (
                            <label
                              key={id}
                              className='d-flex align-items-center justify-content-between cursor-pointer  '
                            >
                              <label className='form-check form-check-sm form-check-custom form-check-solid me-5 mb-3'>
                                <input
                                  type='checkbox'
                                  name='surveyors'
                                  value={name}
                                  className='form-check-input me-1'
                                  onChange={formik.handleChange}
                                  defaultChecked
                                />
                                {name}
                              </label>
                            </label>
                          )
                        })}

                        {surveyorsList.map((name, id) => {
                          return (
                            <label
                              key={id}
                              className='d-flex align-items-center justify-content-between cursor-pointer  '
                            >
                              <label className='form-check form-check-sm form-check-custom form-check-solid me-5 mb-3'>
                                <input
                                  type='checkbox'
                                  name='surveyors'
                                  value={name}
                                  className='form-check-input me-1'
                                  onChange={formik.handleChange}
                                />
                                {name}
                              </label>
                            </label>
                          )
                        })}

                        <label htmlFor='tasks' className='fw-bold fs-6 mb-2'>
                          Tasks
                        </label>

                        <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
                          <span className='d-flex align-items-center me-2'>
                            <span className='d-flex flex-column'>
                              {projectsData.tasks.map((task, id) => {
                                return (
                                  <label
                                    key={id}
                                    className='form-check form-check-sm form-check-custom form-check-solid me-5 mb-3'
                                  >
                                    <input
                                      className='form-check-input'
                                      type='checkbox'
                                      name='tasks'
                                      value={task}
                                      onChange={formik.handleChange}
                                      defaultChecked
                                    />
                                    <span className=' fw-bolder fs-6 px-3'>{task}</span>
                                  </label>
                                )
                              })}
                              {tasksList.map((task, id) => {
                                return (
                                  <label
                                    key={id}
                                    className='form-check form-check-sm form-check-custom form-check-solid me-5 mb-3'
                                  >
                                    <input
                                      className='form-check-input'
                                      type='checkbox'
                                      name='tasks'
                                      value={task}
                                      onChange={formik.handleChange}
                                    />
                                    <span className=' fw-bolder fs-6 px-3'>{task}</span>
                                  </label>
                                )
                              })}
                            </span>
                          </span>
                        </label>
                        <div className='card-footer'>
                          <button
                            type='submit'
                            className='btn btn-lg btn-primary'
                            disabled={formik.isSubmitting}
                          >
                            {' '}
                            Save{' '}
                            <KTSVG
                              path='/media/icons/duotune/arrows/arr064.svg'
                              className='svg-icon-3 ms-2 me-0'
                            />
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              ) : (
                ''
              )}
              {/*
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor='surveyors' className='fw-bold fs-6 mb-2'>
                  Surveyors
                </label>

                <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
                  <span className='d-flex align-items-center me-2'>
                    <span className='d-flex flex-column'>
                      {surveyorsList.map((name, id) => {
                        return (
                          <label
                            key={id}
                            className='form-check form-check-sm form-check-custom form-check-solid me-5 mb-3'
                          >
                            <input
                              className='form-check-input'
                              type='checkbox'
                              name='surveyors'
                              value={name}
                              onChange={formik.handleChange}
                            />
                            <span className=' fw-bolder fs-6 px-3'>{name}</span>
                          </label>
                        )
                      })}
                    </span>
                  </span>
                </label>

                <label htmlFor='tasks' className='fw-bold fs-6 mb-2'>
                  Tasks
                </label>

                <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
                  <span className='d-flex align-items-center me-2'>
                    <span className='d-flex flex-column'>
                      {tasksList.map((task, id) => {
                        return (
                          <label
                            key={id}
                            className='form-check form-check-sm form-check-custom form-check-solid me-5 mb-3'
                          >
                            <input
                              className='form-check-input'
                              type='checkbox'
                              name='tasks'
                              value={task}
                              onChange={formik.handleChange}
                            />
                            <span className=' fw-bolder fs-6 px-3'>{task}</span>
                          </label>
                        )
                      })}
                    </span>
                  </span>
                </label>

                <button type='submit' className='btn btn-lg btn-primary'>
                  {' '}
                  Submit{' '}
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr064.svg'
                    className='svg-icon-3 ms-2 me-0'
                  />
                </button>
              </form>

              */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const EditProjectWrapper: FC = () => {
  return (
    <>
      <EditProject />
    </>
  )
}

export {EditProjectWrapper}
