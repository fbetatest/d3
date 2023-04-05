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
import {getCoordinates, editCoordinates, getCoordinatesPoints} from './_requests'
import {KTSVG} from '../../../_metronic/helpers'

import {Formik, Form, Field, FieldArray} from 'formik'
import {getProjectNames} from '../projects/core/_requests'

import { useGeolocated } from "react-geolocated";
import Camera, {FACING_MODES, IMAGE_TYPES} from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'

const tomtom_api_key = process.env.REACT_APP_SERVER_TOMTOM_API 




const EditCoordinates = () => {

  const {id} = useParams()
  console.log(id)

  let tempId = '0'
  if (id) tempId = id
  console.log(id)
  const vid = +tempId

  const [takePicture, setTakePicture] = useState(false)
  const [coordinatesData, setCoordinatesData] = useState({
    id: 0,
    coordinatesName: 'Loading..',
    projectName: '',
    created: 0,
    vid: 0,
    questions: [{fieldName: '', fieldType: '', fieldOptions: ''}],
  })

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
  const [loadingCordinates, setLoadingCordinates] = useState(true)
  const [projectsList, setProjectsList] = useState(['Loading..'])


  const addMarkerToLocation = ()=>{
   
    console.log(coords);

    addCordinateMarker({lng: coords.longitude , lat: coords.latitude}, map)
    map.setCenter({lng: coords.longitude , lat: coords.latitude})
  
  }

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

  

  const addCordinateMarker = (lngLat, map, img) => {

    const id= uuidv4()
    const popup = new tt.Popup(
     popupOptions,
    ).setHTML(inputPopup(id, img))

    
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
        name: name,
        dataUri: img
      }

      
       onMarkerSave(markerData);
    })

    document.getElementById(`remove-button-${id}`).addEventListener('click', function () {
    
      marker.remove();
    })

  }

  function handleTakePhotoAnimationDone(dataUri) {
    map.setCenter({lng: coords.longitude, lat: coords.latitude+0.003})
    addCordinateMarker({lng: coords.longitude, lat: coords.latitude}, map, dataUri)
    map.setZoom(15)
    setTakePicture(false)
  }

  const onMarkerSave = (markerData) =>{
    console.log(markerData)
    
        const popup = new tt.Popup(
          popupOptions,
         ).setHTML(detailsPopup(
          markerData.lng.toFixed(4),
          markerData.lat.toFixed(4),
          markerData.name,
          markerData.id,
          markerData.dataUri))
          markerData.marker.setPopup(popup).togglePopup();
    
          let coTemp = cordinatesRef.current;
    
          coTemp.push({id: markerData.id, name: markerData.name, lng:markerData.lng, lat: markerData.lat, dataUri : markerData.dataUri})
    
         
    
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

 const inputPopup = (id, dataUri) =>{ 
    return `<div class="form">
    <div class="form__row form__row--compact">
      <label class="form__label">Name 
        <input type="text" id="input-name-${id}" class="form__input">
      </label>
    </div>
    ${dataUri? `<img src=${dataUri} class="camera-view"/>` : ""}
    <div class="form__row form__row--compact">
      <input type="button" id="save-button-${id}" class="btn-submit btn-submit--save" value="Save">
    </div>
    <div class="form__row form__row--compact">
    <input type="button" id="remove-button-${id}" class="btn-submit btn-submit--remove" value="Remove">
  </div>
  </div>`

}

  function detailsPopup(lng, lat, name, id, dataUri) {
    return `
      <div class="form">

      <div><strong> ${name}</strong></div>
      <div>Latitude: ${parseFloat(lat).toFixed(4)}</div>
      <div>Logitude: ${parseFloat(lng).toFixed(4)}</div>
      ${dataUri? `<img src=${dataUri} class="camera-view"/>` : ""}
       
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






  useEffect(() => {

    getProjectNames().then((val) => {
      const {data} = val

      setProjectsList(data)
    })

    

    getCoordinates(vid).then((val) => {
      const {data} = val;

      
      setCoordinatesData({
        id: data._id,
        coordinatesName: data.coordinatesName,
        projectName: data.projectName,
        created: data.created,
        vid: data.vid,
        questions: data.questions,
     
      })

    

 

      console.log(data)

    });

    getCoordinatesPoints(vid).then((val) => {
      console.log("points")
      const {data} = val
      setLoadingCordinates(false)
      setCordinates(data.cordinates)
      data.cordinates.map((v) => {
        displayCordinates(v)
      });
   
    });





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

    function displayCordinates(v){

      const element = document.createElement('div')
    element.className = 'marker'

    const marker = new tt.Marker({
      element: element,
    })
      .setLngLat({lng:v.lng, lat:v.lat})
      .addTo(map)


      const markerData ={
        marker: marker,
        lng: v.lng,
        lat: v.lat,
        id: v._id,
        name: v.name,
        dataUri: v.image
      }

      map.setCenter({lng: v.lng , lat: v.lat})

      
       onMarkerSave(markerData);




    }

   


    return () => map.remove();

   
  }, [])


  return (
    <>
      <PageTitle breadcrumbs={[]}>Create New Coordinates</PageTitle>

      <div className='card card-xxl-stretch mb-5 mb-xxl-8'>
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
                
                  console.log(cordinates)
                 
                  editCoordinates(coordinatesData.coordinatesName, coordinatesData.projectName, coordinatesData.questions, cordinates, vid).then(()=>{
                  navigate('/coordinates-page');
                  })
                }}
              >
                {(formik) => (
                  <Form>
                   
                   

                

                    <label htmlFor='questions' className='fw-bold fs-6 mb-2 mt-4'>
                      Coordinates Map: {coordinatesData.coordinatesName}
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
                        <div>
                              {!takePicture ? (
                                <>
                                  <button
                                    type='button'
                                    className='btn btn-lg btn-primary mb-2 ms-2'
                                    onClick={() => setTakePicture(true)}
                                  >
                                    Camera
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    type='button'
                                    className='btn btn-lg btn-danger mb-2 ms-2'
                                    onClick={() => setTakePicture(false)}
                                  >
                                    Turn off Camera
                                  </button>
                               
                                    <Camera
                                      onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
                                      isFullscreen={false}
                                      idealFacingMode={FACING_MODES.ENVIRONMENT}
                                      idealResolution={{width: 640, height: 480}}
                                      imageCompression={0.7}
                                    />
                               
                                </>
                              )}
                            </div>
                        </div>
                        
                      ) : (
                          <div>Getting the location data&hellip; </div>
                      )
                  }                      
                    </span>
                   
                    </div>

                   


                    <div ref={mapElement} className="mapDiv" />
                    {(loadingCordinates)?<h1>Loading cordinates...</h1>:""}
                    {(cordinates.length > 0)? <>
                    {cordinates.map((val, id) => { 
                      return <div key={id} className="cordinateItem">
                        <strong> {val.name}</strong>{' '}                      
                        latitude: <strong>{parseFloat(val.lat).toFixed(4)}</strong>{' '}
                        longitude: <strong>{parseFloat(val.lng).toFixed(4)}</strong>{' '}
                        </div>
                    })}
                    </>:""}

                    <div className='card-footer'>
                                <button type='submit' className='btn btn-lg btn-primary' disabled={formik.isSubmitting}>
                                  {' '}
                                  Save Coordinates{' '}
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

const EditCoordinatesWrapper = () => {
  return (
    <>
      <EditCoordinates />
    </>
  )
}

export {EditCoordinatesWrapper}
