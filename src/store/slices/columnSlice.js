import { createSlice } from '@reduxjs/toolkit'

const loadColumnsFromStorage = () => {
  const saved = localStorage.getItem('columns')
  return saved
    ? JSON.parse(saved)
    : [
        { id: 'name', label: 'Name', visible: true },
        { id: 'email', label: 'Email', visible: true },
        { id: 'age', label: 'Age', visible: true },
        { id: 'role', label: 'Role', visible: true },
      ]
}

const initialState = {
  columns: loadColumnsFromStorage(),
}

const columnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    toggleColumnVisibility(state, action) {
      const column = state.columns.find((col) => col.id === action.payload)
      if (column) column.visible = !column.visible
      localStorage.setItem('columns', JSON.stringify(state.columns))
    },
    addColumn(state, action) {
      state.columns.push({
        id: action.payload.toLowerCase(),
        label: action.payload,
        visible: true,
      })
      localStorage.setItem('columns', JSON.stringify(state.columns))
    },
  },
})

export const { toggleColumnVisibility, addColumn } = columnSlice.actions
export default columnSlice.reducer