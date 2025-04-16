import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    Button,
    Box,
  } from '@mui/material'
  import { useAppDispatch, useAppSelector } from '@/store/hooks'
  import { setSort, importData, setPage } from '@/store/slices/tableSlice'
  import { parseCSV, exportCSV } from '@/utils/csvUtils'
  import Pagination from './Pagination'
  
  export default function DataTable() {
    const dispatch = useAppDispatch()
    const { data, searchQuery, sort, page, rowsPerPage } = useAppSelector((state) => state.table)
    const columns = useAppSelector((state) => state.columns.columns)
  
    const handleSort = (column) => {
      const direction = sort.column === column && sort.direction === 'asc' ? 'desc' : 'asc'
      dispatch(setSort({ column, direction }))
    }
  
    const handleFileUpload = async (e) => {
      const file = e.target.files?.[0]
      if (file) {
        try {
          const parsedData = await parseCSV(file)
          dispatch(importData(parsedData))
        } catch (error) {
          alert(error.message || 'Failed to import CSV')
        }
      }
    }
  
    const handleExport = () => {
      exportCSV(filteredData, columns)
    }
  
    const filteredData = data
      .filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
      .sort((a, b) => {
        const { column, direction } = sort
        const aValue = a[column]
        const bValue = b[column]
        if (aValue < bValue) return direction === 'asc' ? -1 : 1
        if (aValue > bValue) return direction === 'asc' ? 1 : -1
        return 0
      })
  
    const paginatedData = filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  
    return (
      <Box>
        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
          <Button variant="outlined" component="label">
            Import CSV
            <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
          </Button>
          <Button variant="outlined" onClick={handleExport}>
            Export CSV
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns
                  .filter((col) => col.visible)
                  .map((col) => (
                    <TableCell key={col.id}>
                      <TableSortLabel
                        active={sort.column === col.id}
                        direction={sort.column === col.id ? sort.direction : 'asc'}
                        onClick={() => handleSort(col.id)}
                      >
                        {col.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.id}>
                  {columns
                    .filter((col) => col.visible)
                    .map((col) => (
                      <TableCell key={col.id}>{row[col.id]}</TableCell>
                    ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination totalRows={filteredData.length} />
      </Box>
    )
  }