import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './slices/table.silce';
import customerReducer from './slices/customer.slice';

const reducer = {
  table: tableReducer,
  customer: customerReducer,
};

const store = configureStore({
  reducer: reducer
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch

export default store;