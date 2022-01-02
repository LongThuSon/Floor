import { useState } from 'react'
import Info from "./Info"
import Floor from "./floor"
import TableStatusList from "./floor/table-status-list"
import Add from "./floor/button-add"
import ZoomOut from './floor/zoom-style/zoom-out'

export interface ShowZoom {
    showZoom?: boolean;
    callbackShow(): void
}

const Content = () => {
    const [showZoom, setShowZoom] = useState(false)


    return (
        <div id="content-main">
            <Info />
            <Floor
                showZoom={showZoom}
                callbackShow={() => setShowZoom(!showZoom)}

            />
            {!showZoom && 
                <>
                    <TableStatusList />
                    <ZoomOut
                         
                        callbackShow={() => setShowZoom(!showZoom)}
                    />    
                </>
            }
            <Add />
        </div>
    )
}
export default Content