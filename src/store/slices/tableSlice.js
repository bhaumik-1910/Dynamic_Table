import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [
    { id: '1', name: 'hit', email: 'hit@gmail.com', age: 30, role: 'Developer' },
    { id: '2', name: 'meet', email: 'meet@gmail.com', age: 25, role: 'Designer' },
    { id: '3', name: 'parth', email: 'parth@gmail.com', age: 25, role: 'Tester' },
    { id: '4', name: 'bhaumik', email: 'bhaumik@gmail.com', age: 25, role: 'Developer' },
    { id: '5', name: 'jeet', email: 'jeet@gmail.com', age: 25, role: 'Designer' },
  ],
  searchQuery: '',
  sort: { column: 'name', direction: 'asc' },
  page: 0,
  rowsPerPage: 10,
}

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
      state.page = 0
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setPage(state, action) {
      state.page = action.payload
    },
    importData(state, action) {
      state.data = action.payload
    },
  },
})

export const { setSearchQuery, setSort, setPage, importData } = tableSlice.actions
export default tableSlice.reducer