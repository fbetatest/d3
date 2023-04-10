import {PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'


import {getCoordinates, getCoordinatesPoints} from '../coordinates/_requests'
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
  })

  const [cordinates, setCordinates] = useState([]);
  const [loadingCordinates, setLoadingCordinates] = useState(true)

  const mapElement = useRef();
  const [mapLongitude, setMapLongitude] = useState(55.2708);
  const [mapLatitude, setMapLatitude] = useState(25.2048);
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState({});
  const [cordinateImage, setCordinateImage] = useState("")
  

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
      zoom: 12,
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


      })

     

      getCoordinatesPoints(vid).then((val) => {
        console.log("points")
        const {data} = val
        setLoadingCordinates(false)
        setCordinates(data.cordinates)
       data.cordinates.map((v) => {
        console.log(v.name)
         displayCordinates(v)
        });
     
      });

    })

    function displayCordinates(v){

      const id = uuidv4()

      const popupOffset = {
        bottom: [0, -25],
      }

      map.setCenter({lng: v.lng , lat: v.lat})

      const popup = new tt.Popup({
        offset: popupOffset,
        closeButton: true,
        closeOnClick: false,
        autoClose: false,
      }).setHTML(`<div>
      <div><strong> ${v.name}</strong></div>
      <div>Latitude: ${parseFloat(v.lat).toFixed(4)}</div>
      <div>Logitude: ${parseFloat(v.lng).toFixed(4)}</div>
      ${v.image? `<img src=${v.image} class="camera-view" id="camera-view-${id}"  >` : ""}
      </div>`)


   
 

      const element = document.createElement('div')
      element.className = 'tt-icon-number'

      const text = document.createElement('div');
      text.innerText = (v.name.length>9)? v.name.substring(0,9)+'...': v.name;
      text.className = 'tt-icon-text'
      element.appendChild(text);
      const marker = new tt.Marker({
        element: element,
      })
        .setLngLat(v)
        .addTo(map)

      

        marker.setPopup(popup)

    if(v.image){

      popup.on("open", ()=>{ 
        document.getElementById(`camera-view-${id}`).addEventListener('click', function () {
        setCordinateImage(v.image)
       });})
 

/*
       
*/
    }
    }



    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
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

          {(cordinateImage!=="")?<>
          <div>
            <div>
            <button className='btn  btn-danger imageClose' onClick={()=>setCordinateImage("")}>
              <KTSVG

                          path='/media/icons/duotune/general/gen040.svg'
                          className='svg-icon-2x '
                        /></button>
                        </div>
            <img src={cordinateImage} className="imageDisplay" /></div>
          </>:<>
          </>}
          

          <div>
            {(loadingCordinates)?<h1>Loading cordinates...</h1>:""}
          {cordinates.map((val, id) => { 
                      return <div key={id} className="cordinateItem">
                        <strong> {val.name}</strong>{' '}                      
                        latitude: <strong>{parseFloat(val.lat).toFixed(4)}</strong>{' '}
                        longitude: <strong>{parseFloat(val.lng).toFixed(4)}</strong>{' '}
                        </div>
                    })}
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




