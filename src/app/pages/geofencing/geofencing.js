
import {PageTitle} from '../../../_metronic/layout/core'
import { useEffect, useState, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
// styles
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as turf from '@turf/turf'
import "./geofencing.css";
import {FC} from 'react'
const tomtomapi = "jGLOAW8p4cm75mgVAHfwDjDADWQo4iOs";
const MAX_ZOOM = 17;



const GeofencingPage = () => {

console.log(process.env.REACT_APP_SERVER_TOMTOM_API)
  const mapElement = useRef();
  const [mapLongitude, setMapLongitude] = useState(55.2708);
  const [mapLatitude, setMapLatitude] = useState(25.2048);
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState({});

  

  useEffect(() => {
    let map = tt.map({
      /* 
      This key will API key only works on this Stackblitz. To use this code in your own project,
      sign up for an API key on the TomTom Developer Portal.
      */
      key: tomtomapi,
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
      language: "en-GB",
    });
    setMap(map);
    return () => map.remove();
  }, []);



return    <div ref={mapElement} className="mapDiv" />

  




    }
                  
const GeofencingWrapper = () => {

  
   
    return (
      <>
      <PageTitle breadcrumbs={[]}>Geofencing</PageTitle>
       <GeofencingPage />
      </>
    )
  }
  
  export  {GeofencingWrapper}

