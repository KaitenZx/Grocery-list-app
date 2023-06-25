import React, { FC } from 'react'
import { Grid, Typography, Box, useMediaQuery, useTheme } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { SortColumn, SortDirection } from '../services/types';
import { COLUMNS } from '../services/constants';

interface Props {
  onSort: (column: SortColumn) => void;
  currentSortColumn: SortColumn;
  currentSortDirection: SortDirection;
}

const GroceryListHeader: FC<Props> = ({ onSort, currentSortColumn, currentSortDirection }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Grid
      container width='100%'
      padding='10px 16px'
      alignItems="center"
      borderBottom='2px solid rgb(101, 157, 213)'
    >
      {COLUMNS.map(column => (
        <Grid item xs={column.width} onClick={() => onSort(column.field)} key={column.field}>
          <Box
            display="flex"
            justifyContent={column.field === 'amount' ? 'center' : 'flex-start'}
            padding="0 5%"
            sx={{ userSelect: 'none', cursor: 'pointer' }}
          >
            <Typography variant="h6" sx={{ fontSize: isMobile ? '0.8rem' : '1rem' }}>{column.label}</Typography>
            {column.field === currentSortColumn && (currentSortDirection === 'asc'
              ? <ArrowDropDownIcon fontSize='inherit' />
              : <ArrowDropUpIcon fontSize='inherit' />)
            }
          </Box>
        </Grid>
      ))}
      <Grid item xs={3} />
    </Grid>
  )
}

export default GroceryListHeader