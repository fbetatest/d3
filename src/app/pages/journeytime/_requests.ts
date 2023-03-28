import axios, {AxiosResponse} from 'axios'

const SERVER_URL = process.env.REACT_APP_SERVER_URL


type Questions = {
    fieldName: string
    fieldType: string
    fieldOptions: string
  }

export function newJourneytime(journeytimeName: string, projectName: string, 
  questions: Questions[], locationPoints: string,   endLocation: string,
  startLocation: string,
  totalDistance: number,
  totalTime: number) {
    let data = {
      journeytimeName,
      projectName,
      questions,
      locationPoints,
      endLocation,
      startLocation,
      totalDistance,
      totalTime
    }
  
    console.log(data)
    console.log(questions)
  
    return axios.put(`${SERVER_URL}newJourneytime`, data)
  }

  export function deleteJourneytime(vid: number) {
    console.log(vid)
    return axios.delete(`${SERVER_URL}deletejourneytime/${vid}`)
  }
  
  export function getJourneytime(vid: number) {
    const data = axios.get(`${SERVER_URL}getjourneytime/${vid}`)
  
    console.log(data)
    return data
  }
  
  
  export function getAllJourneytime() {
    const data = axios.get(`${SERVER_URL}getalljourneytime`)
  
    console.log(data)
    return data
  }