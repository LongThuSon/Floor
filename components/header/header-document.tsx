import NotificationAllIcon from '@atlaskit/icon/glyph/notification-all';
import { useContext } from 'react';
import { useAppDispatch } from '../../redux/hook';
import { getAllCustomers } from '../../redux/slices/customer.slice';
import { getAllTables } from '../../redux/slices/table.silce';
import SocketContext from '../../socket/contexts/SocketContext';
import { usePageContext } from '../context/PageContext';

const HeaderDocu = () => {
    const dispatch = useAppDispatch();
    const { key } = useContext(SocketContext).SocketState;
    const { newReservation, setNewReservation, typeService, startDate } =
        usePageContext();

    const handleGetNewRes = () => {
        dispatch(
            getAllCustomers({
                key: key,
                typeService: typeService,
                dateOrder: startDate.unix * 1000,
            }),
        )
            .then((_) => {
                dispatch(getAllTables(key))
                    .then((_) => setNewReservation(false))
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    };

    return (
        <span id="docu">
            {newReservation ? (
                <span onClick={handleGetNewRes}>
                    <NotificationAllIcon label="noti" primaryColor="red" />
                </span>
            ) : (
                <span>
                    <NotificationAllIcon label="noti" primaryColor="#7C69EF" />
                </span>
            )}
        </span>
    );
};

export default HeaderDocu;
