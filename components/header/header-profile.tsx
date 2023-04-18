import { MDBBtn } from 'mdb-react-ui-kit';
import { useContext } from 'react';
import SocketContext from '../../socket/contexts/SocketContext';
import { usePageContext } from '../context/PageContext';

const HeaderProfile = () => {
    const { socket, user } = useContext(SocketContext).SocketState;
    const SocketDispatch = useContext(SocketContext).SocketDispatch;
    const { winSize } = usePageContext();

    const handleLogout = () => {
        // remove localStorage
        localStorage.removeItem('phone');
        localStorage.removeItem('password');
        localStorage.removeItem('key');

        // disconnected socket
        socket?.disconnect();

        // clear user & key
        SocketDispatch({ type: 'updateUser', payload: null });
        SocketDispatch({ type: 'updateKey', payload: '' });
    };

    return (
        <div id="container-profile">
            {winSize.width > 900 && `${user?.name}`}

            <MDBBtn
                outline
                color="secondary"
                className="me-2"
                type="button"
                onClick={handleLogout}
            >
                Logout
            </MDBBtn>
        </div>
    );
};
export default HeaderProfile;

function SocketDispatch(arg0: {
    type: string;
    payload: import('../../type/user.type').TUser | null;
}) {
    throw new Error('Function not implemented.');
}
