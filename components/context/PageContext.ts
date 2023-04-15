import { createContext, useContext } from 'react';
import { DateObject } from 'react-multi-date-picker';
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
    typeService: TypeService;
    setTypeService: (param: TypeService) => void;
    startDate: DateObject;
    setStartDate: (param: DateObject) => void;
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
    typeService: TypeService.Lunch,
    setTypeService: () => {},
    startDate: new DateObject(),
    setStartDate: () => {},
});

export const usePageContext = () => useContext(PageContext);
