/* eslint-disable jsx-a11y/anchor-is-valid */
import {StepProps} from '../IAppModels'

const Step2 = ({data, updateData}: StepProps) => {
  return (
    <div className='pb-5' data-kt-stepper-element='content'>
      <div className='w-100'>
        {/*begin::Form Group */}
        <div className='fv-row'>
          {/* begin::Label */}
          <label className='d-flex align-items-center fs-5 fw-semibold mb-4'>
            <span className='required'>Select Surveyors</span>
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
              <label className='form-check form-check-sm form-check-custom form-check-solid me-5'>
              <input className='form-check-input' type='checkbox' value='1' />
              <span className=' fw-bolder fs-6 px-3'>Max Smith</span>
            </label>
        
              </span>
            </span>

         
          </label>
          <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
            <span className='d-flex align-items-center me-2'>

           
          
              
              <span className='d-flex flex-column'>
              <label className='form-check form-check-sm form-check-custom form-check-solid me-5'>
              <input className='form-check-input' type='checkbox' value='1' />
              <span className=' fw-bolder fs-6 px-3'>Francis Mitcham</span>
            </label>
        
              </span>
            </span>

         
          </label>
          <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
            <span className='d-flex align-items-center me-2'>

           
          
              
              <span className='d-flex flex-column'>
              <label className='form-check form-check-sm form-check-custom form-check-solid me-5'>
              <input className='form-check-input' type='checkbox' value='1' />
              <span className=' fw-bolder fs-6 px-3'>Neil Owen</span>
            </label>
        
              </span>
            </span>

         
          </label>
          <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
            <span className='d-flex align-items-center me-2'>

           
          
              
              <span className='d-flex flex-column'>
              <label className='form-check form-check-sm form-check-custom form-check-solid me-5'>
              <input className='form-check-input' type='checkbox' value='1' />
              <span className=' fw-bolder fs-6 px-3'>Dan Wilson</span>
            </label>
        
              </span>
            </span>

         
          </label>
          <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
            <span className='d-flex align-items-center me-2'>

           
          
              
              <span className='d-flex flex-column'>
              <label className='form-check form-check-sm form-check-custom form-check-solid me-5'>
              <input className='form-check-input' type='checkbox' value='1' />
              <span className=' fw-bolder fs-6 px-3'>Annette Smith</span>
            </label>
        
              </span>
            </span>

         
          </label>
          <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
            <span className='d-flex align-items-center me-2'>

           
          
              
              <span className='d-flex flex-column'>
              <label className='form-check form-check-sm form-check-custom form-check-solid me-5'>
              <input className='form-check-input' type='checkbox' value='1' />
              <span className=' fw-bolder fs-6 px-3'>John Miller</span>
            </label>
        
              </span>
            </span>

         
          </label>
         
          {/*end::Option */}
        </div>
        {/*end::Form Group */}
      </div>
    </div>
  )
}

export {Step2}
