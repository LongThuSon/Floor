import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CustomerStatus, TableStatus } from '../../public/data-constant';
import CustomerDataService from '../../services/customer.service';
import {
    TCustomer,
    TCustomerCreate,
    TCustomerData,
    TCustomerGet,
    TCustomerUpdate,
} from '../../type/customer.type';

const initialState: TCustomerData = {
    customerList: [],
    customerChoosen: null,
    isLoading: false,
};

// ACTIONS
export const getAllCustomers = createAsyncThunk(
    'customers/getAll',
    async (data: TCustomerGet, thunkApi) => {
        try {
            const res = await CustomerDataService.getAllService(
                data.key,
                data.typeService,
                data.dateOrder,
            );
            return res.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    },
);

export const getOneCustomer = createAsyncThunk(
    'customers/get',
    async (id: String, thunkApi) => {
        try {
            const res = await CustomerDataService.get(id);
            return res.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    },
);

export const createCustomer = createAsyncThunk(
    'customers/create',
    async (data: TCustomerCreate, thunkApi) => {
        try {
            const res = await CustomerDataService.create(data);
            return res.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    },
);

export const updateCustomer = createAsyncThunk(
    'customers/updateInfo',
    async ({ id, data }: TCustomerUpdate, thunkApi) => {
        try {
            const res = await CustomerDataService.update(id, data);
            return res.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    },
);

const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
        clearCustomerChoosen: (state) => {
            state.customerChoosen = null;
        },
        updatePercentCustomer: (state, action) => {
            const index = state.customerList.findIndex(
                (customer) => customer._id === action.payload.id,
            );
            if (index !== -1) {
                Object.assign(state.customerList[index], action.payload.data);
            }
        },
        updateLate: (state, action) => {
            const updateNeedCusList = state.customerList.filter(
                (cus) =>
                    (cus.status === CustomerStatus.Booked ||
                        cus.status === CustomerStatus.Confirmed) &&
                    cus.timeOrder === action.payload,
            );

            updateNeedCusList.forEach((cus) => {
                Object.assign(cus, { status: CustomerStatus.Late });
            });
        },
        updateNoShow: (state, action) => {
            console.log('action.payload: ', action.payload);
            const updateNeedCusList = state.customerList.filter(
                (cus) =>
                    (cus.status === CustomerStatus.Booked ||
                        cus.status === CustomerStatus.Confirmed ||
                        cus.status === CustomerStatus.Late) &&
                    cus.timeOrder === action.payload,
            );

            updateNeedCusList.forEach((cus) => {
                Object.assign(cus, { status: CustomerStatus.NoShow });
            });
        },
        updateClash: (state, action) => {
            const updateNeedCusList = state.customerList.filter(
                (cus) => cus.idTable === action.payload,
            );

            updateNeedCusList.forEach((cus) => {
                Object.assign(cus, { statusTable: TableStatus.Clash });
            });
        },
    },
    extraReducers(builder) {
        // getAllCustomers
        builder.addCase(getAllCustomers.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getAllCustomers.fulfilled, (state, action) => {
            console.log(`all customers: ${action.payload}`);
            state.isLoading = false;
            state.customerList = action.payload;
        });
        builder.addCase(getAllCustomers.rejected, (state, action) => {
            state.isLoading = false;
            console.log('getAllcustomers.rejected error');
        });

        // getOneCustomer
        builder.addCase(getOneCustomer.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getOneCustomer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.customerChoosen = action.payload;
        });
        builder.addCase(getOneCustomer.rejected, (state, action) => {
            state.isLoading = false;
            console.log('getOneCustomer.rejected error');
        });

        // createCustomer
        builder.addCase(createCustomer.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(createCustomer.fulfilled, (state, action) => {
            state.isLoading = false;
            // state.customerList.push(action.payload as unknown as TCustomer);
        });
        builder.addCase(createCustomer.rejected, (state, action) => {
            state.isLoading = false;
            console.log('createcustomer.rejected error');
        });

        // updateCustomer
        builder.addCase(updateCustomer.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateCustomer.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.customerList.findIndex(
                (customer) => customer._id === action.meta.arg.id,
            );
            if (index !== -1) {
                Object.assign(state.customerList[index], action.meta.arg.data);
            }
        });
        builder.addCase(updateCustomer.rejected, (state, action) => {
            state.isLoading = false;
            console.log('updatecustomer.rejected error');
        });
    },
});

export default customerSlice.reducer;
export const {
    clearCustomerChoosen,
    updatePercentCustomer,
    updateLate,
    updateNoShow,
    updateClash,
} = customerSlice.actions;
