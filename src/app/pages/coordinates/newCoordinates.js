import {PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'
import {FC} from 'react'

import { useEffect, useState, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
// styles
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as turf from '@turf/turf'
import "./coordinates.css";
import {useNavigate} from 'react-router-dom'
import {newCoordinates} from './_requests'
import {KTSVG} from '../../../_metronic/helpers'

import {Formik, Form, Field, FieldArray} from 'formik'
import {getProjectNames} from '../projects/core/_requests'

import { useGeolocated } from "react-geolocated";

const tomtom_api_key = process.env.REACT_APP_SERVER_TOMTOM_API 




const NewCoordinates = () => {

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  useGeolocated({
      positionOptions: {
          enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
  });

  const navigate = useNavigate()
  let n = 1
  const mapElement = useRef();
  const [mapLongitude, setMapLongitude] = useState(55.2708);
  const [mapLatitude, setMapLatitude] = useState(25.2048);
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState({});
  const [cordinates, setCordinates] = useState([])

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

  
    const markers = []

    const addCordinateMarker = (lngLat, map) => {
      const popupOffset = {
        bottom: [0, -25],
      }

      const popup = new tt.Popup({
        offset: popupOffset,
        closeButton: false,
        closeOnClick: false,
        autoClose: false,
      }).setHTML(`<div>
      <div><strong>Coordinate ${n}</strong></div>
      <div>Latitude: ${parseFloat(lngLat.lat).toFixed(4)}</div>
      <div>Logitude: ${parseFloat(lngLat.lng).toFixed(4)}</div>
      </div>`)
      const element = document.createElement('div')
      element.className = 'marker'
      const marker = new tt.Marker({
        element: element,
      })
        .setLngLat(lngLat)
        .addTo(map)

      n += 1

      marker.setPopup(popup).togglePopup()

      markers.push(marker)
    }

    const cTemp = []

    map.on('click', (e) => {
           const {lng, lat} = e.lngLat
      cTemp.push({lng, lat})
      setCordinates([...cTemp])
      addCordinateMarker(e.lngLat, map)
    })


    return () => map.remove();

   
  }, [])
  return (
    <>
      <PageTitle breadcrumbs={[]}>Create New Coordinates</PageTitle>

      <div className='card card-xxl-stretch mb-5 mb-xxl-8 mw-800px'>
        <div className='card-body py-3 pt-3 pb-3'>
          <div className='row g-5 gx-xxl-12'>
            <div className='col-xxl-12'>
              <Formik
                initialValues={{
                  coordinatesName: '',
                  projectName: '',
                  questions: [{fieldName: '', fieldType: 'text', fieldOptions:""}],
                }}
                onSubmit={(values) => {
                  console.log(values)
                  console.log(cordinates)
                  newCoordinates(values.coordinatesName, values.projectName, values.questions, cordinates).then(()=>{
                  navigate('/coordinates-page');
                  })
                }}
              >
                {(formik) => (
                  <Form>
                    <label htmlFor='coordinatesName' className='fw-bold fs-6 mb-2 mt-4'>
                      Coordinates Name
                    </label>
                    <input
                      id='coordinatesName'
                      name='coordinatesName'
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-4'
                      onChange={formik.handleChange}
                      value={formik.values.coordinatesName}
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
                      Coordinates Map
                    </label>
                      <div className="mb-3">
                    <button className="btn btn-lg btn-primary ms-3">Add Coordinate</button>
                    <button className="btn btn-lg btn-primary ms-3">Add Current Location</button>
                    </div>

                    <div>

                      {
                        !isGeolocationAvailable ? (
                          <div>Your browser does not support Geolocation</div>
                      ) : !isGeolocationEnabled ? (
                          <div>Geolocation is not enabled</div>
                      ) : coords ? (
                          <table>
                              <tbody>
                                  <tr>
                                      <td>latitude</td>
                                      <td>{coords.latitude}</td>
                                  </tr>
                                  <tr>
                                      <td>longitude</td>
                                      <td>{coords.longitude}</td>
                                  </tr>
                                  <tr>
                                      <td>altitude</td>
                                      <td>{coords.altitude}</td>
                                  </tr>
                                  <tr>
                                      <td>heading</td>
                                      <td>{coords.heading}</td>
                                  </tr>
                                  <tr>
                                      <td>speed</td>
                                      <td>{coords.speed}</td>
                                  </tr>
                              </tbody>
                          </table>
                      ) : (
                          <div>Getting the location data&hellip; </div>
                      )
                  }
                      
                    </div>


                    <div ref={mapElement} className="mapDiv" />

                    {(cordinates.length > 0)? <>
                    {cordinates.map((val, id) => { 
                      return <div key={id} className="cordinateItem">
                        <strong>Coordinate {id+1}</strong>{' '}                      
                        latitude: <strong>{parseFloat(val.lat).toFixed(4)}</strong>{' '}
                        longitude: <strong>{parseFloat(val.lng).toFixed(4)}</strong>{' '}
                        </div>
                    })}
                    </>:<div className="cordinateItem">Click on the map to create a Coordinate</div>}

                    <div className='card-footer'>
                                <button type='submit' className='btn btn-lg btn-primary'>
                                  {' '}
                                  Create Coordinates{' '}
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

const NewCoordinatesWrapper = () => {
  return (
    <>
      <NewCoordinates />
    </>
  )
}

export {NewCoordinatesWrapper}
