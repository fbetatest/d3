import axios, {AxiosResponse} from 'axios'
import {Checklist, ChecklistQueryResponse} from './_models'
import {ID, Response} from '../../../_metronic/helpers';

const SERVER_URL=`http://localhost:4000/home/`

type Answers = {
  question?: string
  fieldValue?: string
  fieldOptions: string[]
}



export function saveChecklistData(checklistName: string, checklistVid: Number, projectName: string, answers: Answers[]) {
  
  
  const data = {
    checklistName,
    projectName,
    checklistVid,
    answers
  }


  return axios.put(`${SERVER_URL}saveChecklistData`, data)

 

}

export function getChecklistData(vid: number) {
  const data = axios.get(`${SERVER_URL}getchecklistdata/${vid}`)

  console.log(data)
  return data
}