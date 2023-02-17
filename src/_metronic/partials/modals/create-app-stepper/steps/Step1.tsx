/* eslint-disable jsx-a11y/anchor-is-valid */

import {StepProps} from '../IAppModels'

const Step1 = ({data, updateData, hasError}: StepProps) => {
  return (
    <div className='current' data-kt-stepper-element='content'>
      <div className='w-100'>
        {/*begin::Form Group */}
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Project Name</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your project name'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            name='projectname'
            placeholder=''
            value={data.appBasic.projectName}
            onChange={(e) =>
              updateData({
                appBasic: {
                  projectName: e.target.value,
          
                  description: data.appBasic.description
                },
              })
            }
          />
          {!data.appBasic.projectName && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='projectname' data-validator='notEmpty' className='fv-help-block'>
                Project name is required
              </div>
            </div>
          )}
        </div>
        {/*end::Form Group */}

        {/*begin::Form Group */}
        <div className='fv-row'>
          {/* begin::Label */}
          <label className='d-flex align-items-center fs-5 fw-semibold mb-4'>
            <span className='required'>Description</span>

            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Enter your project description'
            ></i>
          </label>

          <textarea
            
            className='form-control form-control-lg form-control-solid'
         
            placeholder=''
            value={data.appBasic.description}
            onChange={(e) =>
              updateData({
                appBasic: {
                  description: e.target.value,
                  projectName: data.appBasic.projectName,
                },
              })
            }
          ></textarea>
        
          {/* end::Label */}
         
        </div>
        {/*end::Form Group */}
      </div>
    </div>
  )
}

export {Step1}
