import { CustomerState, CustomerStatus, TimeOrder, TypeService } from "../public/DataConstant";

type TCustomer = {
    _id: String,
    name: String,
    quantityBook: Number,
    idTable: String,
    phone: Number,
    status: CustomerStatus,
    dateOrder: Date,
    typeService: TypeService,
    timeOrder: TimeOrder,
    isHold: Boolean,
    note: String,
    keyRestaurant: String,
    state: CustomerState,
};

type TCustomerCreate = {
    name: String,
    quantityBook: Number,
    phone: Number,
    dateOrder: Date,
    typeService: TypeService,
    timeOrder: TimeOrder,
    note: String,
    keyRestaurant: String,
};

type TCustomerUpdate = {
    id: String,
    data: any,
};

type TCustomerData = {
    // In `status` we will watch
    // if tables are being loaded.
    isLoading: Boolean;
    customerList: TCustomer[];
};

export type { TCustomer, TCustomerCreate, TCustomerUpdate, TCustomerData };