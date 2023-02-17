
import { useParams } from "react-router-dom";

import {PageTitle} from '../../../../_metronic/layout/core'
import {FC} from 'react'
import {useFormik} from 'formik'
import {useState, useEffect} from 'react'
import { getProject } from "../core/_requests";

const ProjectsID: FC = () => {
    const [projectsData, setProjectsData] = useState(
        {vid: 0, projectName: 'Loading..', created: 0, projectDescription: '', surveyors: [], tasks: []},
      )
    

  let {id} = useParams();
  let tempId= "0";
  if(id) tempId = id;
  console.log(id);
const vid: number = +tempId;
  useEffect(() => {
    console.log("useEffect")
    getProject(vid).then(val => {
      const {data} = val;
      setProjectsData(data)
      console.log(data);
      console.log(projectsData)
      
    }
    )
  }, []);

  return <>

<div className='card card-xxl-stretch mb-5 mb-xxl-8 mw-800px'>
        <div className='card-body py-3 pt-3 pb-3'>
          <div className='row g-5 gx-xxl-12'>
            <div className='col-xxl-12'>
<div className="fw-bold fs-3 my-0">{projectsData.projectName}</div>
                    <div className="mt-4">{projectsData.projectDescription}</div>
                    <div className="mt-4"> {projectsData.created ? "Created on: "+  new Date(projectsData.created).toDateString() : ' '}</div>
                    <div className="mt-4">Surveyors: {projectsData.surveyors.map((v, id) => {
                          return <span className='badge badge-light-primary fs-7 fw-semibold me-2' key={id}>
                            {v}
                            </span>
                        })
                        }</div>

<div className="mt-4">Tasks: {projectsData.tasks.map((v, id) => {
                          return <span className='badge badge-light-warning fs-7 fw-semibold me-2 mt-1' key={id}>
                            {v}
                            </span>
                        })
                        }</div>

                        </div>
                        </div>
                        </div>
                        </div>
                        
</>

}


const ProjectsIDWrapper: FC = () => {


 
   
    return (
      <>
          <PageTitle breadcrumbs={[]}>Project View</PageTitle>
       <ProjectsID />
      </>
    )
  }
  
  export  {ProjectsIDWrapper}


    /*
  {projectsData.map((val, id) => {
                return (
<div key={id}>
                    <div className="fw-bold fs-3 my-0">{val.projectName}</div>
                    <div>{val.projectDescription}</div>
                    <div>Created on: {val.created}</div>
                    
                    </div>

                )
  })}
  */