import {PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'
import {FC} from 'react'

import { useEffect, useState, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import ttservices from "@tomtom-international/web-sdk-services";

// styles
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as turf from '@turf/turf'
import "./journeytime.css";
import {useNavigate} from 'react-router-dom'
import {newJourneytime} from './_requests'
import {KTSVG} from '../../../_metronic/helpers'

import {Formik, Form, Field, FieldArray} from 'formik'
import {getProjectNames} from '../projects/core/_requests'

import { useGeolocated } from "react-geolocated";


const tomtom_api_key = process.env.REACT_APP_SERVER_TOMTOM_API 

const NewJourneytime = () => {

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

  const [startJourney, setStartJourney] = useState(false);

  const [projectsList, setProjectsList] = useState(['Loading..'])

  const [timer, setTimer] = useState(0)

  const [locationPoints, setLocationPoints]=useState([])

  const locationRef= useRef(locationPoints);

  const [endLocation, setEndLocation] = useState('')
  const [startLocation, setStartLocation] = useState('')
  const [totalDistance, setTotalDistance] = useState(0)
  const [journeyStartTime, setJourneyStartTime] = useState(0)
  const [journeyEndTime, setJourneyEndTime] = useState(0)


  const tick = useRef(); 




  

    

    const getLocations =(points) =>{
      let resultStr = '';

      points.map((v)=>{

        resultStr+=v.lng+','+v.lat+':'

      })
      resultStr = resultStr.substring(0, resultStr.length - 1);
      console.log(resultStr)
      return (resultStr)
    }


  


    const options = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0,
    };
    
    
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    
 
  
  const startJourneyTime = () =>{

 

  
setJourneyStartTime(Date.now())
    

console.log('start journey time')

navigator.geolocation.getCurrentPosition((p)=>{
    map.setCenter({lng: p.coords.longitude , lat: p.coords.latitude});

    addMarker(p.coords.longitude ,p.coords.latitude, 'start-marker' )

    let lastMarker = {longitude: p.coords.longitude ,latitude: p.coords.latitude}

    
   console.log(p.coords)

    setStartLocation(`${p.coords.longitude},${p.coords.latitude}`)

    console.log(startLocation)

   
    setTimer(0)
    let tempTimer = 0;
    setStartJourney(true)
    tick.current = setInterval(() => { // <-- set tick ref current value

   
      if(tempTimer%3==0){
   
       navigator.geolocation.getCurrentPosition((position)=>{

        
        const lngLatDiff= 0.0003;
        const lngDiff = Math.abs(lastMarker.longitude-position.coords.longitude)
        const latDiff = Math.abs(lastMarker.latitude-position.coords.latitude)

        if(lngDiff >= lngLatDiff || latDiff>= lngLatDiff){

          lastMarker = { longitude: position.coords.longitude,
            latitude: position.coords.latitude}

            const locationTemp = [...locationRef.current,{lng:position.coords.longitude, lat:position.coords.latitude} ]
            lastMarker = { longitude: position.coords.longitude,latitude: position.coords.latitude}
     
             locationRef.current = locationTemp;
             setLocationPoints(locationTemp)
             
     
             addMarker(position.coords.longitude, position.coords.latitude, 'marker')
             map.setCenter({lng: position.coords.longitude , lat: position.coords.latitude});

        }
     
       }, error, options);
     
      }
          
      tempTimer +=1;
      setTimer(tempTimer);
    }, 1000);

  }, error, options);
   
  }

  function addMarker(lng, lat, elementName){

    const element = document.createElement('div')
    element.className = elementName

    new tt.Marker({
      element: element,
    })
      .setLngLat({lng, lat})
      .addTo(map)

  }

  const stopJourneyTime = () =>{
    setJourneyEndTime(Date.now())
    setStartJourney(false)
    clearInterval(tick.current);
    console.log(options)


    navigator.geolocation.getCurrentPosition((position)=>{
      
      console.log(locationPoints)
     const endLocationTemp =`${position.coords.longitude},${(position.coords.latitude)}`;
     addMarker(position.coords.longitude, position.coords.latitude,'end-marker')
     
      setEndLocation(endLocationTemp)
      console.log(startLocation)
      console.log(endLocationTemp)

      
      ttservices.services.calculateRoute({
        key: tomtom_api_key,
        traffic: false,
        locations: startLocation+":"+endLocationTemp,
        supportingPoints: getLocations(locationPoints)
      }).then((response)=>{
        var geojson = response.toGeoJson();
        console.log(geojson)
      

        setTotalDistance(geojson.features[0].properties.summary.lengthInMeters)
        
        map.addLayer({
          'id': 'route',
          'type': 'line',
          'source': {
              'type': 'geojson',
              'data': geojson
          },
          'paint': {
              'line-color': '#2faaff',
              'line-width': 5
          }
      });
      })
     }, error, options);
  
  }

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

    navigator.geolocation.getCurrentPosition((position)=>{
      map.setCenter({lng: position.coords.longitude , lat: position.coords.latitude});
    });



   

  
    

  

  
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
                  console.log(endLocation)

                  const totalTime = timer;
                 


                  newJourneytime(values.journeytimeName, values.projectName, values.questions, 
                    getLocations(locationPoints), endLocation, startLocation, 
                    totalDistance, totalTime, journeyStartTime, journeyEndTime).then(()=>{
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
                          {(startJourney)?<>
                            <button type="button" className="btn btn-lg btn-danger mb-2 ms-2" onClick={stopJourneyTime}>Stop Journey Time</button>      
                           <h1 className='ms-3 mt-3 display-3'>{timer}s</h1>     
                          </>:<>
                          <button type="button" className="btn btn-lg btn-primary mb-2 ms-2" onClick={startJourneyTime}>Start Journey Time</button>      
                           <h1 className='ms-3 mt-3 display-3'>{timer}s</h1>     
                          </>}
                                   
                       
                        </div>
                      ) : (
                          <div>Getting the location data&hellip; </div>
                      )
                  }                      
                    </span>
                   
                    </div>
                    
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
