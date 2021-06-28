/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { useEffect } from 'react'
import router from 'next/router'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import styled from 'styled-components'
import useMedia from 'use-media'

import { useSession } from 'next-auth/client'
import Layout from '../components/Layout'
import { fetcher, mealDbRandom } from '../lib'
import { Button, Typography, Input, Textarea, Link } from '../utils'
import { GenerateCard } from '../components/GenerateCard'

const PouchModel = dynamic(() => import('../components/Pouch'))
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
  const [session] = useSession()
  useEffect(() => {
    router.prefetch(`/cook/${data.idMeal}`)
  }, [data.idMeal])

  const isDesktop = useMedia({ minWidth: 1024 })
  const isLarge = useMedia({ minWidth: 768 })

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
          <Typography variant="h2" as="h1" color="var(--orange-50)">
            The randomized recipe generator <br />
            for astronauts
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
      <Grid2>
        <HowToContainer>
          <Copy>
            <Typography variant="h3" as="h3">
              No more
              <br /> Recipe Problems
            </Typography>
            <Typography>
              Everybody knows how tough a space mission can be and the last
              thing you want to care about is your next meal.
            </Typography>
          </Copy>
          <div>
            <Image
              src="/ApolloFoodsProblemCards.png"
              alt="A stack of Apollo Foods Recipe Cards"
              width={300}
              height={230}
              layout="responsive"
              objectFit="contain"
              quality={100}
            />
          </div>
        </HowToContainer>
        <HowToContainer>
          <Copy className="right text">
            <Typography variant="h3" as="h3">
              Apollo Foods
              <br /> is the solution
            </Typography>
            <Typography>
              Just hit the "Generate Now" Button and let Apollo Foods pick your
              next favourite recipe to cook.
            </Typography>
          </Copy>
          <GenButtonContainer>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              id="beaker"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            <GenButton2
              className="left"
              onClick={() => router.push(`/cook/${data.idMeal}`)}
            >
              Generate Now
            </GenButton2>
          </GenButtonContainer>
        </HowToContainer>
        <HowToContainer>
          <Copy>
            <Typography variant="h3" as="h3">
              Your unique
              {!isLarge && <br />} recipe
            </Typography>
            <Typography>
              Check out the recipe, if it suits your mission save it ot your
              profile
            </Typography>
          </Copy>
          <RecipePreviewContainer>
            <RecipePouch>
              <Image
                src="/ApolloFoodsRecipePouch.png"
                alt="A stack of Apollo Foods Recipe Cards"
                width={240}
                height={350}
                objectFit="contain"
              />
            </RecipePouch>
            <RecipeInfo>
              <RecipePreviewSection>
                <Typography font="Blatant" variant="h5">
                  Chicken Couscous
                </Typography>
                <Typography font="Blatant">Area: Moroccan</Typography>
              </RecipePreviewSection>
              <RecipePreviewSection>
                <Typography font="Blatant">Ingredients</Typography>
                <ul>
                  <li>Chicken Breast - 200g</li>
                  <li>Harissa Spice - 2 tbsp</li>
                </ul>
                <Typography font="Blatant" style={{ marginTop: 8 }}>
                  Instruction
                </Typography>
                <Typography fontSize="var(--body-small)">
                  Heat the olive oil in a large frying pan and cook the onion
                  for 1-2 mins...
                </Typography>
              </RecipePreviewSection>
            </RecipeInfo>
          </RecipePreviewContainer>
        </HowToContainer>
        <HowToContainer>
          <Copy className="right text">
            <Typography variant="h3" as="h3">
              Add your own Recipe
            </Typography>
            <Typography>
              Already have a favourite recipe but want it saved on Apollo Foods?
              <br /> No problem, just add it to your account manually.
            </Typography>
          </Copy>
          <CustomRecipeContainer className="left">
            <RecipePreviewSection>
              <Input
                name="customName"
                label="Name"
                defaultValue="Lemon Risotto"
                readonly="readonly"
              />
              <DualInput>
                <Input
                  name="customIngredient"
                  label="Ingredients"
                  defaultValue="fresh lemon juice"
                  readonly="readonly"
                />
                <Input
                  id="customMeasure"
                  name="customIngredient"
                  label="Measure"
                  defaultValue="2 tbsp"
                  readonly="readonly"
                />
              </DualInput>
              <Textarea
                name="customInstruction"
                label="Instructions"
                defaultValue="Melt 1 1/2 tablespoons butter with oil in..."
                readonly="readonly"
                areaHeight={200}
              />
              <Button fullWidth size="small">
                {session ? 'Create Recipe' : 'Create Account to try'}
              </Button>
            </RecipePreviewSection>
          </CustomRecipeContainer>
        </HowToContainer>
        <HowToContainer>
          <Copy>
            <Typography variant="h3" as="h3">
              Explore other recipes
            </Typography>
            <Typography>
              See what your fellow astronaut colleagues have created and saved
              on our <Link href="/expedition">Expedtion Page</Link>
            </Typography>
          </Copy>
          <div>
            <Image
              src="/ApolloFoodsExpedition.png"
              alt="Two Apollo Foods Recipe Cards"
              height={200}
              width={400}
              layout="responsive"
              objectFit="contain"
              loading="lazy"
              quality={100}
            />
          </div>
        </HowToContainer>
      </Grid2>
      <GenerateCard marginBottom />
    </Layout>
  )
}

