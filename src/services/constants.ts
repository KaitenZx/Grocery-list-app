import { Column } from "./types";

export const CATEGORIES = [
  'Other',
  'Fruits',
  'Vegetables',
  'Dairy',
  'Bakery',
  'Meats',
  'Poultry',
  'Fish',
  'Dry/Canned Goods',
  'Frozen Foods',
  'Beverages',
  'Snacks',
  'Personal Care',
  'Household Items'
]

export const COLUMNS: Column[] = [
  { field: 'done', label: 'Done', width: 1 },
  { field: 'name', label: 'Name', width: 3 },
  { field: 'amount', label: 'Load', width: 2 },
  { field: 'category', label: 'Category', width: 3 }
];