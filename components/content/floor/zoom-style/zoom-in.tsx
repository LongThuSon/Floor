import {  usePageContext  } from '../../../context/PageContext'
import BulletListIcon from '@atlaskit/icon/glyph/bullet-list'
import MediaServicesLineIcon from '@atlaskit/icon/glyph/media-services/line'
import MediaServicesZoomInIcon from '@atlaskit/icon/glyph/media-services/zoom-in'
import MediaServicesZoomOutIcon from '@atlaskit/icon/glyph/media-services/zoom-out'
import MediaServicesActualSizeIcon from '@atlaskit/icon/glyph/media-services/actual-size'

interface ZoomIn {
    setZoomIn(): void;
    setZoomOut(): void;
    setReset(): void
}

const ZoomIn = ({ setZoomIn, setZoomOut, setReset }: ZoomIn) => {
    const { showZoom, setShowZoom, setEnableInfo } = usePageContext()

    return (
        <div id="zoom-in">
            <span
                onClick={() => setShowZoom(!showZoom)}
            >
                <BulletListIcon
                    label='table-list'
                    size='large'
                    primaryColor='#7C69EF'
                />

                <span
                    style={{
                        position: "absolute",
                        top: "7x",
                        left: "7px",
                    }}
                >
                    <MediaServicesLineIcon
                        label='refuse'
                        size='large'
                        primaryColor='#E1E6F9'
                    />
                </span>
                <span
                    style={{
                        position: "absolute",
                        top: "10px",
                        left: "11px",
                    }}
                >
                    <MediaServicesLineIcon
                        label='refuse'
                        size='medium'
                        primaryColor='#7C69EF'
                    />
                </span>
            </span>
            <span
                onClick={setZoomIn}
            >
                <MediaServicesZoomInIcon
                    label='zoom-in'
                    size='large'
                    primaryColor='#7C69EF'
                />
            </span>
            <span
                onClick={setZoomOut}
            >
                <MediaServicesZoomOutIcon
                    label='zoom-out'
                    size='large'
                    primaryColor='#7C69EF'
                />
            </span>
            <span
                onClick={setReset}
            >
                <MediaServicesActualSizeIcon
                    label='zoom-full-screen'
                    size='large'
                    primaryColor='#7C69EF'
                />
            </span>
        </div>
    )
}
export default ZoomIn