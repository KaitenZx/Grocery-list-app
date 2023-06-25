import React, { FC, useState } from 'react'
import GroceryItem from './GroceryItem'
import AddGroceryItem from './AddGroceryItem'
import { Box, Typography } from '@mui/material'
import GroceryListHeader from './GroceryListHeader'
import { Grocery, SortColumn, SortDirection } from '@/src/services/types'

type GroceryListProps = {
  groceries: Grocery[]
}

const GroceryList: FC<GroceryListProps> = ({ groceries: initialGroceries }) => {
  const [groceries, setGroceries] = useState<Grocery[]>(initialGroceries)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [sortColumn, setSortColumn] = useState<SortColumn>('name');

  const sortedGroceries = groceries && [...groceries].sort((a, b) => {
    if (sortColumn === 'amount') {
      const amountA = Number(a[sortColumn]);
      const amountB = Number(b[sortColumn]);

      return sortDirection === 'asc' ? amountA - amountB : amountB - amountA;
    } else if (sortColumn === 'done') {
      const doneA = a[sortColumn] ? 1 : 0;
      const doneB = b[sortColumn] ? 1 : 0;

      return sortDirection === 'asc' ? doneA - doneB : doneB - doneA;
    } else {
      return sortDirection === 'asc'
        ? String(a[sortColumn]).localeCompare(String(b[sortColumn]))
        : String(b[sortColumn]).localeCompare(String(a[sortColumn]));
    }
  });

  const handleSort = (column: SortColumn) => {
    setSortColumn(column);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  }

  const handleNewItem = (item: Grocery) => {
    setGroceries([...groceries, item]);
  }

  const handleDeleteGrocery = (id: number) => {
    setGroceries(groceries.filter(grocery => grocery.id !== id));
  }

  return (
    <Box marginTop='2rem' >
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Grocery List
      </Typography>
      <AddGroceryItem onNewItem={handleNewItem} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap='0.5rem'
        marginTop="1rem"
      >
        <GroceryListHeader
          onSort={handleSort}
          currentSortColumn={sortColumn}
          currentSortDirection={sortDirection}
        />
        {sortedGroceries && sortedGroceries.map((grocery) => {
          return (
            <GroceryItem
              setGroceries={
                (updatedGrocery: Grocery) => setGroceries(
                  [...groceries.filter(grocery => updatedGrocery.id !== grocery.id),
                    updatedGrocery]
                )}
              onDelete={handleDeleteGrocery}
              key={grocery.id}
              grocery={grocery}
            />)
        })}
      </Box>
    </Box>
  )
}

export default GroceryList