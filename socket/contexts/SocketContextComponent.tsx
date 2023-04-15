import React, { PropsWithChildren, useEffect, useReducer } from 'react';
import { TUser } from '../../type/user.type';
import { useSocket } from '../hooks';
import {
    defaultSocketContextState,
    SocketContextProvider,
    SocketReducer,
} from './SocketContext';

export interface ISocketContextComponentProps extends PropsWithChildren<any> {}

const SocketContextComponent: React.FunctionComponent<
    ISocketContextComponentProps
> = (props) => {
    const { children } = props;

    const socket = useSocket('http://localhost:8080', {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: false,
    });

    const [SocketState, SocketDispatch] = useReducer(
        SocketReducer,
        defaultSocketContextState,
    );

    useEffect(() => {
        SocketDispatch({ type: 'updateSocket', payload: socket });
        startListeners();
    }, []);

    const startListeners = () => {
        /** Connection / reconnection listeners */
        // socket.io.on('reconnect', (attempt) => {
        //     console.info('Reconnected on attempt: ' + attempt);
        //     sendHandshake();
        // });

        // socket.io.on('reconnect_attempt', (attempt) => {
        //     console.info('Reconnection Attempt: ' + attempt);
        // });

        // socket.io.on('reconnect_error', (error) => {
        //     console.info('Reconnection error: ' + error);
        // });

        // socket.io.on('reconnect_failed', () => {
        //     console.info('Reconnection failure.');
        //     alert('We are unable to connect you to the chat service.  Please make sure your internet connection is stable or try again later.');
        // });

        socket.on('authorized', () => {
            socket.emit('getUser', async (user: TUser) => {
                console.info('get user from server by socket!!!');
                SocketDispatch({ type: 'updateUser', payload: user });
            });

            console.info('Sending handshake to server ...');
        });

        socket.on('unauthorized', (data) => {
            // setSocketError("unauthorized: ", data);
        });

        socket.on('error', (err) => {
            // setSocketError(err?.message);
            console.log(err?.message);
        });
    };

    return (
        <SocketContextProvider value={{ SocketState, SocketDispatch }}>
            {children}
        </SocketContextProvider>
    );
};

export default SocketContextComponent;
