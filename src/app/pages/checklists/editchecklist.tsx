import {PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'
import {FC} from 'react'

import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {editChecklist, getChecklist} from './_requests'
import {KTSVG} from '../../../_metronic/helpers'

import {Formik, Form, Field, FieldArray} from 'formik'
import {getProjectNames, getSurveyors} from '../projects/core/_requests'

const EditChecklist: FC = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  console.log(id)

  let tempId = '0'
  if (id) tempId = id
  console.log(id)
  const vid: number = +tempId

  const [projectsList, setProjectsList] = useState(['Loading..'])
  const [surveyorsList, setSurveyorsList] = useState(['Loading..'])

  const [checklistData, setChecklistData] = useState({
    id: '',
    checklistName: 'Loading Data...',
    projectName: '',
    surveyorname: [],
    created: 0,
    vid: 0,
    questions: [{fieldName: '', fieldType: '', fieldOptions: ''}],
  })

  useEffect(() => {
    getProjectNames().then((val) => {
      const {data} = val

      setProjectsList(data)
    })

    getSurveyors().then((val) => {
      const {data} = val

      setSurveyorsList(data)
    })

    let tempQuestions: any = []

    getChecklist(vid).then((val) => {
      const {data} = val

      data.questions.map((val2: any) => {
        tempQuestions.push({
          fieldName: val2.fieldName,
          fieldType: val2.fieldType,
          fieldOptions: val2.fieldOptions,
        })
      })

      setChecklistData({
        id: data._id,
        checklistName: data.checklistName,
        projectName: data.projectName,
        surveyorname: data.surveyorname,
        created: data.created,
        vid: data.vid,
        questions: tempQuestions,
      })

      if(surveyorsList[0]!='Loading..'){
      let tempSurveyors = surveyorsList

      data.surveyorname.map((name: string) => {
        console.log(name)
        tempSurveyors = tempSurveyors.filter((item) => item !== name)
      })

      setSurveyorsList(tempSurveyors)
    }

      console.log(data)
    })
  }, [])


  const [list, setList] = useState(false);
 
  useEffect(() => {
  
    if(checklistData.surveyorname.length && !list){
    let tempSurveyors = surveyorsList

    checklistData.surveyorname.map((name: string) => {
      console.log(name)
      tempSurveyors = tempSurveyors.filter((item) => item !== name)
    })

    setSurveyorsList(tempSurveyors)
    setList(true)
  }
  }, [surveyorsList, checklistData.surveyorname.length])
  return (
    <>
      <PageTitle breadcrumbs={[]}>Edit Checklist</PageTitle>

      <div className='card card-xxl-stretch mb-5 mb-xxl-8 mw-800px'>
        <div className='card-body py-3 pt-3 pb-3'>
          <div className='row g-5 gx-xxl-12'>
            <div className='col-xxl-12'>
              {checklistData.checklistName != 'Loading Data...' ? (
                <Formik
                  initialValues={{
                    checklistName: checklistData.checklistName,
                    projectName: checklistData.projectName,
                    surveyorname: checklistData.surveyorname,
                    questions: checklistData.questions,
                  }}
                  onSubmit={(values) => {
                    console.log(values)

                    editChecklist(
                      values.checklistName,
                      values.projectName,
                      values.surveyorname,
                      values.questions,
                      checklistData.vid
                    ).then(() => {
                      navigate('/checklists-page')
                    })
                  }}
                >
                  {(formik) => (
                    <Form>
                      <label htmlFor='checklistName' className='fw-bold fs-6 mb-2 mt-4'>
                        Checklist Name
                      </label>
                      <input
                        id='checklistName'
                        name='checklistName'
                        type='text'
                        className='form-control form-control-lg form-control-solid mb-4'
                        onChange={formik.handleChange}
                        value={formik.values.checklistName}
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
                                {checklistData.projectName == name ? (
                                  <input
                                    type='radio'
                                    name='projectName'
                                    value={name}
                                    className='form-check-input me-1'
                                    onChange={formik.handleChange}
                                    defaultChecked
                                  />
                                ) : (
                                  <input
                                    type='radio'
                                    name='projectName'
                                    value={name}
                                    className='form-check-input me-1'
                                    onChange={formik.handleChange}
                                  />
                                )}

                                {name}
                              </label>
                            </label>
                          )
                        })}
                      </div>

                      <label htmlFor='surveyors' className='fw-bold fs-6 mb-2'>
                        Surveyors
                      </label>

                      <div role='group' aria-labelledby='my-radio-group mb-4'>
                        {checklistData.surveyorname.map((name, id) => {
                          return (
                            <label
                              key={id}
                              className='d-flex align-items-center justify-content-between cursor-pointer  '
                            >
                              <label className='form-check form-check-sm form-check-custom form-check-solid me-5 mb-3'>
                                <input
                                  type='checkbox'
                                  name='surveyorname'
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
                                  name='surveyorname'
                                  value={name}
                                  className='form-check-input me-1'
                                  onChange={formik.handleChange}
                                />
                                {name}
                              </label>
                            </label>
                          )
                        })}
                      </div>

                      <label htmlFor='questions' className='fw-bold fs-6 mb-2 mt-4'>
                        Checklist Questions
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

                                        {formik.values.questions[index].fieldType == 'checkbox' ? (
                                          <div className='form-group'>
                                            <Field
                                              type='text'
                                              placeholder='Enter checkbox options seperated by #'
                                              className='form-control form-control-lg form-control-solid mb-4'
                                              name={`questions.${index}.fieldOptions`}
                                            />
                                          </div>
                                        ) : (
                                          ''
                                        )}
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
                                        fieldOptions: '',
                                      })
                                    }
                                  >
                                    Add Question
                                  </button>
                                </div>
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
                            )
                          }}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              ) : (
                'Loading..'
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const EditChecklistWrapper: FC = () => {
  return (
    <>
      <EditChecklist />
    </>
  )
}

export {EditChecklistWrapper}