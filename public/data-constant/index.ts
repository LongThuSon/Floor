import { TCustomer } from '../../type/customer.type';
import { TTable } from '../../type/table.type';
import { TAuth, TUser } from '../../type/user.type';

enum ActionUser {
    Login = 'login',
    Logout = 'logout',
    Signup = 'signup',
    Booking = 'booking',
}

enum TableStatus {
    Available = 0,
    Reserved = 1,
    InUse = 2,
    Overstay = 3,
    Clash = 4,
}

enum TableType {
    _1v1 = '1v1',
    _2v2c = '2v2c',
    _2v2r = '2v2r',
    _3v3 = '3v3',
    _6v6 = '6v6',
    _7v7 = '7v7',
    C6 = 'c6',
    C8 = 'c8',
    C14 = 'c14',
}

enum CustomerStatus {
    Booked = 0,
    Confirmed = 1,
    Late = 2,
    Seated = 3,
    Completed = 4,
    NoShow = 5,
    Cancelled = 6,
}

enum TypeService {
    Lunch = 0,
    Dinner = 1,
}

enum CustomerState {
    Active = 0,
    InActive = 1,
}

enum TimeOrder {
    _10h = '10:00AM',
    _10r = '10:30AM',
    _11h = '11:00AM',
    _11r = '11:30AM',
    _12h = '12:00AM',
    _12r = '12:30AM',
    _18h = '06:00PM',
    _18r = '06:30PM',
    _19h = '07:00PM',
    _19r = '07:30PM',
    _20h = '08:00PM',
    _20r = '08:30PM',
    _other = 'other',
}

enum TypeActive {
    Customer = 'customer',
    Table = 'table',
}

const tableDF: TTable = {
    _id: '-1',
    number: 0,
    type: TableType._1v1,
    totalChair: 2,
    idCustomer: '-1',
    isBlock: false,
    topPositon: 0,
    leftPositon: 0,
    keyRestaurant: '-1',
};

const customerDF: TCustomer = {
    _id: '-1',
    name: 'DF',
    quantityBook: 0,
    idTable: '-1',
    phone: '-1',
    status: CustomerStatus.Booked,
    dateOrder: -1,
    typeService: TypeService.Lunch,
    timeOrder: TimeOrder._10h,
    isHold: false,
    note: '-1',
    keyRestaurant: '-1',
    state: CustomerState.Active,
    statusTable: TableStatus.Available,
    percent: -1,
};

const userDF: TUser = {
    _id: '-1',
    name: 'DF',
    phone: '-1',
    password: '-1',
    keyRestaurant: '-1',
};

const authDF: TAuth = {
    phone: '-1',
    password: '-1',
    keyRestaurant: '-1',
};

export {
    ActionUser,
    TableStatus,
    TableType,
    CustomerStatus,
    TypeService,
    CustomerState,
    TimeOrder,
    tableDF,
    customerDF,
    userDF,
    authDF,
    TypeActive,
};
