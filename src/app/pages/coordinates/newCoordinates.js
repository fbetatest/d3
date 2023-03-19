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
          enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
  });




  const navigate = useNavigate()
  const mapElement = useRef();
  const [mapLongitude, setMapLongitude] = useState(55.2708);
  const [mapLatitude, setMapLatitude] = useState(25.2048);
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState({});
  const [cordinates, setCordinates] = useState([])
  const cordinatesRef = useRef(cordinates)
  const [projectsList, setProjectsList] = useState(['Loading..'])


  

   const LocateMe = ()=>{
    console.log(coords);
    map.setCenter({lng: coords.longitude , lat: coords.latitude});
  }



  

  const popupOptions = {
    maxWidth: '200px',
    offset: {bottom: [0, -25]},
    closeButton: false,
    closeOnClick: false,
    autoClose: false,
  }

  

  const addCordinateMarker = (lngLat, map) => {

    const id= uuidv4()
    const popup = new tt.Popup(
     popupOptions,
    ).setHTML(inputPopup(id))

    
    const element = document.createElement('div')
    element.className = 'marker'

    const marker = new tt.Marker({
      element: element,
    })
      .setLngLat(lngLat)
      .addTo(map)
      
   


    marker.setPopup(popup).togglePopup();

    document.getElementById(`save-button-${id}`).addEventListener('click', function () {
      const name = document.getElementById(`input-name-${id}`).value;
      console.log(name)

      const markerData ={
        marker: marker,
        lng: lngLat.lng,
        lat: lngLat.lat,
        id: id,
        name: name
      }

      
       onMarkerSave(markerData);
    })

    document.getElementById(`remove-button-${id}`).addEventListener('click', function () {
    
      marker.remove();
    })

  }


  const onMarkerSave = (markerData) =>{
console.log(markerData)

    const popup = new tt.Popup(
      popupOptions,
     ).setHTML(detailsPopup(
      markerData.lng.toFixed(4),
      markerData.lat.toFixed(4),
      markerData.name,
      markerData.id))
      markerData.marker.setPopup(popup).togglePopup();

      let coTemp = cordinatesRef.current;

      coTemp.push({id: markerData.id, name: markerData.name, lng:markerData.lng, lat: markerData.lat})

     

      setCordinates([...coTemp])

    console.log(cordinates.length)
    document.getElementById(`remove-${markerData.id}`).addEventListener('click', function () {
      markerData.marker.remove();
    
    let cTemp = cordinatesRef.current.filter(item=> item.id != markerData.id)
     console.log(cTemp)
  
     cordinatesRef.current = cTemp
     coTemp = cTemp;
     setCordinates([...coTemp])
   

    })

  }

 const inputPopup = (id) =>{ 
    return `<div class="form">
    <div class="form__row form__row--compact">
      <label class="form__label">Name 
        <input type="text" id="input-name-${id}" class="form__input">
      </label>
    </div>
   
    <div class="form__row form__row--compact">
      <input type="button" id="save-button-${id}" class="btn-submit btn-submit--save" value="Save">
    </div>
    <div class="form__row form__row--compact">
    <input type="button" id="remove-button-${id}" class="btn-submit btn-submit--remove" value="Remove">
  </div>
  </div>`

}

  function detailsPopup(lng, lat, name, id) {
    return `
      <div class="form">

      <div><strong> ${name}</strong></div>
      <div>Latitude: ${parseFloat(lat).toFixed(4)}</div>
      <div>Logitude: ${parseFloat(lng).toFixed(4)}</div>

       
        <div class="form__row form__row--compact">
          <input type="button" id="remove-${id}" class="btn-submit btn-submit--remove" value="Remove">
        </div>
      </div>`
  }

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const addMarkerToLocation =  (()=>{
    console.log(coords);

    addCordinateMarker({lng: coords.longitude , lat: coords.latitude}, map)

    map.setCenter({lng: coords.longitude , lat: coords.latitude})

  })





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

  

    map.on('click', (e) => {
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
                    
                    <span>
                      {
                        !isGeolocationAvailable ? (
                          <div>Your browser does not support Geolocation</div>
                      ) : !isGeolocationEnabled ? (
                          <div>Geolocation is not enabled</div>
                      ) : coords ? (
                        <div>
                           <button type="button" className="btn btn-lg btn-primary mb-2 ms-2" onClick={addMarkerToLocation}>Add Current Location</button>
                           <button type="button" className="btn btn-lg btn-primary mb-2 ms-2" onClick={LocateMe}>Locate me</button>
                        </div>
                      ) : (
                          <div>Getting the location data&hellip; </div>
                      )
                  }                      
                    </span>
                   
                    </div>

                   


                    <div ref={mapElement} className="mapDiv" />

                    {(cordinates.length > 0)? <>
                    {cordinates.map((val, id) => { 
                      return <div key={id} className="cordinateItem">
                        <strong> {val.name}</strong>{' '}                      
                        latitude: <strong>{parseFloat(val.lat).toFixed(4)}</strong>{' '}
                        longitude: <strong>{parseFloat(val.lng).toFixed(4)}</strong>{' '}
                        </div>
                    })}
                    </>:<div className="cordinateItem">Click on the Add Cordinate button to create a Coordinate</div>}

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
