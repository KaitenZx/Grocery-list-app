import React from 'react'
import axios from 'axios'
import GroceryList from '../components/GroceryList'

import { Grocery } from '../services/types'
import { NextPage } from 'next'
import { Container } from '@mui/material'

export async function getServerSideProps() {
  const api = axios.create({
    baseURL: 'http://localhost:3001'
  })
  const { data } = await api.get<Grocery[]>('/api/groceries')

  return { props: { groceries: data } }
}

interface HomePageProps {
  groceries: Grocery[]
}

const HomePage: NextPage<HomePageProps> = (props) => {
  return (
    <Container
      maxWidth='md'
      sx={{
        paddingLeft: { xs: 0, sm: 2 },
        paddingRight: { xs: 0, sm: 2 },
      }}>
      <GroceryList groceries={props.groceries} />
    </Container>
  )
}

export default HomePage