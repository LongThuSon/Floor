import { useState, useEffect } from 'react'
import ApiContextProvider from '../components/context/ApiContext'
import { PageContext } from '../components/context/PageContext'
import Header from '../components/header'
import Content from '../components/content'

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width: width,
        height: height
    };
}

const App = () => {
    const [enableInfo, setEnableInfo] = useState(true)
    const [indexED, setIndexED] = useState(-1)
    const [showZoom, setShowZoom] = useState(false)
    const [currentPeople, setCurrentPeople] = useState(-1)
    const [changedNTable, setChangedNTable] = useState(-1)
    const [winSize, setWinSize] = useState({ width: 1536, height: 677 })

    useEffect(() => {
        setWinSize(getWindowDimensions())

        function handleResize() {
            setWinSize(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize)
        };
    }, [enableInfo, showZoom]);

    return (
        <div>
            <ApiContextProvider>
                <PageContext.Provider
                    value={{ enableInfo, setEnableInfo, indexED, setIndexED, showZoom, setShowZoom, winSize, currentPeople, setCurrentPeople, changedNTable, setChangedNTable }}
                >
                    <Header />
                    <Content />
                </PageContext.Provider>
            </ApiContextProvider>
        </div>
    )
}

export default App

