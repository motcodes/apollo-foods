/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { useEffect } from 'react'
import styled, { css } from 'styled-components'
import Head from 'next/head'
import { getSession } from 'next-auth/client'
import router from 'next/router'
import { Label as Ettiket } from '../../components/Label/Label'
import Layout from '../../components/Layout'
import Stage from '../../components/Stage/Stage'
import { GenerateCard } from '../../components/GenerateCard'
import PouchModel from '../../components/Pouch'
import {
  colors,
  fetcher,
  formatMeal,
  getRandomItem,
  mealDbById,
  useHtmlToImage,
} from '../../lib'
import { Typography } from '../../utils'

import prisma from '../../prisma/prisma'

export async function getServerSideProps(context) {
  const { query } = context
  const id = parseInt(query.id)
  const session = await getSession(context)

  const mealMetadata = {
    textureColor: getRandomItem(colors),
    isSaved: false,
    needsPlaceholder: false,
    canSave: true,
    isInDb: false,
  }

  const meal = await prisma.meal.findUnique({
    where: {
      id,
    },
    include: {
      customRecipe: true,
      likedByUser: {
        select: {
          username: true,
        },
      },
    },
  })
  // console.log('meal :', meal)

  if (meal) {
    mealMetadata.isInDb = true
  }

  let mealData
  if (meal?.customRecipe) {
    mealMetadata.needsPlaceholder = true

    // owner
    if (session.user.username === meal.customRecipe.ownerUsername) {
      mealMetadata.isSaved = true
      mealMetadata.canSave = false
    }
    // liked user
    if (meal.likedByUser.some((u) => u.username === session.user.username)) {
      mealMetadata.isSaved = true
    }
    mealData = {
      mealId: meal.id,
      mealName: meal.name,
      mealCategory: meal.customRecipe.category,
      mealArea: meal.customRecipe.area,
      mealInstructions: meal.customRecipe.instruction,
      mealIngredients: meal.customRecipe.ingredients,
      mealMeasure: meal.customRecipe.measure,
    }
  } else {
    const fetchById = await fetcher(`${mealDbById}${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': '*',
      },
    })
    mealData = formatMeal(fetchById.meals[0])

    if (meal?.id === id) {
      mealMetadata.textureColor = meal.textureColor
      mealMetadata.isSaved = true
    }
    if (session?.user.username === meal?.creatorUsername) {
      mealMetadata.isSaved = true
    } else {
      mealMetadata.isSaved = false
    }
  }

  return {
    props: {
      data: mealData,
      mealIngredients: mealData.mealIngredients.toString(),
      mealMeasure: mealData.mealMeasure.toString(),
      mealMetadata,
    },
  }
}

export default function Meal({
  data: mealData,
  mealIngredients,
  mealMeasure,
  mealMetadata,
}) {
  const { textureColor, isSaved, canSave, isInDb } = mealMetadata
  mealData.mealIngredients = mealIngredients.split(',')
  mealData.mealMeasure = mealMeasure.split(',')

  const [generateImage, appRef, imageUrl, isLoading] = useHtmlToImage(2048)

  useEffect(
    (e) => {
      generateImage(e)
    },
    [generateImage]
  )

  const mealProps = {
    id: mealData?.mealId,
    name: mealData?.mealName,
    textureColor,
    createdAt: new Date(),
    placeholderImage: '',
    isInDb,
  }

  const canvasProps = {
    style: {
      width: '100%',
      height: '70vh',
      background: 'transparent',
    },
    id: 'pouchCanvas',
  }

  const controlsProps = { autoRotate: false }

  if (isLoading && !imageUrl && mealData.mealIngredients) {
    return (
      <div>
        {mealData && (
          <Ettiket
            meal={mealData}
            labelRef={appRef}
            randomColor={textureColor}
          />
        )}
      </div>
    )
  }

  return (
    <Layout>
      <Container isIndex={router.pathname === '/'}>
        <Stage
          canvasProps={canvasProps}
          controlsProps={controlsProps}
          mealProps={mealProps}
          isMealSaved={isSaved}
          bookmark={canSave}
          needsPlaceholderImage={mealMetadata.needsPlaceholder}
        >
          <PouchModel textureUrl={imageUrl} rotation={[0, Math.PI, 0]} />
        </Stage>

        {mealData && (
          <>
            <Head>
              <title>
                {mealData.mealName} #{mealData.mealId} by Apollo Foods 🚀
              </title>
            </Head>
            <RecipeContainer>
              <Section randomColor={textureColor}>
                <Typography variant="h2" as="h1">
                  #{mealData.mealId}
                </Typography>
                <Item>
                  <Label font="Blatant" as="label">
                    Recipe Name:
                  </Label>
                  <Typography variant="h3" as="h2">
                    {mealData.mealName}
                  </Typography>
                </Item>
                <Item inline>
                  <Item>
                    <Label font="Blatant" as="label">
                      Category:
                    </Label>
                    <Typography variant="h4" as="h3">
                      {mealData.mealCategory}
                    </Typography>
                  </Item>
                  <Item>
                    <Label font="Blatant" as="label">
                      Area:
                    </Label>
                    <Typography variant="h4" as="h3">
                      {mealData.mealArea}
                    </Typography>
                  </Item>
                </Item>
              </Section>
              {mealData.mealIngredients?.length !== 0 &&
                mealData.mealMeasure?.length !== 0 && (
                  <Section randomColor={textureColor}>
                    <Typography variant="h3" as="h2">
                      Ingredients
                    </Typography>
                    <Item inline isList>
                      <Item as="ul">
                        {mealData.mealIngredients?.map((ingredient, index) => (
                          <ListItem key={ingredient + index}>
                            {ingredient}
                          </ListItem>
                        ))}
                      </Item>
                      <Item as="ul" style={{ listStyle: 'none' }}>
                        {mealData.mealMeasure?.map((measure, index) => (
                          <ListItem key={measure + index} paddingLeft>
                            {measure}
                          </ListItem>
                        ))}
                      </Item>
                    </Item>
                  </Section>
                )}
              {mealData.mealInstructions && (
                <Section randomColor={textureColor}>
                  <Typography variant="h3" as="h2">
                    Instructions
                  </Typography>
                  <Typography
                    style={{ whiteSpace: 'pre-wrap', marginBottom: 16 }}
                    variant="p"
                    lineHeight="150%"
                  >
                    {mealData.mealInstructions}
                  </Typography>
                </Section>
              )}
            </RecipeContainer>
          </>
        )}
      </Container>
      <GenerateCard
        heading="Do you want to discover more recipes?"
        text="Just click the button below."
        buttonText="Generate now!"
        bgColor={textureColor}
        marginBottom
        createButton
      />
    </Layout>
  )
}

const Container = styled.div`
  z-index: 10;
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 4fr 3fr;
    gap: 3rem;
    margin-bottom: 4rem;
    #canvasContainer {
      position: sticky;
      top: 0px;
      height: 100vh;
      margin-top: -128px;
    }
  }
`

const RecipeContainer = styled.article`
  margin: 2rem 0;
`
const Section = styled.section`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 2px solid white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${({ randomColor }) => {
    if (randomColor.includes('orange')) {
      return css`
        background-color: hsla(11, 95%, 50%, 10%);
        color: var(--orange-90);
        border-color: var(--orange-90);
      `
    }
    if (randomColor.includes('blue')) {
      return css`
        background-color: hsla(193, 100%, 50%, 10%);
        color: var(--blue-90);
        border-color: var(--blue-90);
      `
    }
    return css`
      background-color: hsla(248, 43%, 50%, 10%);
      color: var(--purple-90);
      border-color: var(--purple-90);
    `
  }};
`
const Item = styled.div`
  ${({ inline }) => {
    if (inline) {
      return css`
        display: flex;
        flex-direction: row;
        gap: 2rem;
      `
    }
  }}
  ${({ isList }) => {
    if (isList) {
      return css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0rem;
        margin-left: 1rem;
        li {
          padding-top: 0.5rem;
          padding-bottom: 0rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
      `
    }
  }}
`
const ListItem = styled.li`
  border-bottom: 1px solid white;
  font-size: var(--body-small);
  ${({ paddingLeft }) => {
    if (paddingLeft) {
      return css`
        padding-left: 2rem;
        padding-right: 1rem;
      `
    }
  }}
`

const Label = styled(Typography)`
  margin-bottom: 8px;
  font-size: var(--body);
  letter-spacing: 0.5px;
`
