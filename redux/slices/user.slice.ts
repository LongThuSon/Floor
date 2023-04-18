import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserDataService from '../../services/user.service';
import { TUserCreate, TUserData } from '../../type/user.type';

const initialState: TUserData = {
    isLoading: false,
};

// ACTIONS
export const createUser = createAsyncThunk(
    'users/create',
    async (data: TUserCreate, thunkApi) => {
        try {
            const res = await UserDataService.create(data);
            return res.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    },
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers(builder) {
        // createUser
        builder.addCase(createUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(createUser.rejected, (state, action) => {
            state.isLoading = false;
            console.log('createUser.rejected error');
        });
    },
});

export default userSlice.reducer;
