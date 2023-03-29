import { useState, useEffect } from 'react';
import { PageContext } from '../components/context/PageContext';
import Header from '../components/header';
import Content from '../components/content';
import Home from './content/home';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { createTable, getAllTables } from '../redux/slices/table.silce';
import { getAllCustomers } from '../redux/slices/customer.slice';
import { TableType } from '../public/DataConstant';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width: width,
        height: height
    };
};

const App = () => {
    const dispatch = useAppDispatch();

    const [enableInfo, setEnableInfo] = useState(true);
    const [indexED, setIndexED] = useState(-1);
    const [showZoom, setShowZoom] = useState(false);
    const [currentPeople, setCurrentPeople] = useState(-1);
    const [changedNTable, setChangedNTable] = useState(-1);
    const [winSize, setWinSize] = useState({ width: 1536, height: 677 });

    useEffect(() => {
        setWinSize(getWindowDimensions())

        function handleResize() {
            setWinSize(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [enableInfo, showZoom]);

    useEffect(() => {
        dispatch(getAllTables(""));
        dispatch(getAllCustomers(""));
    }, [dispatch]);

    return (
        <div>
            <PageContext.Provider
                value={{ enableInfo, setEnableInfo, indexED, setIndexED, showZoom, setShowZoom, winSize, currentPeople, setCurrentPeople, changedNTable, setChangedNTable }}
            >
                <Header />
                <Content />
            </PageContext.Provider>
        </div>
    );
};

export default App;

