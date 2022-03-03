import { useState } from 'react'
import { MoveContext } from "./MoveContext"
import { EditDetailsContext } from "./EditDetailsContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Info from "./Info"
import Floor from "./floor"
import TableStatusList from "./floor/table-status-list"
import Add from "./floor/button-add"
import ZoomOut from './floor/zoom-style/zoom-out'
import EditDetails from './Info/edit-reservations/'

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
    const [indexED, setIndexED] = useState(-1)

    return (
        <div id="content-main">
            <EditDetailsContext.Provider
                value={{ indexED, setIndexED }}
            >
                <Info />

                {indexED !== -1 && <EditDetails />}

            </EditDetailsContext.Provider>

            <MoveContext.Provider
                value={{ move }}
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

            <ToastContainer
                style={{
                    position: 'absolute'
                }}
            />
            
        </div>
    )
}
export default Content