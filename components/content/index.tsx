import { useState, useEffect, memo } from 'react';
import { ContentContext } from '../context/ContentContext';
import { usePageContext } from '../context/PageContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Info from './Info';
import Floor from './floor';
import Add from './floor/button-add';
import ZoomOut from './floor/zoom-style/zoom-out';
import EditDetails from './Info/edit-reservations/';
import { useAppSelector } from '../../redux/hook';
import AddModal from './modal/addModal';

// const getCurrentTime = () => {
//     const now = new Date();
//     const time = now.getHours() + ':' + ('0' + now.getMinutes()).slice(-2);
//     return time;
// };

const Content = () => {
    const customerChoosen = useAppSelector(
        (state) => state.customers.customerChoosen,
    );
    const [move, setMove] = useState(true);
    // const [time, setTime] = useState(getCurrentTime());
    const { enableInfo, showZoom, typeService } = usePageContext();

    // useEffect(() => {
    //     const timeOut = setTimeout(() => {
    //         setTime(getCurrentTime());
    //     }, 180000);
    //     console.log(time);
    //     return () => clearTimeout(timeOut);
    // }, [time]);

    return (
        <div id="content-main">
            <ContentContext.Provider value={{ move, setMove }}>
                {enableInfo && <Info />}
                {enableInfo && customerChoosen !== null && <EditDetails />}
                <Floor />
                {!showZoom && <ZoomOut />}
            </ContentContext.Provider>

            {/* <Add /> */}

            <AddModal />

            <ToastContainer
                style={{
                    position: 'absolute',
                }}
            />
        </div>
    );
};
export default memo(Content);

function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}
