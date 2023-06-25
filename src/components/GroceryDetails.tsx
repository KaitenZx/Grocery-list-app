import {
  Grid,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  OutlinedInput,
  InputLabel,
  useTheme,
  useMediaQuery
} from '@mui/material'
import React, { FC } from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { CATEGORIES } from '../services/constants';
import { Grocery, NewGrocery } from '@/src/services/types';
import { CustomTextField } from './AddGroceryItem';

interface Props {
  isEditMode: boolean,
  newGrocery: NewGrocery,
  setNewGrocery: (grocery: NewGrocery) => void,
  handleIncrease: () => void,
  handleDecrease: () => void,
  nameError: boolean,
  checked: boolean,
  setNameError: (value: boolean) => void
}

const GroceryDetails: FC<Props> = ({
  isEditMode,
  newGrocery,
  setNewGrocery,
  handleIncrease,
  handleDecrease,
  nameError,
  setNameError,
  checked
}) => {

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (

    isEditMode ? (<>
      <Grid item xs={3}>
        <Box display="flex" padding="0 5%">
          <FormControl variant="outlined" error={nameError} fullWidth size='small'>
            <InputLabel htmlFor="grocery-name">*</InputLabel>
            <OutlinedInput
              id="grocery-name"
              data-testid="grocery-name"
              value={newGrocery.name}
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>) => {
                  setNameError(false); setNewGrocery({
                    ...newGrocery, name: event.target.value
                  })
                }}
              label="*"
              inputProps={{ style: { fontSize: isMobile ? '0.6rem' : '0.9rem' } }}
            />
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box display="flex" justifyContent="center">
          <Box
            display='flex'
            padding='0 10%'
            width='100%'
            gap="0.3rem"
            alignItems='center'
            justifyContent='center'
          >
            {!isMobile && <ChevronLeftIcon sx={{ cursor: 'pointer' }} fontSize='inherit' onClick={handleDecrease} />}
            <CustomTextField
              data-testid='grocery-amount'
              required
              size='small'
              value={newGrocery.amount}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewGrocery({ ...newGrocery, amount: Number(event.target.value) })}
              type='number'
              sx={{ width: '90%' }}
              inputProps={{
                min: "0",
                style: {
                  textAlign: 'center',
                  padding: '8.5px 0px',
                  fontSize: isMobile ? '0.6rem' : '0.9rem'
                }
              }}
            />
            {!isMobile && <ChevronRightIcon sx={{ cursor: 'pointer' }} fontSize='inherit' onClick={handleIncrease} />}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box display="flex" padding="0 5%">
          <Select
            data-testid='category-select'
            value={newGrocery.category}
            onChange={(event) => setNewGrocery({ ...newGrocery, category: event.target.value })}
            displayEmpty
            fullWidth
            size='small'
            inputProps={{ "aria-label": 'Without label' }}
            sx={{ fontSize: isMobile ? '0.6rem' : '0.9rem' }}
          >
            {CATEGORIES.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}
          </Select>
        </Box>
      </Grid>
    </>
    ) : (
      <>
        <Grid item xs={3}>
          <Box display="flex" padding="0 5%">
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: 'inherit',
                textDecoration: checked ? 'line-through' : 'none',
                color: checked ? 'grey' : 'black',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
              {newGrocery.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" justifyContent="center">
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: 'inherit',
                textDecoration: checked ? 'line-through' : 'none',
                color: checked ? 'grey' : 'black'
              }}>
              {newGrocery.amount}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box display="flex" padding="0 5%">
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: 'inherit',
                textDecoration: checked ? 'line-through' : 'none',
                color: checked ? 'grey' : 'black',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>{newGrocery.category}</Typography>
          </Box>
        </Grid>
      </>
    )
  )
}

export default GroceryDetails