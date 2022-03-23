import { usePageContext } from '../context/PageContext'
import MenuIcon from '@atlaskit/icon/glyph/menu'

const HeaderMenu = () => {
    const { enableInfo, setEnableInfo, showZoom, setIndexED, setCurrentPeople, setChangedNTable } = usePageContext()

    const handleEnableInfo = () => {
        if (!showZoom) {
            setEnableInfo(!enableInfo)
            setIndexED(-1)
            setCurrentPeople(-1)
            setChangedNTable(-1)
        }
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