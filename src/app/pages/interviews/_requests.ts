import axios, {AxiosResponse} from 'axios'

import {ID, Response} from '../../../_metronic/helpers'
import {string} from 'yup'
import {stringify} from 'querystring'

const SERVER_URL = process.env.REACT_APP_SERVER_URL



type Questions = {
  fieldName: string
  fieldType: string
  fieldOptions: string
}

export function newInterview(interviewName: string, projectName: string, surveyorname: string[], questions: Questions[]) {
  let data = {
    interviewName,
    projectName,
    surveyorname,
    questions,
  }

  console.log(data)
  console.log(questions)

  return axios.put(`${SERVER_URL}newInterview`, data)
}

export function editInterview(interviewName: string, projectName: string,surveyorname: string[], questions: Questions[], vid: number) {
  let data = {
    interviewName,
    projectName,
    surveyorname,
    questions,
    vid
  }

  console.log(data)
  console.log(questions)

  return axios.put(`${SERVER_URL}editInterview`, data)
}

export function duplicateInterview(vid: number, created: number){
const data ={
  vid,
  created
}
console.log(data)
return axios.put(`${SERVER_URL}duplicateinterview`, data)
}

export function deleteInterview(vid: number) {
  console.log(vid)
  return axios.delete(`${SERVER_URL}deleteinterview/${vid}`)
}

export function getInterview(vid: number) {
  const data = axios.get(`${SERVER_URL}getinterview/${vid}`)

  console.log(data)
  return data
}


export function getAllInterview() {
  const data = axios.get(`${SERVER_URL}getallinterview`)

  console.log(data)
  return data
}




