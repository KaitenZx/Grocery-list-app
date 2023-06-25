export type SortDirection = 'asc' | 'desc';
export type SortColumn = 'name' | 'amount' | 'category' | 'done';

export interface Column {
  field: SortColumn;
  label: string;
  width: number;
}

export interface Grocery {
  id: number;
  name: string;
  amount: number;
  done: boolean;
  category: string;
}

export interface UpdateGrocery {
  id: number;
  update: Partial<Grocery>;
}

export type NewGrocery = {
  name: string;
  amount: number;
  category: string;
};