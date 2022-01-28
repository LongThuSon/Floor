import {  useState  } from 'react'
import { MoveContext } from "./MoveContext"
import Info from "./Info"
import Floor from "./floor"
import TableStatusList from "./floor/table-status-list"
import Add from "./floor/button-add"
import ZoomOut from './floor/zoom-style/zoom-out'

export interface ShowZoom {
    showZoom?: boolean,
    callbackShow(): void
}

interface MoveTableFunc {
    callbackMove(): void
    callbackMoveFalse(): void
}

export type ZoomStyle = ShowZoom & MoveTableFunc

const Content = () => {
    const [showZoom, setShowZoom] = useState(false)
    const [move, setMove] = useState(true)

    return (
        <div id="content-main">
            <Info />
            <MoveContext.Provider
                value={{  move  }}
            >
                <Floor
                    showZoom={showZoom}
                    callbackShow={() => setShowZoom(!showZoom)}
                />
            </MoveContext.Provider>

            {!showZoom &&
                <>
                    <TableStatusList />
                    <ZoomOut
                        callbackShow={() => setShowZoom(!showZoom)}
                        callbackMove={() => setMove(!move)}
                        callbackMoveFalse={() => setMove(true)}
                    />
                </>
            }
            <Add />
        </div>
    )
}
export default Content