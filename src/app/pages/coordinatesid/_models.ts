
import {ID, Response} from '../../../_metronic/helpers'

  export type Projects= {
    projectName?: string
    geofencingName?: string
  }


  


  export type Geofencing= {
    id?: ID
    projectName?: string
    geofencingName?: string,
    created?: number
  }

  
export type GeofencingQueryResponse = Response<Array<Geofencing>>