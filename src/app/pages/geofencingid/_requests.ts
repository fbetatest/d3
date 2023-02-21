import axios, {AxiosResponse} from 'axios'

import {ID, Response} from '../../../_metronic/helpers';

const SERVER_URL = process.env.REACT_APP_SERVER_URL

type Answers = {
  question?: string
  fieldValue?: string
  fieldOptions: string[]
}



export function saveGeofencingData(geofencingName: string, geofencingVid: Number, projectName: string, answers: Answers[]) {
  
  
  const data = {
    geofencingName,
    projectName,
    geofencingVid,
    answers
  }


  return axios.put(`${SERVER_URL}saveGeofencingData`, data)

 

}

export function getGeofencingData(vid: number) {
  const data = axios.get(`${SERVER_URL}getgeofencingdata/${vid}`)

  console.log(data)
  return data
}

export function getGeofencingByProject(id: String){
  console.log(id)
  const data = axios.post(`${SERVER_URL}getgeofencingbyproject`,{"id":id})

  
  return data

}