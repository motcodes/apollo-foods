/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { useEffect } from 'react'
import router from 'next/router'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
import useMedia from 'use-media'

import Layout from '../components/Layout'
import PouchModel from '../components/Pouch'
import { fetcher, mealDbRandom } from '../lib'
import { Button, Typography } from '../utils'

const Stage = dynamic(() => import('../components/Stage/Stage'))

export async function getServerSideProps() {
  const { meals } = await fetcher(mealDbRandom)
  const data = meals[0]
  return {
    props: {
      data,
    },
  }
}

const Index = ({ data }) => {
  useEffect(() => {
    router.prefetch(`/cook/${data.idMeal}`)
  }, [data.idMeal])

  const isDesktop = useMedia({ minWidth: 1024 })

  const canvasProps = {
    style: {
      width: '100%',
      height: isDesktop ? '80vh' : '40vh',
      background: 'transparent',
    },
    id: 'pouchCanvas',
  }
  const controlsProps = { autoRotate: true }

  return (
    <Layout>
      <Grid>
        <Stage
          canvasProps={canvasProps}
          controlsProps={controlsProps}
          className="stage"
          enableFullscreen={false}
        >
          <PouchModel textureUrl="./PreviewLabel.png" />
        </Stage>

        <Container>
          <Typography variant="h2" as="h1" color="var(--orange-60)">
            A random
            <br /> astronaut food recipe generator
          </Typography>
          <Typography variant="p" as="h2" fontSize="var(--body-large)">
            for your interstellar space missions.
            <br /> Each Pouch will be uniquely created for you.
          </Typography>
          <GenButton onClick={() => router.push(`/cook/${data.idMeal}`)}>
            Generate Now
          </GenButton>
        </Container>
      </Grid>
    </Layout>
  )
}

export default Index

const Grid = styled.div`
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* column-gap: 4rem; */
    align-items: center;
    max-width: 1280px;
    height: 70vh;
    height: 100%;
    margin: 0 auto;
    section {
      grid-column: 2;
      margin: 0;
    }
  }
`

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding-bottom: 4rem;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    color: var(--grey-90);
  }
  @media (min-width: 1024px) {
    grid-column: 1;
    grid-row: 1;
    align-items: flex-start;
    text-align: left;
    margin-left: 2rem;
    h1 {
      margin-bottom: 0.5rem;
    }
  }
`

const GenButton = styled(Button)`
  margin-top: 1rem;
  width: 320px;

  @media (min-width: 1024px) {
    margin-top: 2rem;
  }
`
