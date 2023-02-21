import {PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'
import {FC} from 'react'

import { useEffect, useState, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
// styles
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as turf from '@turf/turf'
import "./geofencing.css";
import {useNavigate} from 'react-router-dom'
import {newGeofencing} from './_requests'
import {KTSVG} from '../../../_metronic/helpers'

import {Formik, Form, Field, FieldArray} from 'formik'
import {getProjectNames} from '../projects/core/_requests'

const NewGeofencing = () => {
  const navigate = useNavigate()

  const mapElement = useRef();
  const [mapLongitude, setMapLongitude] = useState(55.2708);
  const [mapLatitude, setMapLatitude] = useState(25.2048);
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState({});


  const [projectsList, setProjectsList] = useState(['Loading..'])

  useEffect(() => {

    getProjectNames().then((val) => {
      const {data} = val

      setProjectsList(data)
    })


    console.log('useEffect')
   


    let map = tt.map({
      /* 
      This key will API key only works on this Stackblitz. To use this code in your own project,
      sign up for an API key on the TomTom Developer Portal.
      */
      key: "jGLOAW8p4cm75mgVAHfwDjDADWQo4iOs",
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
      language: "en-GB",
    });
    setMap(map);
    return () => map.remove();

   
  }, [])
  return (
    <>
      <PageTitle breadcrumbs={[]}>Create New Geofencing</PageTitle>

      <div className='card card-xxl-stretch mb-5 mb-xxl-8 mw-800px'>
        <div className='card-body py-3 pt-3 pb-3'>
          <div className='row g-5 gx-xxl-12'>
            <div className='col-xxl-12'>
              <Formik
                initialValues={{
                  geofencingName: '',
                  projectName: '',
                  questions: [{fieldName: '', fieldType: 'text', fieldOptions:""}],
                }}
                onSubmit={(values) => {
                  console.log(values)

                  newGeofencing(values.geofencingName, values.projectName, values.questions).then(()=>{
                  navigate('/geofencing-page');
                  })
                }}
              >
                {(formik) => (
                  <Form>
                    <label htmlFor='geofencingName' className='fw-bold fs-6 mb-2 mt-4'>
                      Geofencing Name
                    </label>
                    <input
                      id='geofencingName'
                      name='geofencingName'
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-4'
                      onChange={formik.handleChange}
                      value={formik.values.geofencingName}
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
                              <input
                                type='radio'
                                name='projectName'
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
                      Geofencing Map
                    </label>
                    <div ref={mapElement} className="mapDiv" />

                    <div className='card-footer'>
                                <button type='submit' className='btn btn-lg btn-primary'>
                                  {' '}
                                  Create Geofencing{' '}
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

const NewGeofencingWrapper = () => {
  return (
    <>
      <NewGeofencing />
    </>
  )
}

export {NewGeofencingWrapper}
