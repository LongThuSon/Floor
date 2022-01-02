import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import AllTables from "./table"
import ZoomIn from './zoom-style/zoom-in'
import { ShowZoom } from "../index"


export interface Chair {
    top: string;
    left: string;
}

export interface Table {
    top: string;
    left: string;
    number: number;
}

export interface ZoomIn extends ShowZoom {
    setZoomIn(): void;
    setZoomOut(): void;
    setReset(): void
}

const Floor = ({ showZoom, callbackShow }: ShowZoom) => {
    return (
        <div id="container-floor">
            {(!showZoom && <AllTables />) ||
                <TransformWrapper
                    initialScale={1}
                    initialPositionX={0}
                    initialPositionY={0}
                >
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                        <>
                            <ZoomIn
                                callbackShow={callbackShow}
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
export default Floor