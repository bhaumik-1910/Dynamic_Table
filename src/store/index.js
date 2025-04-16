import { configureStore } from '@reduxjs/toolkit'
import tableReducer from './slices/tableSlice'
import columnReducer from './slices/columnSlice'

export const store = configureStore({
  reducer: {
    table: tableReducer,
    columns: columnReducer,
  },
})