export default Index

const Grid = styled.div`
  display: grid;
  align-items: center;
  grid-template-rows: 1fr 1fr;
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
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
  width: 100%;
  max-width: 320px;

  @media (min-width: 1024px) {
    margin-top: 2rem;
  }
`
const GenButton2 = styled(GenButton)`
  margin: 1rem auto 0;
  @media (min-width: 1024px) {
    margin-top: 0rem;
  }
`

const GridTemplate = styled.section`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-rows: auto;
  text-align: center;
  max-width: 720px;
  @media (min-width: 768px) {
    text-align: left;
    justify-content: flex-start;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    max-width: 1280px;
  }
`
const Grid2 = styled(GridTemplate)`
  border: 2px solid var(--grey-90);
  border-radius: 8px;
  padding: 3rem 1rem;
  margin: 48px auto;
  row-gap: 128px;
  @media (min-width: 768px) {
    border: none;
    row-gap: 204px;
    margin-top: 5rem;
    margin-bottom: 10rem;
  }
  @media (min-width: 1024px) {
    margin-top: 6rem;
    row-gap: 256px;
  }
  @media (min-width: 1024px) {
    margin-top: 8rem;
    row-gap: 304px;
  }
`

const HowToContainer = styled(GridTemplate)`
  row-gap: 8px;
  p {
    display: initial;
  }
  a {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-decoration: underline;
    font-size: var(--body);
  }
  figure {
    position: relative;
    height: max-content;
  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 1rem;

    .left {
      grid-column: 1;
      grid-row: 1;
      justify-self: center;
    }
    .right {
      grid-column: 2;
      grid-row: 1;
      justify-self: center;
    }
    .right.text {
      justify-self: flex-start;
    }
  }
`
const Copy = styled(GridTemplate)`
  justify-items: center;
  max-width: 380px;
  row-gap: 8px;

  @media (min-width: 420px) {
    margin-bottom: 8px;
  }
  @media (min-width: 768px) {
    justify-items: left;
    justify-self: center;
    max-width: unset;
  }
`

const RecipePreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
  max-width: 380px;

  @media (min-width: 768px) {
    justify-self: center;
    max-width: 600px;
    figure {
      justify-self: center;
    }
  }
`

const RecipePouch = styled.figure`
  grid-column: 4 / 8;
  grid-row: 1;
  z-index: 8;
  filter: drop-shadow(0 0px 4.8px rgba(0, 0, 0, 0.152))
    drop-shadow(0 0px 13.4px rgba(0, 0, 0, 0.169))
    drop-shadow(0 0px 32.3px rgba(0, 0, 0, 0.188))
    drop-shadow(0 0px 107px rgba(0, 0, 0, 0.3));
`

const RecipeInfo = styled.div`
  grid-column: 1 / 6;
  grid-row: 1;
`

const RecipePreviewSection = styled.section`
  margin-top: 8px;
  padding: 8px;
  border: 1px solid var(--orange-90);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 4px;
  max-width: 400px;
  background-color: hsla(11, 95%, 50%, 10%);
  color: var(--orange-90);

  ul {
    list-style: none;
    li {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: var(--body-small);
      border-bottom: 1px solid white;
    }
  }
  @media (min-width: 1024px) {
    h5 {
      font-size: var(--h4);
    }
    p {
      font-size: var(--body-large);
    }
    ul {
      li {
        font-size: var(--body);
      }
    }
  }
`

const CustomRecipeContainer = styled.div`
  h5 {
    font-size: var(--body);
    line-height: 150%;
  }
  button {
    margin-bottom: 4px;
    border-radius: 6px;
  }
`
const DualInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`

const GenButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
  #beaker {
    position: absolute;
    height: 12rem;
    width: 12rem;
    color: hsla(11, 96%, 95%, 100%);
  }
  button {
    margin-top: 0;
  }

  @media (min-width: 768px) {
    #beaker {
      left: -2rem;
      top: -6rem;
      height: 16rem;
      width: 16rem;
    }
  }
  @media (min-width: 1024px) {
    #beaker {
      left: 0rem;
      top: -8rem;
      height: 20rem;
      width: 20rem;
    }
  }
`
