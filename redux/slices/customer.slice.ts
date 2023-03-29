import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CustomerDataService from "../../services/customer.service";
import { TCustomer, TCustomerCreate, TCustomerData, TCustomerUpdate } from "../../type/customer.type";

const initialState: TCustomerData = {
  customerList: [],
  isLoading: false,
};

// ACTIONS
export const getAllCustomers = createAsyncThunk(
  "customers/getAll",
  async (key: String, thunkApi) => {
    try {
      const res = await CustomerDataService.getAllKey(key);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    };
  }
);

export const createCustomer = createAsyncThunk(
  "customers/create",
  async (data: TCustomerCreate, thunkApi) => {
    try {
      const res = await CustomerDataService.create(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    };
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/updateInfo",
  async ({ id, data } : TCustomerUpdate, thunkApi) => {
    try {
      const res = await CustomerDataService.update(id, data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    };
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers(builder) {
    // getAllCustomers
    builder.addCase(getAllCustomers.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(getAllCustomers.fulfilled, (state, action) => {
      state.isLoading = false
      state.customerList = action.payload
    });
    builder.addCase(getAllCustomers.rejected, (state, action) => {
      state.isLoading = false
      console.log("getAllcustomers.rejected error");
    });

    // createCustomer
    builder.addCase(createCustomer.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.isLoading = false
      state.customerList.push(action.payload as unknown as TCustomer)
    });
    builder.addCase(createCustomer.rejected, (state, action) => {
      state.isLoading = false
      console.log("createcustomer.rejected error");
    });

    // updateCustomer
    builder.addCase(updateCustomer.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.isLoading = false
      const index = state.customerList.findIndex(customer => customer._id === action.payload.id);
      state.customerList[index] = {
        ...state.customerList[index],
        ...action.payload,
      };
    });
    builder.addCase(updateCustomer.rejected, (state, action) => {
      state.isLoading = false
      console.log("updatecustomer.rejected error");
    });
  }
});

export default customerSlice.reducer;