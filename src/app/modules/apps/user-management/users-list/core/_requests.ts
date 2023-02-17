import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {User, UsersQueryResponse, Project, Projects} from './_models'

const API_URL = process.env.REACT_APP_THEME_API_URL
const USER_URL = `${API_URL}/user`
const GET_USERS_URL = `${API_URL}/users/query`

const SERVER_URL=process.env.REACT_APP_SERVER_URL

const getProjects = (query: string): Promise<Projects > => {

  axios
    .get(`http://localhost:4000/home/getproject`).then(function(d: AxiosResponse<Projects>){
      console.log(d.data)
    })

  return axios
    .get(`${SERVER_URL}getproject`)
    .then((d: AxiosResponse<Projects>) => d.data)
}

const getUsers = (query: string): Promise<UsersQueryResponse > => {
 /*
  axios
  .get(`${SERVER_URL}getusers`).then(function(d: AxiosResponse<UsersQueryResponse>){
    console.log(d.data)
  })
  axios
  return axios
    .get(`${GET_USERS_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)

*/
  return axios
    .get(`${SERVER_URL}getusers`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}


const getUserById = (id: ID): Promise<User | undefined> => {

  return axios
  .get(`${SERVER_URL}getuser/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createUser = (user: User): Promise<User | undefined> => {
  console.log("user")
  console.log(user);
  
  return axios
    .put(`${SERVER_URL}createuser`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateUser = (user: User): Promise<User | undefined> => {
  console.log("edit");
  return axios
    .post(`${SERVER_URL}editUser/${user.id}`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  console.log(userId);
  return axios.delete(`${SERVER_URL}deleteuser/${userId}`).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${SERVER_URL}deleteuser/${id}`))
  return axios.all(requests).then(() => {})
}

export {getUsers, deleteUser, deleteSelectedUsers, getUserById, createUser, updateUser}
