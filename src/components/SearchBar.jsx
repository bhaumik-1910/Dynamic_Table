import { TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSearchQuery } from '@/store/slices/tableSlice'

export default function SearchBar() {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector((state) => state.table.searchQuery)

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value))
  }

  return (
    <TextField
      label="Search"
      variant="outlined"
      value={searchQuery}
      onChange={handleSearch}
      sx={{ flex: 1 }}
    />
  )
}