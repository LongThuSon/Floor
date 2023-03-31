import { TableStatus, TableType } from '../public/data-constant';

type TTable = {
    _id: string;
    number: number;
    type: TableType;
    status: TableStatus;
    totalChair: number;
    seatChair: number;
    idCustomer: string;
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
};

type TChair = {
    top: string;
    left: string;
    numberChair: number;
    table: TTable;
};

export type {
    TTable,
    TTableCreate,
    TTableData,
    TTableUpdate,
    TTableProps,
    TChair,
};
