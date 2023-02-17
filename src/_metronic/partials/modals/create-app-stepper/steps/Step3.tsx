/* eslint-disable jsx-a11y/anchor-is-valid */
import {StepProps} from '../IAppModels'

const Step3 = ({data, updateData, hasError}: StepProps) => {
  return (
    <>
      {/*begin::Step 3 */}
      <div className='pb-5' data-kt-stepper-element='content'>
      <div className='w-100'>
        {/*begin::Form Group */}
        <div className='fv-row'>
          {/* begin::Label */}
          <label className='d-flex align-items-center fs-5 fw-semibold mb-4'>
            <span className='required'>Select Tasks</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your apps framework'
            ></i>
          </label>
          {/* end::Label */}
          {/*begin:Option */}
          <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
            <span className='d-flex align-items-center me-2'>
   
              <span className='d-flex flex-column'>
              <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              name='interviews'
            />
            <label className='px-3 fw-bold fs-6'>Interviews</label>
          </div>
              </span>
            </span>
          </label>

          <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
            <span className='d-flex align-items-center me-2'>
   
              <span className='d-flex flex-column'>
              <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              name='checklists'
            />
            <label className='px-3 fw-bold fs-6'>Checklists</label>
          </div>
              </span>
            </span>
          </label>


          <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
            <span className='d-flex align-items-center me-2'>
   
              <span className='d-flex flex-column'>
              <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              name='geofencing'
            />
            <label className='px-3 fw-bold fs-6'>Geo-fencing</label>
          </div>
              </span>
            </span>
          </label>

          <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
            <span className='d-flex align-items-center me-2'>
   
              <span className='d-flex flex-column'>
              <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              name='journeytime'
            />
            <label className='px-3 fw-bold fs-6'>Journey Time</label>
          </div>
              </span>
            </span>
          </label>

          <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
            <span className='d-flex align-items-center me-2'>
   
              <span className='d-flex flex-column'>
              <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              name='coordinates'
            />
            <label className='px-3 fw-bold fs-6'>Co-ordinates</label>
          </div>
              </span>
            </span>
          </label>

          <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
            <span className='d-flex align-items-center me-2'>
   
              <span className='d-flex flex-column'>
              <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              name='ticketsraised'
            />
            <label className='px-3 fw-bold fs-6'>Tickets Raised</label>
          </div>
              </span>
            </span>
          </label>
          
     
        
        
         
          {/*end::Option */}
        </div>
        {/*end::Form Group */}
      </div>
    </div>
      {/*end::Step 3 */}
    </>
  )
}

export {Step3}
