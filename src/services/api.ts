import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { Grocery, UpdateGrocery } from './types'

const api = axios.create({
  baseURL: 'http://localhost:3001'
})

export const useAddGrocery = () => {
  const queryClient = useQueryClient()

  return useMutation(async (newGrocery: Omit<Grocery, 'id'>) => {
    const { data } = await api.post<Grocery>('/api/groceries', newGrocery)
    return data
  }, {
    onSettled: () => {
      queryClient.invalidateQueries('groceries')
    }
  })
}

export const useDeleteGrocery = () => {
  const queryClient = useQueryClient()

  return useMutation(async (id: number) => {
    await api.delete(`/api/groceries/${id}`)
  }, {
    onSettled: () => {
      queryClient.invalidateQueries('groceries')
    }
  })
}

export const useUpdateGrocery = () => {
  const queryClient = useQueryClient()

  return useMutation(async ({ id, update }: UpdateGrocery) => {
    const { data } = await api.put<Grocery>(`/api/groceries/${id}`, update)
    return data
  }, {
    onSettled: () => {
      queryClient.invalidateQueries('groceries')
    }
  })
}