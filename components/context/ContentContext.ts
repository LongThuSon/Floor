import { createContext, useContext } from 'react';

export type IContentContextType = {
    move: boolean;
    setMove: (param: boolean) => void;
    // time: string,
    // setTime: (param: string) => void,
};

export const ContentContext = createContext<IContentContextType>({
    move: true,
    setMove: () => {},
    // time: '',
    // setTime: () => { },
});

export const useContentContext = () => useContext(ContentContext);
