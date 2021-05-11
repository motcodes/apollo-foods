import React, { useState, useRef, useEffect, Suspense } from 'react'
import router from 'next/router'
import styled from 'styled-components'
import Layout from '../components/layout'
import { fetcher, mealDbRandom } from '../lib'
import { Stage } from '../components/stage'
import { PouchModel } from '../components/pouch'
import { Button, Typography } from '../utils'

export async function getServerSideProps() {
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

  const canvasProps = {
    style: {
      width: '100%',
      height: '55vh',
    },
    id: 'pouchCanvas',
  }

  return (
    <Layout>
      <Stage canvasProps={canvasProps}>
        <PouchModel />
      </Stage>

      <Container>
        <Typography variant="h4" as="h1">
          A random astronaut food recipe generator
        </Typography>
        <Typography variant="h5" as="h2">
          for your interstellar space missions.
          <br /> Each Pouch will be uniquely created for you.
        </Typography>
        <GenButton onClick={handleGenerate}>Generate Now</GenButton>
      </Container>
    </Layout>
  )
}

export default Index

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding-bottom: 4rem;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const GenButton = styled(Button)`
  margin-top: 1rem;
  width: 320px;
`
