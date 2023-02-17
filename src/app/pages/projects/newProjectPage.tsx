import {PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'
import {FC} from 'react'
import {useFormik} from 'formik'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import {createProject, getSurveyors} from './core/_requests'

import {KTSVG} from '../../../_metronic/helpers'

const NewProject: FC = () => {
    const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      projectName: '',
      projectDescription: '',
      surveyors: [],
      tasks: []
    },
    onSubmit: async (values) => {
        

      createProject(values.projectName, values.projectDescription, values.surveyors, values.tasks).then(()=>navigate('/'))
        
      console.log(JSON.stringify(values, null, 2))
    },
  })

  const [surveyorsList, setSurveyorsList] = useState(["Loading.."]);
  const tasksList = ["Interviews", "Checklists", "Geo-fencing", "Journey Time"," Co-ordinates"]

  useEffect(() => {
    getSurveyors().then(val => {
const {data} = val;

setSurveyorsList(data)

    });
  }, []);


  return (
    <>
      {/* begin::Row */}

      {/* end::Row */}
      <PageTitle breadcrumbs={[]}>Create New Project</PageTitle>

      <div className='card card-xxl-stretch mb-5 mb-xxl-8 mw-900px'>
        <div className='card-body py-3'>
          <div className='row g-5 gx-xxl-12'>
            <div className='col-xxl-12'>
       
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor='projectName' className='fw-bold fs-6 mb-2'>
                  Project Name
                </label>
                <input
                  id='projectName'
                  name='projectName'
                  type='text'
                  className='form-control form-control-lg form-control-solid mb-4'
                  onChange={formik.handleChange}
                  value={formik.values.projectName}
                />

                <label htmlFor='projectDescription' className='fw-bold fs-6 mb-2'>
                  Project Description
                </label>
                <input
                  id='projectDescription'
                  name='projectDescription'
                  type='text'
                  className='form-control form-control-lg form-control-solid mb-4'
                  onChange={formik.handleChange}
                  value={formik.values.projectDescription}
                />

                <label htmlFor='surveyors' className='fw-bold fs-6 mb-2'>
                  Surveyors
                </label>

             


                <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
                  <span className='d-flex align-items-center me-2'>
                    <span className='d-flex flex-column'>
                        { surveyorsList.map((name,id)=>{
             return <label key={id} className='form-check form-check-sm form-check-custom form-check-solid me-5 mb-3'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='surveyors'
                          value={name}
                          onChange={formik.handleChange}
                        />
                        <span className=' fw-bolder fs-6 px-3'>{name}</span>
                      </label>
                
                
                
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
                        { tasksList.map((task,id)=>{
             return <label key={id} className='form-check form-check-sm form-check-custom form-check-solid me-5 mb-3'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='tasks'
                          value={task}
                          onChange={formik.handleChange}
                        />
                        <span className=' fw-bolder fs-6 px-3'>{task}</span>
                      </label>
                
                
                
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const NewProjectWrapper: FC = () => {
  return (
    <>
      <NewProject />
    </>
  )
}

export {NewProjectWrapper}
