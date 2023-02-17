/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG} from '../../../helpers'

type Props = {
  className: string
}

const TablesWidget5: React.FC<Props> = ({className}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Latest Projects</span>
        </h3>
        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
  
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
          </button>
      
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        <div className='tab-content'>
          {/* begin::Tap pane */}
          <div className='tab-pane fade show active' id='kt_table_widget_5_tab_1'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4'>
                {/* begin::Table head */}
                <thead>
                  <tr className='border-0'>
                    
                    <th className='p-0 min-w-150px'></th>
                    <th className='p-0 min-w-140px'></th>
                    <th className='p-0 min-w-70px'></th>
                    <th className='p-0 min-w-70px'></th>
                    <th className='p-0 min-w-70px'></th>
                    <th className='p-0 min-w-50px'></th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  <tr>
                  
                    <td>
                      <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                       Dubai Project #5
                      </a>
                    
                    </td>
                    <td className='text-end  fw-semibold text-hover-primary'>Tickets </td>
                    <td className='text-end  fw-semibold text-hover-primary'>Checklists</td>
                    <td className='text-end  fw-semibold text-hover-primary'>Geo-Fencing </td>
                    <td className='text-end'>
                    <span className='badge badge-light-warning'>In Progress</span>
                    </td>
                    <td className='text-end'>
                      <a
                        href='#'
                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                      >
                        <KTSVG
                          path='/media/icons/duotune/arrows/arr064.svg'
                          className='svg-icon-2'
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    
                    <td>
                      <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                        Sharjah Project #3
                      </a>
                     
                    </td>
                    <td className='text-end  fw-semibold text-hover-primary'>Tickets </td>
                    <td className='text-end  fw-semibold text-hover-primary'>Checklists</td>
                    <td className='text-end  fw-semibold text-hover-primary'>Geo-Fencing </td>
                    <td className='text-end'>
                    <span className='badge badge-light-warning'>In Progress</span>
                    </td>
                    <td className='text-end'>
                      <a
                        href='#'
                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                      >
                        <KTSVG
                          path='/media/icons/duotune/arrows/arr064.svg'
                          className='svg-icon-2'
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                  
                    <td>
                      <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                        Abu Dhabi Project #2
                      </a>
                     
                    </td>
                    <td className='text-end  fw-semibold text-hover-primary'>Tickets </td>
                    <td className='text-end  fw-semibold text-hover-primary'>Checklists</td>
                    <td className='text-end  fw-semibold text-hover-primary'>Geo-Fencing </td>
                    <td className='text-end'>
                    <span className='badge badge-light-warning'>In Progress</span>
                    </td>
                    <td className='text-end'>
                      <a
                        href='#'
                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                      >
                        <KTSVG
                          path='/media/icons/duotune/arrows/arr064.svg'
                          className='svg-icon-2'
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                 
                    <td>
                      <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                        Dubai Project #3
                      </a>
                 
                    </td>
                    <td className='text-end  fw-semibold text-hover-primary'>Tickets </td>
                    <td className='text-end  fw-semibold text-hover-primary'>Checklists</td>
                    <td className='text-end  fw-semibold text-hover-primary'>Geo-Fencing </td>
                    <td className='text-end'>
                    <span className='badge badge-light-warning'>In Progress</span>
                    </td>
                    <td className='text-end'>
                      <a
                        href='#'
                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                      >
                        <KTSVG
                          path='/media/icons/duotune/arrows/arr064.svg'
                          className='svg-icon-2'
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                  
                    <td>
                      <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                        Dubai Project #2
                      </a>
                  
                    </td>
                    <td className='text-end  fw-semibold text-hover-primary'>Tickets </td>
                    <td className='text-end  fw-semibold text-hover-primary'>Checklists</td>
                    <td className='text-end  fw-semibold text-hover-primary'>Geo-Fencing </td>
                    <td className='text-end'>
                      <span className='badge badge-light-warning'>In Progress</span>
                    </td>
                    <td className='text-end'>
                      <a
                        href='#'
                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                      >
                        <KTSVG
                          path='/media/icons/duotune/arrows/arr064.svg'
                          className='svg-icon-2'
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                  
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                      Dubai Project #1
                    </a>
                
                  </td>
                  <td className='text-end  fw-semibold text-hover-primary'>Tickets </td>
                  <td className='text-end  fw-semibold text-hover-primary'>Checklists</td>
                  <td className='text-end  fw-semibold text-hover-primary'>Geo-Fencing </td>
                  <td className='text-end'>
                    <span className='badge badge-light-warning'>In Progress</span>
                  </td>
                  <td className='text-end'>
                    <a
                      href='#'
                      className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                    >
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr064.svg'
                        className='svg-icon-2'
                      />
                    </a>
                  </td>
                </tr>
                <tr>
                  
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                      Abu Dhabi Project #1
                    </a>
                
                  </td>
                  <td className='text-end  fw-semibold text-hover-primary'>Tickets </td>
                  <td className='text-end  fw-semibold text-hover-primary'>Checklists</td>
                  <td className='text-end  fw-semibold text-hover-primary'>Geo-Fencing </td>
                  <td className='text-end'>
                    <span className='badge badge-light-warning'>In Progress</span>
                  </td>
                  <td className='text-end'>
                    <a
                      href='#'
                      className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                    >
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr064.svg'
                        className='svg-icon-2'
                      />
                    </a>
                  </td>
                </tr>
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
            {/* end::Table */}
          </div>
          {/* end::Tap pane */}

        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}

export {TablesWidget5}
