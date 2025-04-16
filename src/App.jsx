import { Container, Box, Typography, Button } from '@mui/material'
import DataTable from '@/components/DataTable'
import SearchBar from '@/components/SearchBar'
import ManageColumnsModal from '@/components/ManageColumnsModal'
import { useState } from 'react'

export default function App() {
  const [openModal, setOpenModal] = useState(false)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dynamic Data Table
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <SearchBar />
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Manage Columns
        </Button>
      </Box>
      <DataTable />
      <ManageColumnsModal open={openModal} onClose={() => setOpenModal(false)} />
    </Container>
  )
}