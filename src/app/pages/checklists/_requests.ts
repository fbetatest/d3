import axios, {AxiosResponse} from 'axios'
import {Checklist, ChecklistQueryResponse} from './_models'
import {ID, Response} from '../../../_metronic/helpers'
import {string} from 'yup'
import {stringify} from 'querystring'

const SERVER_URL = process.env.REACT_APP_SERVER_URL



type Questions = {
  fieldName: string
  fieldType: string
  fieldOptions: string
}

export function newChecklist(checklistName: string, projectName: string, questions: Questions[]) {
  let data = {
    checklistName,
    projectName,
    questions,
  }

  console.log(data)
  console.log(questions)

  return axios.put(`${SERVER_URL}newChecklist`, data)
}

export function deleteChecklist(vid: number) {
  console.log(vid)
  return axios.delete(`${SERVER_URL}deletechecklist/${vid}`)
}

export function getChecklist(vid: number) {
  const data = axios.get(`${SERVER_URL}getchecklist/${vid}`)

  console.log(data)
  return data
}


export function getAllChecklist() {
  const data = axios.get(`${SERVER_URL}getallchecklist`)

  console.log(data)
  return data
}




