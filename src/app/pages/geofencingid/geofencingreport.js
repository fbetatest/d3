import {PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'


import {getGeofencing} from '../geofencing/_requests'
import {KTSVG} from '../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import { useEffect, useState, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
// styles
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as turf from '@turf/turf'
import "./geofencing.css";

const GeofencingReport = () => {
  const navigate = useNavigate();
  const {id} = useParams()
  console.log(id)

  let tempId = '0'
  if (id) tempId = id
  console.log(id)
  const vid = +tempId

  const [geofencingData, setGeofencingData] = useState({
    id: 0,
    geofencingName: 'Loading..',
    projectName: '',
    created: 0,
    vid: 0,
    questions: [{fieldName: '', fieldType: '', fieldOptions: ''}],
  })


  const mapElement = useRef();
  const [mapLongitude, setMapLongitude] = useState(55.2708);
  const [mapLatitude, setMapLatitude] = useState(25.2048);
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState({});

  

  useEffect(() => {

    console.log('useEffect')
    getGeofencing(vid).then((val) => {
      const {data} = val
      setGeofencingData(data)
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

  return (<>
      <PageTitle breadcrumbs={[]}>{geofencingData.geofencingName}</PageTitle>
      <div className='fw-semibold fs-6 mb-2'>Project: {geofencingData.projectName}</div>

      <div className='card card-xxl-stretch mb-5 mb-xxl-8 mw-900px'>
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

const GeofencingReportWrapper = () => {
  return (
    <>
      <GeofencingReport />
    </>
  )
}

export {GeofencingReportWrapper}
