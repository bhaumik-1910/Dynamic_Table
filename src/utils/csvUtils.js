import Papa from 'papaparse'
import { saveAs } from 'file-saver'

export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const data = result.data
        if (data.length > 0) {
          resolve(data.map((row, index) => ({ ...row, id: String(index + 1) })))
        } else {
          reject(new Error('Invalid CSV format or empty file'))
        }
      },
      error: (error) => reject(error),
    })
  })
}

export const exportCSV = (data, columns) => {
  const visibleColumns = columns.filter((col) => col.visible)
  const csv = Papa.unparse({
    fields: visibleColumns.map((col) => col.label),
    data: data.map((row) => visibleColumns.map((col) => row[col.id] || '')),
  })
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, 'table-data.csv')
}