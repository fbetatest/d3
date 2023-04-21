import {useEffect} from 'react'
import {useLocation} from 'react-router'
import clsx from 'clsx'
import {useLayout} from '../../core'
import {DrawerComponent} from '../../../assets/ts/components'
import {WithChildren} from '../../../helpers'
import { Link } from 'react-router-dom'
const Content = ({children}: WithChildren) => {
  const {config, classes} = useLayout()
  const location = useLocation()
  useEffect(() => {
    DrawerComponent.hideAll()
  }, [location])

  

  var condition = navigator.onLine ? 'online' : 'offline';
  console.log(location.pathname);
  if (condition === 'online') {
    console.log('ONLINE');
  }
  else{
    console.log('OFFLINE')

 }

  const appContentContainer = config.app?.content?.container
  return (
    
    <div id='kt_app_content' className={clsx('app-content flex-column-fluid', classes.content.join(' '), config?.app?.content?.class)}>
      {(condition==="offline")? <div className="ps-5">connection not found. <Link to="/">refresh</Link></div>: <>
        {appContentContainer ? (
        <div
          id='kt_app_content_container'
          className={clsx(
            'app-container',
            classes.contentContainer.join(' '),
            {
              'container-xxl': appContentContainer === 'fixed',
              'container-fluid': appContentContainer === 'fluid',
            }
          )}
        >
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
      </>}
      
    </div>
  )
}

export {Content}
