import {Link} from 'react-router-dom'

import { toAbsoluteUrl} from '../../../helpers'
import {useLayout} from '../../core'

const SidebarLogo = () => {
  const {config} = useLayout()
 
  return (
    <div className='app-sidebar-logo px-6' id='kt_app_sidebar_logo'>
      <Link to='/dashboard'>
        {config.layoutType === 'dark-sidebar' ? (
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/logos/custom-1.png')}
            className='h-25px app-sidebar-logo-default'
          />
        ) : (
          <>
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/logos/custom-1.png')}
              className='h-25px app-sidebar-logo-default theme-light-show'
            />
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/logos/custom-1.png')}
              className='h-25px app-sidebar-logo-default theme-dark-show'
            />
          </>
        )}

        <img
          alt='Logo'
          src={toAbsoluteUrl('/media/logos/custom-1.png')}
          className='h-20px app-sidebar-logo-minimize'
        />
      </Link>


    </div>
  )
}

export {SidebarLogo}
