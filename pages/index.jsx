import router from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import useSWR from 'swr'
import Layout from '../components/Layout'
import { fetcher, mealDbRandom, useRandomMeal } from '../lib'

export async function getServerSideProps(context) {
  const { meals } = await fetcher(mealDbRandom)
  const data = meals[0]
  return {
    props: {
      data,
    },
  }
}

const Index = (props) => {
  function handleGenerate() {
    router.push(`/cook/[id]`, `/cook/${props.data.idMeal}`)
  }

  useEffect(() => {
    router.prefetch(`/cook/[id]`, `/cook/${props.data.idMeal}`)
  }, [])

  return (
    <Layout>
      <div className="page">
        <main>
          <h2>
            A random astronaut food generatorfor your outer space missons. Or
            create your own meals.
          </h2>
          <button onClick={handleGenerate}>Generate Now</button>
        </main>
      </div>
    </Layout>
  )
}

export default Index
