import axios, {AxiosResponse} from 'axios'
import {Project} from './_models'
import {ID, Response} from '../../../../_metronic/helpers';


const SERVER_URL=process.env.REACT_APP_SERVER_URL

export function createProject (projectName: string, projectDescription: string, surveyors: string[], tasks: string[]) {


    let data = {
        projectName, 
        projectDescription,
        surveyors,
        tasks
    };
  
  console.log(data);

   return  axios.put(`${SERVER_URL}createProject`,data)

  }


  export function  getSurveyors () {

    const data =  axios.get(`${SERVER_URL}getsurveyors`);
   
    return data;


  }

  export function deleteProject (vid:number) {
console.log(vid)
   return  axios.post(`${SERVER_URL}deleteProject`,{vid: vid})

  }

  export function  getProject (vid:number) {


    const data =  axios.get(`${SERVER_URL}getproject/${vid}`);
   
console.log(data)
    return data;


  }

  export function  getProjectNames () {
    const data =  axios.get(`${SERVER_URL}getprojectnames`);
    
    return data;

  }








