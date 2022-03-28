import { memo } from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { usePageContext } from '../../context/PageContext'
import { useApiTablesContext } from '../../context/ApiContext'
import AllTables from "./table"
import TableStatusList from "./table-status-list"
import ZoomIn from './zoom-style/zoom-in'

const Floor = () => {
    const { showZoom } = usePageContext()
    const tables = useApiTablesContext()

    return (
        <div id="container-floor">
            {(!showZoom &&
                <>
                    <TableStatusList />

                    {tables.length === 1 && <AllTables />}
                </>) ||
                <TransformWrapper
                    initialScale={1}
                    initialPositionX={0}
                    initialPositionY={0}

                >
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                        <>
                            <ZoomIn
                                setZoomIn={() => zoomIn()}
                                setZoomOut={() => zoomOut()}
                                setReset={() => resetTransform()}
                            />
                            <TransformComponent>
                                {tables.length === 1 && <AllTables />}
                            </TransformComponent>
                        </>
                    )}
                </TransformWrapper>
            }
        </div >

    )
}

export default memo(Floor)