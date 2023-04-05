import { createContext, useContext } from 'react';
import { customerDF } from '../../public/data-constant';
import { TCustomer } from '../../type/customer.type';

export type IPageType = {
    enableInfo: boolean;
    setEnableInfo: (param: boolean) => void;
    indexED: number;
    setIndexED: (param: number) => void;
    showZoom: boolean;
    customerChanged: TCustomer;
    setCustomerChanged: (param: TCustomer) => void;
    setShowZoom: (param: boolean) => void;
    winSize: { width: number; height: number };
    // setWinSize: (param: {  width: number, height: number }) => void,
    date: string;
    setDate: (param: string) => void;
};

export const PageContext = createContext<IPageType>({
    enableInfo: true, // set a default value
    setEnableInfo: () => {},
    indexED: -1,
    setIndexED: () => {},
    showZoom: false,
    setShowZoom: () => {},
    customerChanged: customerDF,
    setCustomerChanged: () => {},
    winSize: { width: 1500, height: 677 },
    // setWinSize: () => { },
    date: '2022-03-21',
    setDate: () => {},
});

export const usePageContext = () => useContext(PageContext);
