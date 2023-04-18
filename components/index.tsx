import { useState, useEffect, useContext } from 'react';
import { PageContext } from '../components/context/PageContext';
import Header from '../components/header';
import Content from '../components/content';
import Home from './content/home';
import { useAppDispatch } from '../redux/hook';
import { getAllTables } from '../redux/slices/table.silce';
import {
    getAllCustomers,
    updateClash,
    updateLate,
    updateNoShow,
    updatePercentCustomer,
} from '../redux/slices/customer.slice';
import { customerDF, TimeOrder, TypeService } from '../public/data-constant';
import SocketContext from '../socket/contexts/SocketContext';
import { DateObject } from 'react-multi-date-picker';
import { TCustomerUpdate } from '../type/customer.type';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width: width,
        height: height,
    };
}

const App = () => {
    const dispatch = useAppDispatch();
    const { socket, user, key } = useContext(SocketContext).SocketState;
    const [enableInfo, setEnableInfo] = useState(true);
    const [typeService, setTypeService] = useState(TypeService.Lunch);
    const [startDate, setStartDate] = useState(new DateObject());
    const [showZoom, setShowZoom] = useState(false);
    const [customerChanged, setCustomerChanged] = useState(customerDF);
    const [winSize, setWinSize] = useState({ width: 1536, height: 677 });
    const [newReservation, setNewReservation] = useState(false);

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
                key: key,
                typeService: typeService,
                dateOrder: startDate.unix * 1000,
            }),
        )
            .then((_) => {
                dispatch(getAllTables(key));
            })
            .catch((error) => console.log(error));
    }, [dispatch, key, startDate, typeService]);

    useEffect(() => {
        console.log('socket: ', socket);
        socket?.on('updatePercent', (payload: TCustomerUpdate) => {
            dispatch(updatePercentCustomer(payload));
        });
        socket?.on('updateLate', (timeOrder) => {
            dispatch(updateLate(timeOrder));
        });
        socket?.on('updateNoShow', (timeOrder: TimeOrder) => {
            dispatch(updateNoShow(timeOrder));
        });
        socket?.on('updateClash', (idTable: string) => {
            dispatch(updateClash(idTable));
        });
    }, [dispatch, socket]);

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
                    typeService,
                    setTypeService,
                    startDate,
                    setStartDate,
                    newReservation,
                    setNewReservation,
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
