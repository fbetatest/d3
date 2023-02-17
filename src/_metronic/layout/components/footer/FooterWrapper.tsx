
import {useLayout} from '../../core'


const FooterWrapper = () => {
  const {config} = useLayout()
  if (!config.app?.footer?.display) {
    return null
  }

  return (
    <div>
    
    </div>
  )
}

export {FooterWrapper}
