import {PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'
import {FC} from 'react'
import {useFormik} from 'formik'
import {useState, useEffect} from 'react'
import {getInterview} from '../interviews/_requests'
import {KTSVG} from '../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import {Formik, Form, Field, FieldArray} from 'formik'
import { saveInterviewData } from './_requests'

const InterviewID: FC = () => {
  const navigate = useNavigate();
  const {id} = useParams()
  console.log(id)

  let tempId = '0'
  if (id) tempId = id
  console.log(id)
  const vid: number = +tempId

  const [interviewData, setInterviewData] = useState({
    id: 0,
    interviewName: 'Loading..',
    projectName: '',
    created: 0,
    vid: 0,
    questions: [{fieldName: '', fieldType: '', fieldOptions: ''}],
  })



  useEffect(() => {
    console.log('useEffect')
    getInterview(vid).then((val) => {
      const {data} = val
      setInterviewData(data)
      console.log(data)
    })
  }, [])

  const extraFields = interviewData.questions.map((val, index) => {
    return {question: val.fieldName, fieldValue: '', fieldOptions: []}
  })

  return (
    <>
      <PageTitle breadcrumbs={[]}>{interviewData.interviewName}</PageTitle>
      <div className='fw-semibold fs-6 mb-2'>Project: {interviewData.projectName}</div>

      <div className='card card-xxl-stretch mb-5 mb-xxl-8 mw-900px'>
        <div className='card-body py-3'>
          <div className='row g-5 gx-xxl-12'>
            <div className='col-xxl-12'>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  answers: extraFields,
                }}
                onSubmit={(values) => {

                  

                  saveInterviewData(
                    interviewData.interviewName,
                    interviewData.vid,
                     interviewData.projectName,
                    values.answers
                  ).then(()=>navigate('/../interviews-page'))
               
                }}
              >
                {(formik) => (
                  <Form>
                    <FieldArray
                      name='answers'
                      render={(arrayHelpers) => {
                        return (
                          <div>
                            {interviewData.questions.map((val, index) => {
                              return (
                                <div className='card pe-6' key={index}>
                                  <div className='form-group'>
                                    <label
                                      htmlFor={`fieldValue.${index}`}
                                      className='fw-semibold fs-6 mb-2'
                                    >
                                      {val.fieldName}
                                    </label>
                                    {val.fieldType == 'text' ? (
                                      <Field
                                        type='text'
                                        placeholder={val.fieldName}
                                        className='form-control form-control-lg form-control-solid mb-4'
                                        name={`answers.${index}.fieldValue`}
                                      />
                                    ) : (
                                      ''
                                    )}

                                    {val.fieldType == 'yesorno' ? (
                                      <div role='group' aria-labelledby='my-radio-group' className="ms-2">
                                        <label className='form-check form-check-sm form-check-custom form-check-solid me-5 mb-3'>
                                          <Field
                                            type='radio'
                                            className='form-check-input me-1'
                                            name={`answers.${index}.fieldValue`}
                                            value='Yes'
                                          />
                                          Yes
                                        </label>
                                        <label className='form-check form-check-sm form-check-custom form-check-solid me-5 mb-3'>
                                          <Field
                                            type='radio'
                                            className='form-check-input me-1'
                                            name={`answers.${index}.fieldValue`}
                                            value='No'
                                          />
                                          No
                                        </label>
                                      </div>
                                    ) : (
                                      ''
                                    )}
                                    {val.fieldType == 'checkbox' ? (
                                      <div role='group' aria-labelledby='checkbox-group'>
                                        {val.fieldOptions.split('#').map((option, i) => {
                                          return  <label key={i}
                                          className='form-check form-check-sm form-check-custom form-check-solid me-5 ms-2 mb-3'>
                                          <Field type="checkbox" 
                                          className='form-check-input me-2'
                                          name={`answers.${index}.fieldOptions`} 
                                          value={option} />
                                          {` `}
                                          {option}
                                        </label>
                                        })}
                                      </div>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )
                      }}
                    />

                    <div className='card-footer'>
                      <button type='submit' className='btn btn-lg btn-primary'>
                        {' '}
                        Submit{' '}
                        <KTSVG
                          path='/media/icons/duotune/arrows/arr064.svg'
                          className='svg-icon-3 ms-2 me-0'
                        />
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const InterviewIDWrapper: FC = () => {
  return (
    <>
      <InterviewID />
    </>
  )
}

export {InterviewIDWrapper}
