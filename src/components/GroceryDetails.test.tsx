import { render, fireEvent, screen } from '@testing-library/react';
import GroceryDetails from './GroceryDetails';
import { Grocery, NewGrocery } from '@/src/services/types';
import React from 'react';


const grocery: Grocery = {
  id: 1,
  name: 'Apple',
  amount: 5,
  done: false,
  category: 'Fruits',
};

const newGrocery: NewGrocery = {
  name: 'Apple',
  amount: 5,
  category: 'Fruits',
};

const props = {
  isEditMode: false,
  newGrocery,
  setNewGrocery: jest.fn(),
  handleIncrease: jest.fn(),
  handleDecrease: jest.fn(),
  nameError: false,
  setNameError: jest.fn(),
  checked: false
};

describe('GroceryDetails', () => {
  it('renders edit mode correctly when edit mode is on', () => {
    render(<GroceryDetails {...props} isEditMode={true} />);

    const groceryNameInput = screen.getByTestId('grocery-name');
    expect(groceryNameInput).toBeInTheDocument();

    const groceryAmountInput = screen.getByTestId('grocery-amount');
    expect(groceryAmountInput).toBeInTheDocument();

    const groceryCategorySelect = screen.getByTestId('category-select');
    expect(groceryCategorySelect).toBeInTheDocument();
  });


  it('renders view mode correctly when edit mode is off', () => {
    const { getByText } = render(<GroceryDetails {...props} />);

    const groceryName = getByText('Apple');
    expect(groceryName).toBeInTheDocument();

    const groceryAmount = getByText('5');
    expect(groceryAmount).toBeInTheDocument();

    const groceryCategory = getByText('Fruits');
    expect(groceryCategory).toBeInTheDocument();
  });
});
