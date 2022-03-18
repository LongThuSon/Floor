import { useContentContext } from '../../../context/ContentContext'
import {  usePageContext  } from '../../../context/PageContext'
import MediaServicesZoomInIcon from '@atlaskit/icon/glyph/media-services/zoom-in'
import MediaServicesZoomOutIcon from '@atlaskit/icon/glyph/media-services/zoom-out'
import EditorExpandIcon from '@atlaskit/icon/glyph/editor/expand'

const ZoomOut = () => {
    const { move, setMove } = useContentContext()
    const { enableInfo, setEnableInfo, showZoom, setShowZoom } = usePageContext()

    return (
        <div id="zoom-out">
            <span
                onClick={() => {
                    setShowZoom(!showZoom)
                    setMove(true)
                    setEnableInfo(false)
                }}
            >
                <MediaServicesZoomInIcon
                    label='zoom-in'
                    size='large'
                    primaryColor='#7C69EF'
                />
            </span>
            <span
                onClick={() => {
                    setShowZoom(!showZoom)
                    setMove(true)
                    setEnableInfo(false)
                }}
            >
                <MediaServicesZoomOutIcon
                    label='zoom-out'
                    size='large'
                    primaryColor='#7C69EF'
                />
            </span>
            <span
                onClick={() => setMove(!move)}
            >
                <EditorExpandIcon
                    label='distance'
                    size='large'
                    primaryColor='#7C69EF'
                />
            </span>
        </div>
    )
}
export default ZoomOut