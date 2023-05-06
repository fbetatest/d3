import {KTSVG} from '../../../_metronic/helpers'

import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {FC} from 'react'
import { deleteChecklist, duplicateChecklist, getAllChecklist} from './_requests'
import { useAuth } from '../../modules/auth'
type Props = {
  className: string
}

const TablesWidget11: React.FC<Props> = ({className}) => {
  const [checklistData, setChecklistData] = useState([
    {id: 0, checklistName: 'Loading..', projectName: '', surveyorname:[], created: 0, vid:0},
  ])
  const {currentUser} = useAuth()
  useEffect(() => {
    getAllChecklist().then((val)=>{
   const {data} = val;
   console.log(data);
   if(currentUser?.first_name == "Admin Odc"){
   setChecklistData(data)
   }

   else{
    let checklistDataTemp: any= [];

  data.map((v : any)=>{
    if(v.surveyorname.length){
   v.surveyorname.map((surveyor : string)=>{
   if(surveyor==currentUser?.first_name  ){
    checklistDataTemp.push(v)
   }
   })
  }
  else{
    checklistDataTemp.push(v)
  }
  })


  setChecklistData(checklistDataTemp);
}
    })
    
  }, [])


  return (
    <div className={`card ${className}`}>
      <div></div>
   
      {/* begin::Header */}

      <div className='card-header  border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Checklists</span>
        </h3>
        <div className='card-toolbar'>
          <Link
            to='/new-checklist'
            className='btn btn-sm btn-light-primary'
         
          >
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
            New Checklist
          </Link>
        </div>
      </div>

      <div></div>

      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='ps-4 rounded-start'>No.</th>
                <th className=''>Name</th>
                <th className=''>Project</th>
                <th className=''>Created On</th>

                <th className='min-w-20px text-end rounded-end'></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}

            <tbody>
              {checklistData.map((val, id) => {
                return (
                  <tr key={id}>
                    <td>
                      <div className='ps-4'>{id + 1}</div>
                    </td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='d-flex justify-content-start flex-column'>
                          <Link
                            to={'../checklist/' + val.vid}
                            className='text-dark fw-bold text-hover-primary mb-1 fs-6'
                          >
                            {val.checklistName}

                          </Link>
                         {val.surveyorname.length?
                         <div>
                             {val.surveyorname.map((v, id) => {
                          return <span className='badge badge-light-warning fs-7 fw-semibold me-2 mt-1' key={id}>
                            {v}
                            </span>
                             
                        })
                      }
                         </div>:<></>} 
                        </div>
                      </div>
                    </td>
                    <td className="mw-150px">
                      <span className='badge-light-primary fs-7 fw-semibold'>
                        {' '}
                        {val.projectName}
                      </span>
                    </td>

                    <td className="mw-100px">
                      <span
                       
                        className='text-dark fw-bold d-block mb-1 fs-6'
                      >
                        {val.created ? new Date(val.created).toDateString() : ' '}
                      </span>
                    </td>

                    <td className='text-end'>

                    <button
                      //duplicate button
                      onClick = { () => {  
                        
                        const iTemp=checklistData.filter(item => item.vid == val.vid)[0];
                        const created = Date.now();
                          duplicateChecklist( iTemp.vid, created)
                        const newChecklist = {id: 0, 
                          checklistName: iTemp.checklistName, 
                          projectName: iTemp.projectName,
                          surveyorname: iTemp.surveyorname, created: created, vid:created}

                        
                        console.log(iTemp);setChecklistData([ newChecklist, ...checklistData]) } }
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm mb-1 ms-3'
                      >
                        <KTSVG
                          path='/media/icons/duotune/arrows/arr013.svg'
                          className='svg-icon-3'
                          
                        />
                      </button>
                    <Link to={'../edit-checklist/' + val.vid}>
                    <button
                      //edit button
                  
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm mb-1 ms-3'
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen055.svg'
                          className='svg-icon-3'
                        />
                      </button>
                      </Link>
                      {(currentUser?.first_name == "Admin Odc")?
                      <button
                        onClick = { () => {deleteChecklist(val.vid); setChecklistData(checklistData.filter(item => item.vid !== val.vid))} }
                  
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-3 mb-1'
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen027.svg'
                          className='svg-icon-3'
                        />
                      </button>:""
                }

                     
                    </td>
                  </tr>
                )
              })}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

const ChecklistsView: FC = () => {
  return (
    <>
      <TablesWidget11 className='card-xxl-stretch mb-5 mb-xxl-8' />
    </>
  )
}

export {ChecklistsView}

