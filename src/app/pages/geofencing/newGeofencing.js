import {PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'
import {FC} from 'react'

import {useEffect, useState, useRef} from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
// styles
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import * as turf from '@turf/turf'
import './geofencing.css'
import {useNavigate} from 'react-router-dom'
import {newGeofencing} from './_requests'
import {KTSVG} from '../../../_metronic/helpers'

import {Formik, Form, Field, FieldArray} from 'formik'
import {getProjectNames} from '../projects/core/_requests'
import { polygon } from '@turf/turf'

const tomtom_api_key = process.env.REACT_APP_SERVER_TOMTOM_API

const NewGeofencing = () => {
  const navigate = useNavigate()

  const mapElement = useRef()
  const [mapLongitude, setMapLongitude] = useState(55.2708)
  const [mapLatitude, setMapLatitude] = useState(25.2048)
  const [mapZoom, setMapZoom] = useState(13)
  const [map, setMap] = useState({})



  const [projectsList, setProjectsList] = useState(['Loading..'])

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
      language: 'en-GB',
    })

    map.addControl(new tt.FullscreenControl())
    map.addControl(new tt.NavigationControl())
    setMap(map)

   
    

    
    

    const inputPopup = `
    <div class="form">
      <div class="form__row form__row--compact">
        <label class="form__label">Name 
          <input type="text" id="input-name" class="form__input">
        </label>
      </div>
     
      <div class="form__row form__row--compact">
        <input type="button" id="save-button" class="btn-submit btn-submit--save" value="Save">
      </div>
    </div>`;
  
  const turfOptions = {
    steps: 60,
    units: "meters"
  };
  
  const popupOptions = {
    maxWidth: "200px",
    
      closeButton: false,
      closeOnClick: false,
      autoClose: false,
    
  };

    let drawnShape;


 

let drawState = "polygon";

