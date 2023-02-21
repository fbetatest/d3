import axios, {AxiosResponse} from 'axios'

const SERVER_URL = process.env.REACT_APP_SERVER_URL


type Questions = {
    fieldName: string
    fieldType: string
    fieldOptions: string
  }

export function newGeofencing(geofencingName: string, projectName: string, questions: Questions[]) {
    let data = {
      geofencingName,
      projectName,
      questions,
    }
  
    console.log(data)
    console.log(questions)
  
    return axios.put(`${SERVER_URL}newGeofencing`, data)
  }

  export function deleteGeofencing(vid: number) {
    console.log(vid)
    return axios.delete(`${SERVER_URL}deletegeofencing/${vid}`)
  }
  
  export function getGeofencing(vid: number) {
    const data = axios.get(`${SERVER_URL}getgeofencing/${vid}`)
  
    console.log(data)
    return data
  }
  
  
  export function getAllGeofencing() {
    const data = axios.get(`${SERVER_URL}getallgeofencing`)
  
    console.log(data)
    return data
  }