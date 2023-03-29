import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TableDataService from "../../services/table.service";
import { TTable, TTableCreate, TTableData, TTableUpdate } from "../../type/table.type";

const initialState: TTableData = {
  tableList: [],
  isLoading: false,
};

// ACTIONS
export const getAllTables = createAsyncThunk(
  "tables/getAll",
  async (key: String, thunkApi) => {
    try {
      const res = await TableDataService.getAllKey(key);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    };
  }
);

export const createTable = createAsyncThunk(
  "tables/create",
  async (data: TTableCreate, thunkApi) => {
    try {
      const res = await TableDataService.create(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    };
    
  }
);

export const updateTable = createAsyncThunk(
  "tables/updateInfo",
  async ({ id, data } : TTableUpdate, thunkApi) => {
    try {
      const res = await TableDataService.update(id, data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    };
  }
);

export const deleteTable = createAsyncThunk(
  "tables/delete",
  async (id: String, thunkApi) => {
    try {
      await TableDataService.delete(id);
      return { id };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    };
  }
);

export const deleteAllTables = createAsyncThunk(
  "tables/deleteAll",
  async (_, thunkApi) => {
    try {
      const res = await TableDataService.deleteAll();
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    };
  }
);

const tableSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers(builder) {
    // getAllTables
    builder.addCase(getAllTables.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(getAllTables.fulfilled, (state, action) => {
      state.isLoading = false
      state.tableList = action.payload
    });
    builder.addCase(getAllTables.rejected, (state, action) => {
      state.isLoading = false
      console.log("getAllTables.rejected error");
    });

    // createTable
    builder.addCase(createTable.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(createTable.fulfilled, (state, action) => {
      state.isLoading = false
      state.tableList.push(action.payload as unknown as TTable)
    });
    builder.addCase(createTable.rejected, (state, action) => {
      state.isLoading = false
      console.log("createTable.rejected error");
    });

    // updateTable
    builder.addCase(updateTable.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(updateTable.fulfilled, (state, action) => {
      state.isLoading = false
      const index = state.tableList.findIndex(table => table._id === action.payload.id);
      state.tableList[index] = {
        ...state.tableList[index],
        ...action.payload,
      };
    });
    builder.addCase(updateTable.rejected, (state, action) => {
      state.isLoading = false
      console.log("updateTable.rejected error");
    });

    // deleteTable
    builder.addCase(deleteTable.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(deleteTable.fulfilled, (state, action) => {
      state.isLoading = false
      const index = state.tableList.findIndex(table => table._id === action.payload.id);
      state.tableList.splice(index, 1);
    });
    builder.addCase(deleteTable.rejected, (state, action) => {
      state.isLoading = false
      console.log("deleteTable.rejected error");
    });

    // deleteAllTables
    builder.addCase(deleteAllTables.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(deleteAllTables.fulfilled, (state, action) => {
      state.isLoading = false
      state.tableList = [];
    });
    builder.addCase(deleteAllTables.rejected, (state, action) => {
      state.isLoading = false
      console.log("deleteAllTables.rejected error");
    });
  }
});

export default tableSlice.reducer;