import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
  } from '@mui/material'
  import { useAppDispatch, useAppSelector } from '@/store/hooks'
  import { toggleColumnVisibility, addColumn } from '@/store/slices/columnSlice'
  import { useForm, Controller } from 'react-hook-form'
  
  export default function ManageColumnsModal({ open, onClose }) {
    const dispatch = useAppDispatch()
    const columns = useAppSelector((state) => state.columns.columns)
    const { control, handleSubmit, reset } = useForm({
      defaultValues: { newColumn: '' },
    })
  
    const onSubmit = (data) => {
      if (data.newColumn) {
        dispatch(addColumn(data.newColumn))
        reset()
      }
    }
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Manage Columns</DialogTitle>
        <DialogContent>
          {columns.map((col) => (
            <FormControlLabel
              key={col.id}
              control={
                <Checkbox
                  checked={col.visible}
                  onChange={() => dispatch(toggleColumnVisibility(col.id))}
                />
              }
              label={col.label}
            />
          ))}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="newColumn"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Add New Column"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Add Column
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }