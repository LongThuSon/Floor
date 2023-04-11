import { createContext, useContext } from 'react';
import { customerDF, TypeService } from '../../public/data-constant';
import { TCustomer } from '../../type/customer.type';

export type IPageType = {
    enableInfo: boolean;
    setEnableInfo: (param: boolean) => void;
    showZoom: boolean;
    customerChanged: TCustomer;
    setCustomerChanged: (param: TCustomer) => void;
    setShowZoom: (param: boolean) => void;
    winSize: { width: number; height: number };
    // setWinSize: (param: {  width: number, height: number }) => void,
    date: number;
    setDate: (param: number) => void;
    typeService: TypeService;
    setTypeService: (param: TypeService) => void;
};

export const PageContext = createContext<IPageType>({
    enableInfo: true, // set a default value
    setEnableInfo: () => {},
    showZoom: false,
    setShowZoom: () => {},
    customerChanged: customerDF,
    setCustomerChanged: () => {},
    winSize: { width: 1500, height: 677 },
    // setWinSize: () => { },
    date: Date.now(),
    setDate: () => {},
    typeService: TypeService.Lunch,
    setTypeService: () => {},
});

export const usePageContext = () => useContext(PageContext);
