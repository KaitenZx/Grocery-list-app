import React, { FC, useState } from 'react'
import { Button, TextField, Card, CardContent, MenuItem, Grid, Box, styled, CardHeader, useMediaQuery, useTheme } from '@mui/material'
import { useAddGrocery } from '../services/api'
import { CATEGORIES } from '../services/constants';
import { Grocery } from '../services/types';

export const CustomTextField = styled(TextField)({
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
});

type AddGroceryItemProps = {
  onNewItem: (item: Grocery) => void;
};

const AddGroceryItem: FC<AddGroceryItemProps> = ({ onNewItem }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    amount: '',
    category: '',
  });
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const addGroceryMutation = useAddGrocery()

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addGroceryMutation.mutate(
      { name: newItem.name, amount: Number(newItem.amount), category: newItem.category, done: false },
      {
        onSuccess: (data) => {
          setNewItem({
            name: '',
            amount: '',
            category: '',
          });
          onNewItem(data);
        },
      }
    );
  }

  return (
    <Card sx={{ width: '100%', marginBottom: '1rem' }}>
      <CardHeader sx={{ userSelect: 'none' }} title='Add a new item' />
      <CardContent>
        <form onSubmit={handleAdd}>
          <Grid container spacing={0.5} alignItems="center">
            <Grid item xs={4}>
              <TextField
                inputProps={{ style: { fontSize: isMobile ? '0.6rem' : '0.9rem' } }}
                autoComplete='off'
                required
                fullWidth
                value={newItem.name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewItem({ ...newItem, name: event.target.value })}
                label="Grocery name"
                InputLabelProps={{ style: { fontSize: isMobile ? '0.6rem' : '0.9rem' } }}
              />
            </Grid>
            <Grid item xs={2}>
              <CustomTextField
                inputProps={{ min: '0', style: { fontSize: isMobile ? '0.6rem' : '0.9rem' } }}
                autoComplete='off'
                required
                fullWidth
                value={newItem.amount}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewItem({ ...newItem, amount: event.target.value })}
                label="Amount"
                type="number"
                InputLabelProps={{ style: { fontSize: isMobile ? '0.6rem' : '0.9rem' } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                SelectProps={{ style: { fontSize: isMobile ? '0.6rem' : '0.9rem' } }}
                value={newItem.category}
                onChange={(event) => setNewItem({ ...newItem, category: event.target.value as string })}
                fullWidth
                label="Category"
                select
                required
                InputLabelProps={{ style: { fontSize: isMobile ? '0.6rem' : '0.9rem' } }}
              >
                {CATEGORIES.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={2}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  size='large'
                  sx={{
                    height: isMobile ? '2.925rem' : '3.5rem',
                    minWidth: '0'
                  }}
                  variant="contained"
                  fullWidth
                  color="success"
                  type="submit">Add</Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AddGroceryItem