function drawPolygon(){
    const activeForm = null;
    const onMouseMove = function (e) {

      this.geometry.coordinates[this.geometry.coordinates.length - 1] = [
        e.lngLat.lng,
        e.lngLat.lat
      ];
      this.geometry.type = "LineString";
      this.redraw(this.geometry);
    };
    const onStartDrawing = function (event) {
      
      if (drawState !== "cancel") {
       
        const self = this;
        this.geometry = {
          coordinates: [
            [event.lngLat.lng, event.lngLat.lat],
            [event.lngLat.lng, event.lngLat.lat]
          ]
        };
        this.setDblClickMapListeners();
        map.on("dblclick", function () {
          self.geometry = convertLineStringToPolygon(self.geometry);
          self.redraw(self.geometry);
          self.endDrawing();
        });
      }
      else {
        this.cancelDrawing();
      }
    };
    const isPolygon = true;
   


    drawHandler(activeForm, onMouseMove, onStartDrawing);
  }


  function drawCircle(){

    drawState = "circle";
    const activeForm = null;
    const onMouseMove = function (event) {
      console.log("mousemove runnning")
      this.geometry.radius = turf.distance(
        this.geometry.coordinates,
        [event.lngLat.lng, event.lngLat.lat],
        { units: "meters" }
      );
      const geoJsonData = turf.circle(
        this.geometry.coordinates,
        this.geometry.radius,
        turfOptions
      );
      this.redraw(geoJsonData);
    };

    const onStartDrawing = function (event) {
      console.log("onStartDrawing")
      if (drawState !== "cancel") {
   
        this.geometry = {
          type: "Point",
          shapeType: "Circle",
          coordinates: [event.lngLat.lng, event.lngLat.lat]
        };
        this.setOneClickMapListeners();
      }
      else {
        this.cancelDrawing();
      }
    };

    drawHandler(activeForm, onMouseMove, onStartDrawing);

  }

  function convertLineStringToPolygon(geometry) {
    geometry.coordinates[geometry.coordinates.length - 1] =
      geometry.coordinates[0];
    geometry.type = "Polygon";
    geometry.coordinates = [geometry.coordinates];
    return geometry;
  }

  
  
    function detailsPopup(data) {

      return (`
        <div class="form">
          <div class="form__row form__row--compact"> ${data.name}</div>
          <div class="form__row form__row--compact">
            <input type="button" id="${data.id}" class="btn-submit btn-submit--remove" value="Remove">
          </div>
        </div>`
      );
    }


    function onPopupOpen(self) {
      document
        .getElementById("save-button")
        .addEventListener("click", function () {
          this.disabled = true;
          const name = document.getElementById("input-name").value;
          const id= self.polygon.id;
          const data = {name, id}
       //   self.polygon.closePopup();
          self.polygon
          .bindPopup(detailsPopup(data), popupOptions).openPopup()

          if(self.polygon.isPopupOpen){
            console.log(self.polygon.id)
           document
            .getElementById(`${data.id}`)
            .addEventListener("click", function () {
             console.log(this.id)

             self.polygon.remove();
          
            // self.polygon.remove();
            });
          }

        
          

    


          

  
        });
       
      
    }


    const shape = {

      startDrawing: function (event) {
        console.log("shape.startDrawing")
        this.polygon = new Polygon().addTo(map);
        this.setEscapeHandler();
        this.onStartDrawing(event);
      },
      endDrawing: function () {
        console.log("endDrawing-shape")
        const self = this;
    
        map.off("mousemove", this.onMouseMove);
       map.off("click", this.addVertex);
        map.off("click", this.endDrawing);
        map.off("dblclick", this.finishPolygon);
        map.on("dblclick", this.finishPolygon);
        map.on("click", drawnShape.startDrawing);
        map.on("click", this.addVertex);
      

       
        
        this.polygon
    .bindPopup(inputPopup, {maxWidth: '150px'})
    .once("popupopen", function () {
      onPopupOpen(self);
    })
    .openPopup();
        
      },
      cancelDrawing: function () {
        map.off("mousemove", this.onMouseMove);
        map.off("click", this.startDrawing);
        map.off("click", this.endDrawing);
        map.off("click", this.addVertex);
        map.off("dblclick", this.finishPolygon);
        this.polygon && this.polygon.remove();
        drawnShape = null;
        document.onkeydown = null;
      },
      setOneClickMapListeners: function () {
        map.off("click", this.startDrawing);
        map.on("mousemove", this.onMouseMove);
        map.on("click", this.endDrawing);
      },
      setDblClickMapListeners: function () {
        map.off("click", this.startDrawing);
        map.on("mousemove", this.onMouseMove);
        map.on("click", this.addVertex);
      },
      addVertex: function (event) {
        console.log("add vertex")
        const oneBeforeLastCoordinate = this.geometry.coordinates[
          this.geometry.coordinates.length - 2
        ];
        if (
          oneBeforeLastCoordinate[0] !== event.lngLat.lng &&
          oneBeforeLastCoordinate[1] !== event.lngLat.lat
        ) {
          this.geometry.coordinates.push([event.lngLat.lng, event.lngLat.lat]);
        }
      },
      finishPolygon: function () {
        console.log("entered fP")
       
        if (this.isPolygon) {
          console.log(this.geometry)
          this.geometry = convertLineStringToPolygon(this.geometry);
          this.redraw();
        } else {
          console.log(this.geometry.coordinates.pop)
          this.geometry.coordinates.pop();
        }
        this.endDrawing();
      },
      redraw: function (geoJsonData) {
        this.polygon.setData(geoJsonData);
      },
      setEscapeHandler: function () {
        const self = this;
        document.onkeydown = function (event) {
          if (event.key === "Escape" || event.key === "Esc") {
            drawState = "cancel";
            self.cancelDrawing();
          }
        };
      }
    };

   drawPolygon();

   //drawCircle();

    

    function drawHandler(activeForm, onMouseMove, onStartDrawing, isPolygon) {
   console.log("drawhandler")

   if (drawnShape) {
    drawnShape.cancelDrawing();
  }

  drawnShape = Object.create(shape);
  drawnShape.startDrawing = drawnShape.startDrawing.bind(drawnShape);
  drawnShape.endDrawing = drawnShape.endDrawing.bind(drawnShape);
  drawnShape.addVertex = drawnShape.addVertex.bind(drawnShape);
  drawnShape.finishPolygon = drawnShape.finishPolygon.bind(drawnShape);
  drawnShape.onMouseMove = onMouseMove.bind(drawnShape);
  drawnShape.onStartDrawing = onStartDrawing.bind(drawnShape);
  drawnShape.isPolygon = isPolygon;

  map.on("click", drawnShape.startDrawing);
}

    


     

     


    function uuidv4() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    function Polygon(data, options) {
      tt.Evented.call(this);
    
      var defaultOptions = {
        style: {
          stroke: true,
          color: "#61ade0",
          opacity: 0.8,
          fillOpacity: 0.2,
          lineJoin: "round",
          lineCap: "round",
          weight: 3
        }
      };
    
      this.id = uuidv4();
      this.data = data || turf.featureCollection([]);
      this.options = Object.assign({}, defaultOptions, options);
    
      this.handleClick = this.handleClick.bind(this);
    }
    
    Object.setPrototypeOf(Polygon.prototype, tt.Evented.prototype);
    Object.setPrototypeOf(Polygon, tt.Evented);
    
    Polygon.prototype.addTo = function(map) {
      var style = this.options.style;
    
      map.addSource(this.id, {
        type: "geojson",
        data: this.data || {}
      });
    
      if (style.stroke) {
        map.addLayer({
          id: this.id + "_line",
          type: "line",
          source: this.id,
          layout: {
            "line-join": style.lineJoin,
            "line-cap": style.lineCap
          },
          paint: {
            "line-color": style.color,
            "line-opacity": style.opacity,
            "line-width": style.weight
          }
        });
      }
    
      map.addLayer({
        id: this.id + "_fill",
        type: "fill",
        source: this.id,
        layout: {},
        paint: {
          "fill-color": style.fillColor || style.color,
          "fill-opacity": style.fillOpacity
        }
      });
    
      map.on("click", this.id + "_fill", this.handleClick);
    
      this._map = map;
    
      return this;
    };
    
    Polygon.prototype.remove = function() {
      if (this._popup) {
        this.closePopup();
      }
    
      if (this._map) {
        this._map.off("click", this.id + "_fill", this.handleClick);
    
        this.options.style.stroke && this._map.removeLayer(this.id + "_line");
        this._map.removeLayer(this.id + "_fill");
        this._map.removeSource(this.id);
    
        this._map = null;
      }
    
      return this;
    };
    
    Polygon.prototype.getData = function() {
      return this.data;
    };
    
    Polygon.prototype.setData = function(data) {
      this.data = data;
    
      if (this._map) {
        var source = this._map.getSource(this.id);
        source.setData(data);
      }
    
      return this;
    };
    
    Polygon.prototype.handleClick = function(event) {
      if (this._popup) {
        this.openPopup(event.lngLat);
      }
    
      this.fire({
        type: "click",
        point: event.point,
        lngLat: event.lngLat,
        target: this
      });
    };
    
    Polygon.prototype.getPopup = function() {
      return this._popup;
    };
    
    Polygon.prototype.bindPopup = function(content, popupOptions) {
      this._popup && this._popup.remove();
      this._popup = new tt.Popup(popupOptions).setHTML(content);
      return this;
    };
    
    Polygon.prototype.isPopupOpen = function() {
      return this._popup && this._popup.isOpen();
    };
    
    Polygon.prototype.openPopup = function(lngLat) {
      if (this._popup && this._map) {
        lngLat = lngLat || turf.centroid(this.data).geometry.coordinates;
    
        if (!this.isPopupOpen()) {
          this._popup.addTo(this._map);
        }
    
        this._popup.setLngLat(lngLat);
    
        this.fire({
          type: "popupopen",
          popup: this._popup
        });
      }
      return this;
    };
    
    Polygon.prototype.closePopup = function() {
      if (this._popup) {
        this._popup.remove();
        this.fire({
          type: "popupclose",
          popup: this._popup
        });
      }
      return this;
    };
    
    Polygon.prototype.togglePopup = function() {
      if (this._popup && !this._popup.isOpen()) {
        this.openPopup();
      } else {
        this.closePopup();
      }
      return this;
    };
    
    Polygon.prototype.setPopupContent = function(content) {
      this._popup && this._popup.setHTML(content);
      return this;
    };
    

  
    

    
    
    return () => map.remove()
  }, [])
  return (
    <>
      <PageTitle breadcrumbs={[]}>Create New Geofencing</PageTitle>

      <div className='card card-xxl-stretch mb-5 mb-xxl-8 mw-800px'>
        <div className='card-body py-3 pt-3 pb-3'>
          <div className='row g-5 gx-xxl-12'>
            <div className='col-xxl-12'>
              <Formik
                initialValues={{
                  geofencingName: '',
                  projectName: '',
                  questions: [{fieldName: '', fieldType: 'text', fieldOptions: ''}],
                }}
                onSubmit={(values) => {
                  console.log(values)

                  newGeofencing(values.geofencingName, values.projectName, values.questions).then(
                    () => {
                      navigate('/geofencing-page')
                    }
                  )
                }}
              >
                {(formik) => (
                  <Form>
                    <label htmlFor='geofencingName' className='fw-bold fs-6 mb-2 mt-4'>
                      Geofencing Name
                    </label>
                    <input
                      id='geofencingName'
                      name='geofencingName'
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-4'
                      onChange={formik.handleChange}
                      value={formik.values.geofencingName}
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
                      Geofencing Map
                    </label>
                    <div ref={mapElement} className='mapDiv' />
               

                    <div className='card-footer'>
                      <button type='submit' className='btn btn-lg btn-primary'>
                        {' '}
                        Create Geofencing{' '}
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

const NewGeofencingWrapper = () => {
  return (
    <>
      <NewGeofencing />
    </>
  )
}

export {NewGeofencingWrapper}
