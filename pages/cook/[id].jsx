import React from 'react'
import { fetcher, mealDbById, useMealById } from '../../lib'

export async function getServerSideProps(context) {
  const { query } = context
  const fetchById = await fetcher(`${mealDbById}${query.id}`)
  const data = fetchById.meals[0]
  return {
    props: {
      data,
    },
  }
}

export default function Meal(props) {
  const { data, isLoading, isError } = useMealById(props.data.idMeal, {
    initialData: props.data,
  })
  return (
    <div>
      <h1>{data && data.idMeal}</h1>
    </div>
  )
}
