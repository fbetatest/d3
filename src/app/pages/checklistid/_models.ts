
import {ID, Response} from '../../../_metronic/helpers'

  export type Projects= {
    projectName?: string
    checklistName?: string
  }


  


  export type Checklist= {
    id?: ID
    projectName?: string
    checklistName?: string,
    created?: number
  }

  
export type ChecklistQueryResponse = Response<Array<Checklist>>