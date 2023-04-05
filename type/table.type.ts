import { TableType } from '../public/data-constant';
import { TCustomer } from './customer.type';

type TTable = {
    _id: string;
    number: number;
    type: TableType;
    totalChair: number;
    idCustomer: string;
    isBlock: Boolean;
    topPositon: number;
    leftPositon: number;
    keyRestaurant: string;
};

type TTableCreate = {
    number: number;
    type: TableType;
    topPositon: number;
    leftPositon: number;
    keyRestaurant: string;
};

type TTableUpdate = {
    id: string;
    data: any;
};

type TTableData = {
    // In `status` we will watch
    // if tables are being loaded.
    isLoading: boolean;
    tableList: TTable[];
};

type TTableProps = {
    table: TTable;
    customerChoosen: TCustomer;
    changedNTable: number;
};

type TChair = {
    top: string;
    left: string;
    numberChair: number;
    table: TTable;
    customer: TCustomer;
    currentPeople: number;
};

export type {
    TTable,
    TTableCreate,
    TTableData,
    TTableUpdate,
    TTableProps,
    TChair,
};
