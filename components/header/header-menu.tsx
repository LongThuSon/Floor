import {  useState  } from 'react'
import {  usePageContext  } from '../context/PageContext'
import MenuIcon from '@atlaskit/icon/glyph/menu'

const HeaderMenu = () => {
    const { enableInfo, setEnableInfo, showZoom } = usePageContext()

    const handleEnableInfo = () => {
        if (!showZoom) setEnableInfo(!enableInfo)
    }

    return (
        <span 
            id='menu'
            onClick={handleEnableInfo}    
        >
            <MenuIcon
                label='menu'
                size="medium"
                primaryColor='#869AB8'
            />
        </span>
    )
}

export default HeaderMenu