import axios, {AxiosResponse} from 'axios';
const SERVER_URL=process.env.REACT_APP_SERVER_URL

export function  getProjects () {


    const data =  axios.get(`${SERVER_URL}getprojects`);
   
console.log(data)
    return data;


  }