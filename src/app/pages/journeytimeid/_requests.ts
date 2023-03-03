import axios, {AxiosResponse} from 'axios'

import {ID, Response} from '../../../_metronic/helpers';

const SERVER_URL = process.env.REACT_APP_SERVER_URL

type Answers = {
  question?: string
  fieldValue?: string
  fieldOptions: string[]
}



export function saveJourneytimeData(journeytimeName: string, journeytimeVid: Number, projectName: string, answers: Answers[]) {
  
  
  const data = {
    journeytimeName,
    projectName,
    journeytimeVid,
    answers
  }


  return axios.put(`${SERVER_URL}saveJourneytimeData`, data)

 

}

export function getJourneytimeData(vid: number) {
  const data = axios.get(`${SERVER_URL}getjourneytimedata/${vid}`)

  console.log(data)
  return data
}

export function getJourneytimeByProject(id: String){
  console.log(id)
  const data = axios.post(`${SERVER_URL}getjourneytimebyproject`,{"id":id})

  
  return data

}