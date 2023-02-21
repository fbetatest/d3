import axios, {AxiosResponse} from 'axios'

const SERVER_URL = process.env.REACT_APP_SERVER_URL


type Questions = {
    fieldName: string
    fieldType: string
    fieldOptions: string
  }

export function newCoordinates(coordinatesName: string, projectName: string, questions: Questions[]) {
    let data = {
      coordinatesName,
      projectName,
      questions,
    }
  
    console.log(data)
    console.log(questions)
  
    return axios.put(`${SERVER_URL}newCoordinates`, data)
  }

  export function deleteCoordinates(vid: number) {
    console.log(vid)
    return axios.delete(`${SERVER_URL}deletecoordinates/${vid}`)
  }
  
  export function getCoordinates(vid: number) {
    const data = axios.get(`${SERVER_URL}getcoordinates/${vid}`)
  
    console.log(data)
    return data
  }
  
  
  export function getAllCoordinates() {
    console.log("get coordinates")
    const data = axios.get(`${SERVER_URL}getallcoordinates`)
  
    console.log(data)
    return data
  }