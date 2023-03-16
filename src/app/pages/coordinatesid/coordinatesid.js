import {PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'


import {getCoordinates} from '../coordinates/_requests'
import {KTSVG} from '../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import { useEffect, useState, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
// styles
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as turf from '@turf/turf'
import "./coordinates.css";

const CoordinatesID= () => {
  const navigate = useNavigate();
  const {id} = useParams()
  console.log(id)

  let tempId = '0'
  if (id) tempId = id
  console.log(id)
  const vid = +tempId

  const [coordinatesData, setCoordinatesData] = useState({
    id: 0,
    coordinatesName: 'Loading..',
    projectName: '',
    created: 0,
    vid: 0,
    questions: [{fieldName: '', fieldType: '', fieldOptions: ''}],
    coordinatesData: [{lng:0, lat:0, name: ''}]
  })


  const mapElement = useRef();
  const [mapLongitude, setMapLongitude] = useState(55.2708);
  const [mapLatitude, setMapLatitude] = useState(25.2048);
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState({});

  let n = 1

  useEffect(() => {

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

    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());
    setMap(map);

    map.on("load", function(){
      console.log("map loaded")
      getCoordinates(vid).then((val) => {
        const {data} = val
        setCoordinatesData(data)
        const {cordinates} = data
        cordinates.map((v, index) => {
          displayCordinates(v)
         });
      })

    })

    function displayCordinates(v){

      const popupOffset = {
        bottom: [0, -25],
      }

      const popup = new tt.Popup({
        offset: popupOffset,
        closeButton: false,
        closeOnClick: false,
        autoClose: false,
      }).setHTML(`<div>
      <div><strong> ${v.name}</strong></div>
      <div>Latitude: ${parseFloat(v.lat).toFixed(4)}</div>
      <div>Logitude: ${parseFloat(v.lng).toFixed(4)}</div>
      </div>`)

      const element = document.createElement('div')
      element.className = 'marker'
      const marker = new tt.Marker({
        element: element,
      })
        .setLngLat(v)
        .addTo(map)

      

        marker.setPopup(popup).togglePopup()
    }
      




    return () => map.remove();
  }, []);




  return (
    <>
      <PageTitle breadcrumbs={[]}>{coordinatesData.coordinatesName}</PageTitle>
      <div className='fw-semibold fs-6 mb-2'>Project: {coordinatesData.projectName}</div>

      <div className='card card-xxl-stretch mb-5 mb-xxl-8'>
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

const CoordinatesIDWrapper = () => {
  return (
    <>
      <CoordinatesID />
    </>
  )
}

export {CoordinatesIDWrapper}




