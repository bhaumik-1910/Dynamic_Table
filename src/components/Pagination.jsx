import { TablePagination } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setPage } from '@/store/slices/tableSlice'

export default function Pagination({ totalRows }) {
  const dispatch = useAppDispatch()
  const { page, rowsPerPage } = useAppSelector((state) => state.table)

  const handleChangePage = (_, newPage) => {
    dispatch(setPage(newPage))
  }

  return (
    <TablePagination
      component="div"
      count={totalRows}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[10]}
    />
  )
}