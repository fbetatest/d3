import {KTSVG} from '../../../_metronic/helpers'

import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {FC} from 'react'
import { deleteChecklist, getAllChecklist} from './_requests'

type Props = {
  className: string
}

const TablesWidget11: React.FC<Props> = ({className}) => {
  const [checklistData, setChecklistData] = useState([
    {id: 0, checklistName: 'Loading..', projectName: '', created: 0},
  ])

  useEffect(() => {
    getAllChecklist().then((val)=>{
   const {data} = val;
   console.log(data);
   setChecklistData(data)
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
                            to={'../checklist/' + val.created}
                            className='text-dark fw-bold text-hover-primary mb-1 fs-6'
                          >
                            {val.checklistName}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className='mw-150px'> 
                      <span className='badge-light-primary fs-7 fw-semibold'>
                        {' '}
                        {val.projectName}
                      </span>
                    </td>

                    <td>
                      <a
                        href='#'
                        className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'
                      >
                        {val.created ? new Date(val.created).toDateString() : ' '}
                      </a>
                    </td>

                    <td className='text-end'>
                    
                      <button
                        onClick = { () => {deleteChecklist(val.created); setChecklistData(checklistData.filter(item => item.created !== val.created))} }
                  
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen027.svg'
                          className='svg-icon-3'
                        />
                      </button>
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

