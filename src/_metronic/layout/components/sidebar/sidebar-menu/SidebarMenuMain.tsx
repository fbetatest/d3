/* eslint-disable react/jsx-no-target-blank */

import {useIntl} from 'react-intl'
import { useAuth } from '../../../../../app/modules/auth'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()
  const {currentUser} = useAuth()
  console.log(currentUser?.first_name)
  const position = currentUser?.position?.toLowerCase();
  const clientPosition = "client".toLowerCase()
  console.log(position, clientPosition)
  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title='Dashboard - Projects'
        fontIcon='bi-app-indicator'
      />
     {/* 
      <SidebarMenuItem
        to='/builder'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Layout Builder'
        fontIcon='bi-layers'
      />
       */}

{(position!== "client".toLowerCase())?  <>       
            <SidebarMenuItem
       to='/reports-page'
   
        title='Reports'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Tasks</span>
        </div>
      </div>
     
          <SidebarMenuItem
         to='/interviews-page'
        
        title='Interview'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      
      />
          <SidebarMenuItem
         to='/checklists-page'
   
        title='Checklist'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
 
      />
       <SidebarMenuItem
          to='/geofencing-page'
 
        title='Geo Fencing'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      />
          <SidebarMenuItem
           to='/journeytime-page'
       
        title='Journey Time'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
   
      />
          <SidebarMenuItem
          to='/coordinates-page'
        title='Co-ordinates'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      />
      </>:<></>}
       
    
{(currentUser?.first_name == "Admin Odc")?  
<>
  <div className='menu-item'>
  <div className='menu-content pt-8 pb-2'>
    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Admin</span>
  </div>
</div>
<SidebarMenuItem
        to='/apps/user-management/users'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
        title='User management'

      /></>:""}
     

      
    
    </>
  )
}

export {SidebarMenuMain}
