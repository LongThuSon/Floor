import React, { useContext, useState, useEffect } from 'react';
import { MDBInput, MDBRow, MDBCheckbox } from 'mdb-react-ui-kit';
import SocketContext from '../../../socket/contexts/SocketContext';
import { TAuth } from '../../../type/user.type';
import { RememberUser } from '../../../public/data-constant';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

const LoginForm = () => {
    const { socket } = useContext(SocketContext).SocketState;
    const SocketDispatch = useContext(SocketContext).SocketDispatch;

    const [phone, setPhone] = useLocalStorage('phone', '');
    const [password, setPassword] = useLocalStorage('password', '');
    const [key, setKey] = useLocalStorage('key', '');
    const [remember, setRemember] = useState(RememberUser.NotRemember);

    useEffect(() => {
        if (phone !== '' && password !== '' && key !== '') {
            handleLogin();
        }
    }, []);

    const handleRemember = (checked: Boolean) => {
        if (checked) {
            setRemember(RememberUser.Remember);
        } else {
            setRemember(RememberUser.NotRemember);
        }
    };

    const handleLogin = () => {
        const data: TAuth = {
            phone: phone,
            password: password,
            keyRestaurant: key,
        };

        // save localStorage
        if (remember === RememberUser.Remember) {
            localStorage.setItem('phone', JSON.stringify(phone));
            localStorage.setItem('password', JSON.stringify(password));
            localStorage.setItem('key', JSON.stringify(key));
        }

        // connect socket
        socket?.connect();
        socket?.once('connect', () => {
            console.log(key);
            SocketDispatch({ type: 'updateKey', payload: key });
            socket.emit('authenticate', data);
            console.info('User handshake callback message received');
        });
    };

    return (
        <form style={{ maxWidth: 600 }}>
            <MDBInput
                className="mb-4"
                type="tel"
                id="form1Example1"
                label="phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <MDBInput
                className="mb-4"
                type="password"
                id="form1Example2"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <MDBInput
                className="mb-4"
                type="text"
                id="form1Example3"
                label="Key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
            />

            <MDBRow className="mb-4">
                <MDBCheckbox
                    id="form1Example3"
                    label="Remember me"
                    value={remember}
                    onChange={(e) => handleRemember(e.target.checked)}
                />
            </MDBRow>

            <div onClick={handleLogin}>Log in</div>
        </form>
    );
};

export default LoginForm;
