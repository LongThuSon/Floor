import {  memo  } from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import {  usePageContext  } from '../../context/PageContext'
import AllTables from "./table"
import TableStatusList from "./table-status-list"
import ZoomIn from './zoom-style/zoom-in'

const Floor = () => {
    const { showZoom } = usePageContext()

    return (
        <div id="container-floor">
            {(!showZoom && 
            <>
                <TableStatusList />
                <AllTables />
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
                                <AllTables />
                            </TransformComponent>
                        </>
                    )}
                </TransformWrapper>
            }
        </div >

    )
}

export default memo(Floor)