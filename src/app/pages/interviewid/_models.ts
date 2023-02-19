
import {ID, Response} from '../../../_metronic/helpers'

  export type Projects= {
    projectName?: string
    checklistName?: string
  }


  


  export type Interview= {
    id?: ID
    projectName?: string
    checklistName?: string,
    created?: number
  }

  
export type InterviewQueryResponse = Response<Array<Interview>>