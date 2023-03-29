import { TableStatus, TableType } from "../public/DataConstant";

type TTable = {
    _id: String,
    number: Number,
    type: TableType,
    status: TableStatus,
    seatChair: Number,
    idCustomer: String,
    topPositon: Number,
    leftPositon: Number,
    keyRestaurant: String,
};

type TTableCreate = {
    number: Number,
    type: TableType,
    topPositon: Number,
    leftPositon: Number,
    keyRestaurant: String,
};

type TTableUpdate = {
    id: String,
    data: any,
};

type TTableData = {
    // In `status` we will watch
    // if tables are being loaded.
    isLoading: Boolean;
    tableList: TTable[];
};

export type { TTable, TTableCreate, TTableData, TTableUpdate };