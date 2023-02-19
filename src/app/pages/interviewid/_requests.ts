import axios, {AxiosResponse} from 'axios'
import {Interview, InterviewQueryResponse} from './_models'
import {ID, Response} from '../../../_metronic/helpers';

const SERVER_URL = process.env.REACT_APP_SERVER_URL

type Answers = {
  question?: string
  fieldValue?: string
  fieldOptions: string[]
}



export function saveInterviewData(interviewName: string, interviewVid: Number, projectName: string, answers: Answers[]) {
  
  
  const data = {
    interviewName,
    projectName,
    interviewVid,
    answers
  }


  return axios.put(`${SERVER_URL}saveInterviewData`, data)

 

}

export function getInterviewData(vid: number) {
  const data = axios.get(`${SERVER_URL}getinterviewdata/${vid}`)

  console.log(data)
  return data
}