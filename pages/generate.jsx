/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { useEffect } from 'react'
import router from 'next/router'
import { fetcher, formatMeal, mealDbRandom } from '../lib'
import LabelLoader from '../components/Label/LabelLoader'

export async function getServerSideProps(context) {
  const { meals } = await fetcher(mealDbRandom)
  const data = formatMeal(meals[0])
  return {
    props: {
      data,
    },
  }
}

export default function Generate(props) {
  useEffect(() => {
    router.replace(`/cook/[id]`, `/cook/${props.data.mealId}`)
  }, [])
  return <LabelLoader />
}
