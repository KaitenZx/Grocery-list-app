import React, { FC, useState } from 'react'
import {
  Checkbox,
  Card,
  CardContent,
  Grid,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useUpdateGrocery, useDeleteGrocery } from '../services/api'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import { Grocery } from '../services/types';
import ConfirmDialog from './ConfirmDialog';
import { ActionButton } from './ActionButton';
import GroceryDetails from './GroceryDetails';

interface Props {
  grocery: Grocery
  onDelete: (id: number) => void
  setGroceries: (grocery: Grocery) => void
}

const GroceryItem: FC<Props> = ({ grocery, setGroceries, onDelete }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [newGrocery, setNewGrocery] = useState({
    name: grocery.name || '',
    amount: grocery.amount || 0,
    category: grocery.category || ''
  });
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [nameError, setNameError] = useState(false)
  const [checked, setChecked] = useState(false)
  const updateMutation = useUpdateGrocery()
  const deleteMutation = useDeleteGrocery()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleDelete = () => {
    deleteMutation.mutate(grocery.id, {
      onSuccess: () => {
        onDelete(grocery.id);
      },
    });
    setDeleteConfirmationOpen(false);
  }

  const onCheck = () => {
    updateMutation.mutate({
      id: grocery.id,
      update: {
        ...grocery,
        done: !checked,
      }
    });
    setGroceries({ ...grocery, done: !checked })
    setChecked(!checked)
  }

  const handleSave = () => {
    if (!newGrocery.name) {
      setNameError(true)
      return
    }
    setIsEditMode(false)
    updateMutation.mutate({ id: grocery.id, update: newGrocery })
  }

  const handleIncrease = () => {
    setNewGrocery({ ...newGrocery, amount: newGrocery.amount + 1 })
  }

  const handleDecrease = () => {
    if (newGrocery.amount > 0) {
      setNewGrocery({ ...newGrocery, amount: newGrocery.amount - 1 })
    }
  }

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent sx={{
        fontSize: isMobile ? '0.8rem' : 'inherit',
        padding: '12px 16px',
        '&:last-child': { paddingBottom: '12px' }
      }}>
        <Grid container alignItems="center">
          <Grid item xs={1}>
            <Box display="flex" justifyContent="center">
              <Checkbox
                checked={checked}
                onChange={onCheck}
              />
            </Box>
          </Grid>
          <GroceryDetails
            isEditMode={isEditMode}
            newGrocery={newGrocery}
            setNewGrocery={setNewGrocery}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            nameError={nameError}
            setNameError={setNameError}
            checked={checked}
          />
          <Grid item xs={1.5}>
            {isEditMode ? (
              <ActionButton
                sx={{
                  '&:hover': {
                    color: 'green',
                    borderColor: 'rgb(107, 133, 107)',
                    background: 'rgba(11, 138, 40, 0.1)'
                  }
                }}
                onClick={handleSave}
              >
                <SaveIcon fontSize={isMobile ? 'small' : 'medium'} />
              </ActionButton>
            ) : (
              <ActionButton
                sx={{
                  '&:hover': {
                    color: 'green',
                    borderColor: 'rgb(107, 133, 107)',
                    background: 'rgba(11, 138, 40, 0.1)'
                  }
                }}
                onClick={() => setIsEditMode(true)}
              >
                <ModeEditIcon fontSize={isMobile ? 'small' : 'medium'} />
              </ActionButton>
            )}
          </Grid>
          <Grid item xs={1.5}>
            <ActionButton
              color="error"
              sx={{
                borderColor: 'red',
                '&:hover': { background: 'rgba(255, 0, 0, 0.1)' }
              }}
              onClick={() => setDeleteConfirmationOpen(true)}
            >
              <DeleteForeverIcon fontSize={isMobile ? 'small' : 'medium'} />
            </ActionButton>
          </Grid>
          <ConfirmDialog
            open={deleteConfirmationOpen}
            handleClose={() => setDeleteConfirmationOpen(false)}
            handleConfirm={handleDelete}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

export default GroceryItem