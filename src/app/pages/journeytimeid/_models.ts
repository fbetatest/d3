
import {ID, Response} from '../../../_metronic/helpers'

  export type Projects= {
    projectName?: string
    journeytimeName?: string
  }


  


  export type Journeytime= {
    id?: ID
    projectName?: string
    journeytimeName?: string,
    created?: number
  }

  
export type JourneytimeQueryResponse = Response<Array<Journeytime>>