import MediaServicesZoomInIcon from '@atlaskit/icon/glyph/media-services/zoom-in'
import MediaServicesZoomOutIcon from '@atlaskit/icon/glyph/media-services/zoom-out'
import EditorExpandIcon from '@atlaskit/icon/glyph/editor/expand'
import { ZoomStyle } from "../../index"

const ZoomOut = ({ callbackShow, callbackMove }: ZoomStyle) => {
    return (
        <div id="zoom-out">
            <span
                onClick={callbackShow}
            >
                <MediaServicesZoomInIcon
                    label='zoom-in'
                    size='large'
                    primaryColor='#7C69EF'
                />
            </span>
            <span
                onClick={callbackShow}
            >
                <MediaServicesZoomOutIcon
                    label='zoom-out'
                    size='large'
                    primaryColor='#7C69EF'
                />
            </span>
            <span
                onClick={callbackMove}
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