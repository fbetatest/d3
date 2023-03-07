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

const GeofencingID= () => {
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
    polygonData: {
      name: '', 
      id: '', 
        data: {
          type: '',
          coordinates: [0, 0]
        }
    }
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
      const {polygonData } = data;
      polygonData.map((v, index) => {
       displayFence( v.id, v.name, v.data)
      });
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


    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    }

    const popupOptions = {
      maxWidth: '200px',

      closeButton: false,
      closeOnClick: false,
      autoClose: false,
    }

    function displayFence(id, name, polygon) {
      console.log("displayFence")
      console.log(name)

      const newPolygon = new Polygon(polygon)
     newPolygon.addTo(map)
      
      newPolygon.bindPopup(detailsPopup({id, name}), popupOptions).openPopup()
  

     
      }

      function detailsPopup(data) {
        return `
          <div class="form">
            <div class="form__row form__row--compact"> ${data.name}</div>
         
          </div>`
      }


    function Polygon(data, options) {
      tt.Evented.call(this)

      var defaultOptions = {
        style: {
          stroke: true,
          color: '#61ade0',
          opacity: 0.8,
          fillOpacity: 0.2,
          lineJoin: 'round',
          lineCap: 'round',
          weight: 3,
        },
      }

     

      this.id = uuidv4()
      this.data = data || turf.featureCollection([])
      this.options = Object.assign({}, defaultOptions, options)

      this.handleClick = this.handleClick.bind(this)
    }

    Object.setPrototypeOf(Polygon.prototype, tt.Evented.prototype)
    Object.setPrototypeOf(Polygon, tt.Evented)

    Polygon.prototype.addTo = function (map) {
      var style = this.options.style

      map.addSource(this.id, {
        type: 'geojson',
        data: this.data || {},
      })

      if (style.stroke) {
        map.addLayer({
          id: this.id + '_line',
          type: 'line',
          source: this.id,
          layout: {
            'line-join': style.lineJoin,
            'line-cap': style.lineCap,
          },
          paint: {
            'line-color': style.color,
            'line-opacity': style.opacity,
            'line-width': style.weight,
          },
        })
      }

      map.addLayer({
        id: this.id + '_fill',
        type: 'fill',
        source: this.id,
        layout: {},
        paint: {
          'fill-color': style.fillColor || style.color,
          'fill-opacity': style.fillOpacity,
        },
      })

      map.on('click', this.id + '_fill', this.handleClick)

      this._map = map

      return this
    }

    Polygon.prototype.remove = function () {
      if (this._popup) {
        this.closePopup()
      }

      if (this._map) {
        this._map.off('click', this.id + '_fill', this.handleClick)

        this.options.style.stroke && this._map.removeLayer(this.id + '_line')
        this._map.removeLayer(this.id + '_fill')
        this._map.removeSource(this.id)

        this._map = null
      }

      return this
    }

    Polygon.prototype.getData = function () {
      return this.data
    }

    Polygon.prototype.setData = function (data) {
      this.data = data

      if (this._map) {
        var source = this._map.getSource(this.id)
        source.setData(data)
      }

      return this
    }

    Polygon.prototype.handleClick = function (event) {
      if (this._popup) {
        this.openPopup(event.lngLat)
      }

      this.fire({
        type: 'click',
        point: event.point,
        lngLat: event.lngLat,
        target: this,
      })
    }

    Polygon.prototype.getPopup = function () {
      return this._popup
    }

    Polygon.prototype.bindPopup = function (content, popupOptions) {
      this._popup && this._popup.remove()
      this._popup = new tt.Popup(popupOptions).setHTML(content)
      return this
    }

    Polygon.prototype.isPopupOpen = function () {
      return this._popup && this._popup.isOpen()
    }

    Polygon.prototype.openPopup = function (lngLat) {
      if (this._popup && this._map) {
        lngLat = lngLat || turf.centroid(this.data).geometry.coordinates

        if (!this.isPopupOpen()) {
          this._popup.addTo(this._map)
        }

        this._popup.setLngLat(lngLat)

        this.fire({
          type: 'popupopen',
          popup: this._popup,
        })
      }
      return this
    }

    Polygon.prototype.closePopup = function () {
      if (this._popup) {
        this._popup.remove()
        this.fire({
          type: 'popupclose',
          popup: this._popup,
        })
      }
      return this
    }

    Polygon.prototype.togglePopup = function () {
      if (this._popup && !this._popup.isOpen()) {
        this.openPopup()
      } else {
        this.closePopup()
      }
      return this
    }

    Polygon.prototype.setPopupContent = function (content) {
      this._popup && this._popup.setHTML(content)
      return this
    }
    return () => map.remove();
  }, []);




  return (
    <>
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

const GeofencingIDWrapper = () => {
  return (
    <>
      <GeofencingID />
    </>
  )
}

export {GeofencingIDWrapper}




