import { useState, useEffect, memo } from 'react'
import { ContentContext } from "../context/ContentContext"
import { usePageContext } from '../context/PageContext'
import {  useResetApiContext  } from '../context/ApiContext/resetApiContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Info from "./Info"
import Floor from "./floor"
import Add from "./floor/button-add"
import ZoomOut from './floor/zoom-style/zoom-out'
import EditDetails from './Info/edit-reservations/'

const getCurrentTime = () => {
    const now = new Date();
    const time = now.getHours() + ':' + ('0' + now.getMinutes()).slice(-2);
    return time;
};

const Content = () => {
    const [move, setMove] = useState(true)
    const [indexED, setIndexED] = useState(-1)
    const [time, setTime] = useState(getCurrentTime())
    const [currentPeople, setCurrentPeople] = useState(-1)
    const [changedNTable, setChangedNTable] = useState(-1)
    const { enableInfo, showZoom } = usePageContext()
    const { reset, setReset } = useResetApiContext()

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setTime(getCurrentTime());
        }, 180000);
        setReset(!reset)
        console.log(time);
        return () => clearTimeout(timeOut);
    }, [time])

    return (
        <div
            id="content-main"
        >
            <ContentContext.Provider
                value={{ move, setMove, indexED, setIndexED, time, currentPeople, setCurrentPeople, changedNTable, setChangedNTable }}
            >
                {enableInfo && <Info />}
                {enableInfo && indexED !== -1 && <EditDetails />}
                <Floor />
                {!showZoom && <ZoomOut />}
            </ContentContext.Provider>

            {/* <Add /> */}

            <ToastContainer
                style={{
                    position: 'absolute'
                }}
            />

        </div>
    )
}
export default memo(Content)