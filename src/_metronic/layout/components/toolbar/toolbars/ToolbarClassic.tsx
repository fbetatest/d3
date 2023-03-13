/* eslint-disable jsx-a11y/anchor-is-valid */

import {useState} from 'react'
import { Link } from "react-router-dom";
import {CreateAppModal} from '../../../../partials'
import {useLayout} from '../../../core'

const ToolbarClassic = () => {
  const {config} = useLayout()
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
 
  return (
    <div className='d-flex align-items-center gap-2 gap-lg-3'>
      

 

   

     
      
    </div>
  )
}

export {ToolbarClassic}
