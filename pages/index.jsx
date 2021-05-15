import { useEffect } from 'react'
import router from 'next/router'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
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
      background: 'black',
    },
    id: 'pouchCanvas',
  }
  const controlsProps = { autoRotate: false }
  const stageProps = { contactShadow: false }

  return (
    <Layout>
      <Stage
        canvasProps={canvasProps}
        controlsProps={controlsProps}
        stageProps={stageProps}
      >
        <PouchModel textureUrl="./PreviewLabel.png" />
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
