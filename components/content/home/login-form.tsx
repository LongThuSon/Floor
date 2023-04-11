import React, { useContext, useState } from 'react';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
} from 'mdb-react-ui-kit';
import SocketContext from '../../../socket/contexts/SocketContext';
import { TAuth } from '../../../type/user.type';

const LoginForm = () => {
    const { socket } = useContext(SocketContext).SocketState;
    const SocketDispatch = useContext(SocketContext).SocketDispatch;

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [key, setKey] = useState('');

    const handleLogin = () => {
        const data: TAuth = {
            phone: phone,
            password: password,
            keyRestaurant: key,
        };
        socket?.connect();
        socket?.once('connect', () => {
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

            {/* <MDBRow className='mb-4'>
        <MDBCol className='d-flex justify-content-center'>
          <MDBCheckbox id='form1Example3' label='Remember me' defaultChecked />
        </MDBCol>
        <MDBCol>
          <a href='#!'>Forgot password?</a>
        </MDBCol>
      </MDBRow> */}

            <div onClick={handleLogin}>Log in</div>
        </form>
    );
};

export default LoginForm;
