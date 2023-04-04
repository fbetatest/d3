import {PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'
import {FC} from 'react'

import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {editInterview, getInterview} from './_requests'
import {KTSVG} from '../../../_metronic/helpers'

import {Formik, Form, Field, FieldArray} from 'formik'
import {getProjectNames} from '../projects/core/_requests'


const EditInterview: FC = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  console.log(id)

  let tempId = '0'
  if (id) tempId = id
  console.log(id)
  const vid: number = +tempId

  const [projectsList, setProjectsList] = useState(['Loading..'])

 

  const [interviewData, setInterviewData] = useState({
    id: '',
    interviewName: 'Loading Data...',
    projectName: '',
    created: 0,
    vid: 0,
    questions: [{fieldName: '', fieldType: '', fieldOptions: ''}],
  })



  useEffect(() => {
    getProjectNames().then((val) => {
      const {data} = val

      setProjectsList(data)
    })

    let tempQuestions : any=[];


    getInterview(vid).then((val) => {
      const {data} = val
      
     data.questions.map((val2 : any)=>{
      tempQuestions.push({fieldName: val2.fieldName, fieldType: val2.fieldType, fieldOptions: val2.fieldOptions})
     })

     setInterviewData({
      id: data._id,
      interviewName: data.interviewName,
      projectName: data.projectName,
      created: data.created,
      vid: data.vid,
      questions: tempQuestions,
    })


      console.log(interviewData)
    })
  }, [])

  return (
    <>
      <PageTitle breadcrumbs={[]}>Edit Interview</PageTitle>

      <div className='card card-xxl-stretch mb-5 mb-xxl-8 mw-800px'>
        <div className='card-body py-3 pt-3 pb-3'>
          <div className='row g-5 gx-xxl-12'>
            <div className='col-xxl-12'>

              {(interviewData.interviewName!="Loading Data...")?<Formik
                initialValues={{
                  interviewName: interviewData.interviewName,
                  projectName:  interviewData.projectName,
                  questions: interviewData.questions,
                }}
                onSubmit={(values) => {
                  console.log(values)

                  editInterview(values.interviewName, values.projectName, values.questions, interviewData.vid ).then(()=>{
                 navigate('/interviews-page');
                 })
                }}
              >
                {(formik) => (
                  <Form>
                    <label htmlFor='interviewName' className='fw-bold fs-6 mb-2 mt-4'>
                      Interview Name
                    </label>
                    <input
                      id='interviewName'
                      name='interviewName'
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-4'
                      onChange={formik.handleChange}
                      value={formik.values.interviewName}
                    />

                    <label htmlFor='projects' className='fw-bold fs-6 mb-2'>
                      Project Name
                    </label>

                    <div role='group' aria-labelledby='my-radio-group mb-4'>
                      {projectsList.map((name, id) => {
                        return (
                          <label
                            key={id}
                            className='d-flex align-items-center justify-content-between cursor-pointer  '
                          >
                            <label className='form-check form-check-sm form-check-custom form-check-solid me-5 mb-3'>
                              {interviewData.projectName==name?<input
                                type='radio'
                                name='projectName'
                                value={name}
                                className='form-check-input me-1'
                                onChange={formik.handleChange}    
                                checked                     
                              />:<input
                                type='radio'
                                name='projectName'
                                value={name}
                                className='form-check-input me-1'
                                onChange={formik.handleChange}                         
                              />}
                              
                              {name}
                            </label>
                          </label>
                        )
                      })}
                    </div>

                    <label htmlFor='questions' className='fw-bold fs-6 mb-2 mt-4'>
                      Interview Questions
                    </label>
                    <div className='form-group '>
                      <FieldArray
                        name='questions'
                        render={(arrayHelpers) => {
                          return (
                            <div>
                              {formik.values.questions.map((questions, index) => {
                                return (
                                  <div
                                    key={index}
                                    className='border border-gray-200 p-4 my-2 rounded'
                                  >
                                    <div className='float-end'>
                                      <button
                                        type='button'
                                        onClick={() => arrayHelpers.remove(index)}
                                        className='btn btn-icon btn-color-danger  btn-sm mt-2'
                                      >
                                        <KTSVG
                                          path='/media/icons/duotune/general/gen034.svg'
                                          className='svg-icon-2x'
                                        />
                                      </button>
                                    </div>
                                    <div className='card pe-6'>
                                      <div className='form-group'>
                                        <Field
                                          type='text'
                                          placeholder='What is your question?'
                                          className='form-control form-control-lg form-control-solid mb-4'
                                          name={`questions.${index}.fieldName`}
                                        />
                                      </div>

                                      <div className='form-group'>
                                        <label
                                          htmlFor={`questions.${index}.fieldType`}
                                          className='fw-semibold fs-6 mb-1'
                                        >
                                          Field Type
                                        </label>
                                        <Field
                                          as='select'
                                          className='form-select form-select-solid mb-4'
                                          name={`questions.${index}.fieldType`}
                                        >
                                          <option value='text'>Text</option>
                                          <option value='yesorno'>Yes or No</option>
                                          <option value='checkbox'>Checkbox</option>
                                        </Field>
                                      </div>

                                      {(formik.values.questions[index].fieldType== "checkbox")? 
                                      <div className='form-group'>
                                        <Field
                                          type='text'
                                          placeholder='Enter checkbox options seperated by #'
                                          className='form-control form-control-lg form-control-solid mb-4'
                                          name={`questions.${index}.fieldOptions`}
                                        />
                                    


                                      </div>:""}
                                    </div>
                                  </div>
                                )
                              })}
                              <div className='form-group mb-4 mt-4 text-center'>
                                <button
                                  type='button'
                                  className='btn btn-success'
                                  onClick={() =>
                                    arrayHelpers.insert(formik.values.questions.length + 1, {
                                      fieldName: '',
                                      fieldType: 'text',
                                      fieldOptions: ''
                                    })
                                  }
                                >
                                  Add Question
                                </button>
                              </div>
                              <div className='card-footer'>
                                <button type='submit' className='btn btn-lg btn-primary' disabled={formik.isSubmitting}>
                                  {' '}
                                  Save{' '}
                                  <KTSVG
                                    path='/media/icons/duotune/arrows/arr064.svg'
                                    className='svg-icon-3 ms-2 me-0'
                                  />
                                </button>
                              </div>
                            </div>
                          )
                        }}
                      />
                    </div>
                  </Form>
                )}
              </Formik>:'Loading..'}
              



            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const EditInterviewWrapper: FC = () => {
  return (
    <>
      <EditInterview />
    </>
  )
}

export {EditInterviewWrapper}
