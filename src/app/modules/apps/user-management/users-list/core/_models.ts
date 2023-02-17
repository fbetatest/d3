import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  name?: string
  avatar?: string
  email?: string
  password?: string
  position?: string
  role?: string
  employeeid?: string
  two_steps?: boolean
  online?: boolean
  emiratesid?:string
  initials?: {
    label: string
    state: string
  }
  phone?: string
}

export type Project = {
  vid?: number,
  name?: string,
}

export type Projects = Response<Array<Project>>

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  avatar: 'avatars/300-6.jpg',
  position: 'Surveyor',
  role: 'Administrator',
  name: '',
  email: '',
  phone: '',
  password:'',
  emiratesid:''
  
}
