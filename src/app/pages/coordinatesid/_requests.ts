import axios, {AxiosResponse} from 'axios'

import {ID, Response} from '../../../_metronic/helpers';

const SERVER_URL = process.env.REACT_APP_SERVER_URL

type Answers = {
  question?: string
  fieldValue?: string
  fieldOptions: string[]
}



export function saveCoordinatesData(coordinatesName: string, coordinatesVid: Number, projectName: string, answers: Answers[]) {
  
  
  const data = {
    coordinatesName,
    projectName,
    coordinatesVid,
    answers
  }


  return axios.put(`${SERVER_URL}saveCoordinatesData`, data)

 

}

export function getCoordinatesData(vid: number) {
  const data = axios.get(`${SERVER_URL}getcoordinatesdata/${vid}`)

  console.log(data)
  return data
}

export function getCoordinatesByProject(id: String){
  console.log(id)
  const data = axios.post(`${SERVER_URL}getcoordinatesbyproject`,{"id":id})

  
  return data

}