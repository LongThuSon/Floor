import {
    CustomerState,
    CustomerStatus,
    TableStatus,
    TimeOrder,
    TypeService,
} from '../public/data-constant';

type TCustomer = {
    _id: string;
    name: string;
    quantityBook: number;
    idTable: string;
    phone: number;
    status: CustomerStatus;
    dateOrder: Date;
    typeService: TypeService;
    timeOrder: TimeOrder;
    isHold: boolean;
    note: string;
    keyRestaurant: string;
    state: CustomerState;
    statusTable: TableStatus;
};

type TCustomerCreate = {
    name: string;
    quantityBook: number;
    phone: number;
    dateOrder: Date;
    typeService: TypeService;
    timeOrder: TimeOrder;
    note: string;
    keyRestaurant: string;
};

type TCustomerUpdate = {
    id: string;
    data: any;
};

type TCustomerData = {
    // In `status` we will watch
    // if tables are being loaded.
    isLoading: boolean;
    customerList: TCustomer[];
    customerChoosen: TCustomer | null;
};

export type { TCustomer, TCustomerCreate, TCustomerUpdate, TCustomerData };
