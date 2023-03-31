import {PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'
import './journeytime.css'

import {editJourneytime, getJourneytime} from '../journeytime/_requests'
import {KTSVG} from '../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState, useRef} from 'react'
import {Formik, Form, Field, FieldArray} from 'formik'
const EditJourneytime = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  console.log(id)

  let tempId = '0'
  if (id) tempId = id
  console.log(id)
  const vid = +tempId

  const [journeytimeData, setJourneytimeData] = useState({
    id: 0,
    journeytimeName: 'Loading Data...',
    projectName: '',
    created: 0,
    vid: 0,
    questions: [{fieldName: '', fieldType: '', fieldOptions: ''}],
    locationPoints: '',
    startLocation: '',
    endLocation: '',
    totalTime: 0,
    totalDistance: 0,
    journeyStartTime: 0,
    journeyEndTime: 0,
    videoLink:""
  })

  useEffect(() => {
    console.log('useEffect')
    getJourneytime(vid).then((val) => {
      const {data} = val
      setJourneytimeData(data)
      console.log(data)
    })
  }, [])

  return (
    <>
      <PageTitle breadcrumbs={[]}>{journeytimeData.journeytimeName}</PageTitle>
      <div className='fw-semibold fs-6 mb-2'>Project: {journeytimeData.projectName}</div>

      <div className='card card-xxl-stretch mb-5 mb-xxl-8 mw-800px'>
        <div className='card-body py-3 pt-3 pb-3'>
          <div className='row g-5 gx-xxl-12'>
            <div className='col-xxl-12'></div>

            {(journeytimeData.journeytimeName!="Loading Data...")?<Formik
            initialValues={{
              videoLink: journeytimeData?.videoLink || ""
            }}
            onSubmit={(values) => {
              console.log(values.videoLink)
              editJourneytime(vid, values.videoLink)
              navigate('/journeytime-page');
            }}
            >
                {(formik) => (
                  <Form>

                <label htmlFor='videoLink' className='fw-bold fs-6 mb-2 mt-4'>
                      Add Video Link
                    </label>
                    <input
                      id='videoLink'
                      name='videoLink'
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-4'
                      onChange={formik.handleChange}
                      value={formik.values.videoLink}
                    />
                        <div className='card-footer'>
                                <button type='submit' className='btn btn-lg btn-primary'>
                                  {' '}
                                  Save{' '}
                                  <KTSVG
                                    path='/media/icons/duotune/arrows/arr064.svg'
                                    className='svg-icon-3  me-0'
                                  />
                                </button>
                          </div>
                  </Form>)}
                </Formik>:'Loading..'}
          </div>
        </div>
      </div>
    </>
  )
}

const EditJourneytimeWrapper = () => {
  return (
    <>
      <EditJourneytime />
    </>
  )
}

export {EditJourneytimeWrapper}
