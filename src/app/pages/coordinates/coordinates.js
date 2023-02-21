

import {PageTitle} from '../../../_metronic/layout/core'
import { useEffect, useState, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
// styles
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as turf from '@turf/turf'
import "./cordinates.css";
import {FC} from 'react'

const MAX_ZOOM = 17;



const CoordinatesPage = () => {

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
      key: "jGLOAW8p4cm75mgVAHfwDjDADWQo4iOs",
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
                  



                  
const CoordinatesWrapper = () => {
   
    return (
      <>
      <PageTitle breadcrumbs={[]}>Co-ordinates</PageTitle>
       <CoordinatesPage />
      </>
    )
  }
  
  export  {CoordinatesWrapper}

