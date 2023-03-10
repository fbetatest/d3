import {PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'
import {FC} from 'react'

import { useEffect, useState, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
// styles
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as turf from '@turf/turf'
import "./journeytime.css";
import {useNavigate} from 'react-router-dom'
import {newJourneytime} from './_requests'
import {KTSVG} from '../../../_metronic/helpers'

import {Formik, Form, Field, FieldArray} from 'formik'
import {getProjectNames} from '../projects/core/_requests'

const tomtom_api_key = process.env.REACT_APP_SERVER_TOMTOM_API 

const NewJourneytime = () => {
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
      key: tomtom_api_key,
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
      language: "en-GB",
    });

    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());
    setMap(map);

    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      
      // creating source data with turf.js
      const sourceID = `circleData ${Math.floor(Math.random() * 10000)}`;
      let center = turf.point([lng, lat]);
      let radius = 0.5;
      let options = {
        steps: 15,
        units: "kilometers", // or "mile"
      };
      let circle = turf.circle(center, radius, options);
      map.addSource(sourceID, {
        type: "geojson",
        data: circle,
      });


      //fetching and drawing the map
    
      
       
         
            map.addLayer({
              id: `circle ${Math.floor(Math.random() * 10000)}`,
              type: "fill",
              source: sourceID,
              paint: {
                "fill-color": "yellow",
                "fill-opacity": 0.6,
              }
            })
       
    
    })
    return () => map.remove();

   
  }, [])
  return (
    <>
      <PageTitle breadcrumbs={[]}>Create New Journeytime</PageTitle>

      <div className='card card-xxl-stretch mb-5 mb-xxl-8 mw-800px'>
        <div className='card-body py-3 pt-3 pb-3'>
          <div className='row g-5 gx-xxl-12'>
            <div className='col-xxl-12'>
              <Formik
                initialValues={{
                  journeytimeName: '',
                  projectName: '',
                  questions: [{fieldName: '', fieldType: 'text', fieldOptions:""}],
                }}
                onSubmit={(values) => {
                  console.log(values)

                  newJourneytime(values.journeytimeName, values.projectName, values.questions).then(()=>{
                  navigate('/journeytime-page');
                  })
                }}
              >
                {(formik) => (
                  <Form>
                    <label htmlFor='journeytimeName' className='fw-bold fs-6 mb-2 mt-4'>
                      Journeytime Name
                    </label>
                    <input
                      id='journeytimeName'
                      name='journeytimeName'
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-4'
                      onChange={formik.handleChange}
                      value={formik.values.journeytimeName}
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
                      Journeytime Map
                    </label>
                    <div ref={mapElement} className="mapDiv" />

                    <div className='card-footer'>
                                <button type='submit' className='btn btn-lg btn-primary'>
                                  {' '}
                                  Create Journeytime{' '}
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

const NewJourneytimeWrapper = () => {
  return (
    <>
      <NewJourneytime />
    </>
  )
}

export {NewJourneytimeWrapper}
