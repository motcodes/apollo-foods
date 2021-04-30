import { useEffect } from 'react'
import router from 'next/router'
import { fetcher, mealDbRandom } from '../lib'

export async function getServerSideProps(context) {
  const { meals } = await fetcher(mealDbRandom)
  const data = meals[0]
  return {
    props: {
      data,
    },
  }
}

export default function Generate(props) {
  useEffect(() => {
    router.replace(`/cook/[id]`, `/cook/${props.data.idMeal}`)
  }, [])

  return <div>Loading...</div>
}
