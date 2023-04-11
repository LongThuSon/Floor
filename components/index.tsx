import { useState, useEffect, useContext } from 'react';
import { PageContext } from '../components/context/PageContext';
import Header from '../components/header';
import Content from '../components/content';
import Home from './content/home';
import { useAppDispatch } from '../redux/hook';
import { getAllTables } from '../redux/slices/table.silce';
import { getAllCustomers } from '../redux/slices/customer.slice';
import { customerDF, TypeService } from '../public/data-constant';
import SocketContext from '../socket/contexts/SocketContext';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width: width,
        height: height,
    };
}

const App = () => {
    const dispatch = useAppDispatch();
    const { user } = useContext(SocketContext).SocketState;
    const [enableInfo, setEnableInfo] = useState(true);
    const [date, setDate] = useState(0);
    const [typeService, setTypeService] = useState(TypeService.Lunch);
    const [showZoom, setShowZoom] = useState(false);
    const [customerChanged, setCustomerChanged] = useState(customerDF);
    const [winSize, setWinSize] = useState({ width: 1536, height: 677 });

    useEffect(() => {
        setWinSize(getWindowDimensions());

        function handleResize() {
            setWinSize(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [enableInfo, showZoom]);

    useEffect(() => {
        dispatch(
            getAllCustomers({
                key: '',
                typeService: typeService,
                dateOrder: 1681138196483,
            }),
        )
            .then((_) => {
                dispatch(getAllTables(''));
            })
            .catch((error) => console.log(error));
    }, [dispatch, typeService]);

    return (
        <div>
            <PageContext.Provider
                value={{
                    enableInfo,
                    setEnableInfo,
                    showZoom,
                    setShowZoom,
                    winSize,
                    customerChanged,
                    setCustomerChanged,
                    date,
                    setDate,
                    typeService,
                    setTypeService,
                }}
            >
                {user != null ? (
                    <>
                        <Header />
                        <Content />
                    </>
                ) : (
                    <Home />
                )}
            </PageContext.Provider>
        </div>
    );
};

export default App;
