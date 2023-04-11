import { createContext } from 'react';
import { Socket } from 'socket.io-client';
import { authDF } from '../../public/data-constant';
import { TUser } from '../../type/user.type';

export interface ISocketContextState {
    socket: Socket | undefined;
    user: TUser | null;
}

export const defaultSocketContextState: ISocketContextState = {
    socket: undefined,
    user: null,
};

export type TSocketContextActions = 'update_socket' | 'update_user';
export type TSocketContextPayload = TUser | Socket | null | undefined;

export interface ISocketContextActions {
    type: TSocketContextActions;
    payload: TSocketContextPayload;
}

export const SocketReducer = (
    state: ISocketContextState,
    action: ISocketContextActions,
) => {
    console.log(
        'Message recieved - Action: ' + action.type + ' - Payload: ',
        action.payload,
    );

    switch (action.type) {
        case 'update_socket':
            return { ...state, socket: action.payload as Socket };
        case 'update_user':
            return { ...state, user: action.payload as TUser };
        default:
            return state;
    }
};

export interface ISocketContextProps {
    SocketState: ISocketContextState;
    SocketDispatch: React.Dispatch<ISocketContextActions>;
}

const SocketContext = createContext<ISocketContextProps>({
    SocketState: defaultSocketContextState,
    SocketDispatch: () => {},
});

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;

export default SocketContext;
