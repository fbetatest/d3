import {PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'
import "./journeytime.css";

import {getJourneytime} from '../journeytime/_requests'
import {KTSVG} from '../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import { useEffect, useState, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
// styles
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import ttservices from "@tomtom-international/web-sdk-services";

import * as turf from '@turf/turf'
import "./journeytime.css";

const tomtom_api_key = process.env.REACT_APP_SERVER_TOMTOM_API 

const JourneytimeID= () => {
  const navigate = useNavigate();
  const {id} = useParams()
  console.log(id)

  let tempId = '0'
  if (id) tempId = id
  console.log(id)
  const vid = +tempId

  const [journeytimeData, setJourneytimeData] = useState({
    id: 0,
    journeytimeName: 'Loading..',
    projectName: '',
    created: 0,
    vid: 0,
    questions: [{fieldName: '', fieldType: '', fieldOptions: ''}],
    locationPoints:"",
    startLocation:"",
    endLocation:"",
    totalTime: 0,
    totalDistance:0
  })


  const mapElement = useRef();
  const [mapLongitude, setMapLongitude] = useState(55.2708);
  const [mapLatitude, setMapLatitude] = useState(25.2048);
  const [mapZoom, setMapZoom] = useState(14);
  const [map, setMap] = useState({});

  

  useEffect(() => {

    console.log('useEffect')
    getJourneytime(vid).then((val) => {
      const {data} = val
      setJourneytimeData(data)
      console.log(data)
    })


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
  }, []);

  
  useEffect(() => {

    
    if(journeytimeData.startLocation!==""){

      const locationArr = journeytimeData.locationPoints.split(":")
      console.log(locationArr)
     const locationStart = journeytimeData.startLocation.split(",")
     console.log(locationStart)
    const locationEnd= journeytimeData.endLocation.split(",")
      addMarker(locationStart[0], locationStart[1], "start-marker")
     map.setCenter({lng: parseFloat(locationStart[0]) , lat: parseFloat(locationStart[1])});
      addMarker(locationEnd[0], locationEnd[1], "end-marker")
      console.log(locationStart)
      console.log(locationEnd)
      const supportingPoints = ()=>{ 
        let resultStr=""; 
        
      locationArr.map((v,i)=>{
        
        resultStr+=v+":"
        const markerP = v.split(",")
        addMarkerWnumber(markerP[0], markerP[1], 'tt-icon-number', i)
        
        
      })

      resultStr = resultStr.substring(0, resultStr.length - 1);
        console.log(resultStr)
      return resultStr
      


      }

     


      ttservices.services.calculateRoute({
        key: tomtom_api_key,
        traffic: false,
        locations: locationStart.join() + ':' + locationEnd.join(),
        supportingPoints: (journeytimeData.locationPoints!=="")? supportingPoints():undefined,
   
      }).then((response)=>{
        var geojson = response.toGeoJson();
        console.log(geojson)
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


    function addMarkerWnumber(lng, lat, elementName, index){

      const element = document.createElement('div')
      element.className = elementName

      var number = document.createElement('div');
                number.innerText = index;
                element.appendChild(number);
  
      new tt.Marker({
        element: element,
      })
        .setLngLat({lng, lat})
        .addTo(map)
  
    }

  }, [journeytimeData.startLocation])




  return (
    <>
      <PageTitle breadcrumbs={[]}>{journeytimeData.journeytimeName}</PageTitle>
      <div className='fw-semibold fs-6 mb-2'>Project: {journeytimeData.projectName}</div>
       {journeytimeData.locationPoints}
      <div>Time: {journeytimeData?.totalTime}s </div>
       {journeytimeData?.totalDistance}
      <div className='card card-xxl-stretch mb-5 mb-xxl-8 mw-1200px'>
        <div className='card-body py-3'>
          <div className='row g-5 gx-xxl-12'>
          <div className='col-xxl-12'>
          <div ref={mapElement} className="mapDiv" />
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

const JourneytimeIDWrapper = () => {
  return (
    <>
      <JourneytimeID />
    </>
  )
}

export {JourneytimeIDWrapper}




