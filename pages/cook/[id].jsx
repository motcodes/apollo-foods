import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Label as Ettiket } from '../../components/Label/Label'
import Layout from '../../components/Layout'
import Stage from '../../components/Stage/Stage'
import PouchModel from '../../components/Pouch'
import {
  fetcher,
  formatMeal,
  formatNewMeal,
  getRandomItem,
  mealDbById,
  server,
  useHtmlToImage,
  useMealById,
} from '../../lib'
import { Typography } from '../../utils'

import prisma from '../../prisma/prisma'
import useSWR from 'swr'

export async function getServerSideProps(context) {
  const { query } = context

  const fetchById = await fetcher(`${mealDbById}${query.id}`, {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': '*',
    },
  })
  const data = formatMeal(fetchById.meals[0])

  const id = JSON.parse(query.id)
  let checkMeal = await prisma.meal.findMany({
    where: {
      id: {
        equals: parseInt(id),
      },
    },
  })

  checkMeal = JSON.parse(JSON.stringify(checkMeal))
  let isMealSaved
  if (checkMeal[0]?.id === parseInt(id)) {
    isMealSaved = { textureColor: checkMeal[0].textureColor, isSaved: true }
  } else {
    isMealSaved = { textureColor: getRandomItem(colors), isSaved: false }
  }

  return {
    props: {
      data: {
        mealId: data.mealId,
        mealName: data.mealName,
        mealCategory: data.mealCategory,
        mealArea: data.mealArea,
        mealInstructions: data.mealInstructions,
        mealRecipeSource: data.mealRecipeSource,
        mealImageLink: data.mealImageLink,
        mealIngredients: data.mealIngredients,
        mealMeasure: data.mealMeasure,
      },
      mealIngredients: data.mealIngredients,
      mealMeasure: data.mealMeasure,
      isMealSaved: isMealSaved,
    },
  }
}

export default function Meal(props) {
  props.data.mealIngredients = props.mealIngredients
  props.data.mealMeasure = props.mealMeasure
  const initialData = props.data

  const { data: newMealData } = useSWR(
    `${server}/api/meal/${initialData.mealId}`,
    fetcher,
    { initialData: initialData }
  )

  const [mealData, setMealData] = useState(newMealData)

  const [randomColor] = useState(props.isMealSaved?.textureColor)
  const [isMealSaved] = useState(props.isMealSaved?.isSaved)

  const [generateImage, appRef, imageUrl, isLoading] = useHtmlToImage(2048)

  useEffect((e) => {
    generateImage(e)
  }, [])
  useEffect(() => {
    async function refetchMeal() {
      const refetchedMeal = await fetcher(
        `${server}/api/meal/${initialData.mealId}`
      )
      const newMeal = formatMeal(refetchedMeal)
      setMealData(newMeal)
    }
    if (mealData?.mealIngredients || mealData?.mealMeasure) {
      refetchMeal()
    }
  }, [mealData])

  const mealProps = {
    id: mealData?.mealId,
    name: mealData?.mealName,
    textureColor: randomColor,
    createdAt: new Date(),
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

  if (isLoading && !imageUrl) {
    return (
      <div>
        {mealData && (
          <Ettiket
            meal={mealData}
            labelRef={appRef}
            randomColor={randomColor}
          />
        )}
      </div>
    )
  } else {
    return (
      <Layout>
        <Stage
          canvasProps={canvasProps}
          controlsProps={controlsProps}
          mealData={mealProps}
          isMealSaved={isMealSaved}
          bookmark
          isPlaceholderImage
        >
          <PouchModel textureUrl={imageUrl} rotation={[0, Math.PI, 0]} />
        </Stage>

        {mealData && (
          <RecipeContainer>
            <Section randomColor={randomColor}>
              <Typography variant="h1">#{mealData.mealId}</Typography>
              <Item>
                <Label font="Blatant" as="label">
                  Recipe Name:
                </Label>
                <Typography variant="h2">{mealData.mealName}</Typography>
              </Item>
              <Item inline>
                <Item>
                  <Label font="Blatant" as="label">
                    Category:
                  </Label>
                  <Typography variant="h3">{mealData.mealCategory}</Typography>
                </Item>
                <Item>
                  <Label font="Blatant" as="label">
                    Area:
                  </Label>
                  <Typography variant="h3">{mealData.mealArea}</Typography>
                </Item>
              </Item>
            </Section>
            {mealData.mealIngredients?.length !== 0 &&
              mealData.mealMeasure?.length !== 0 && (
                <Section randomColor={randomColor}>
                  <Typography variant="h2">Ingredients</Typography>
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
              <Section randomColor={randomColor}>
                <Typography variant="h2">Instructions</Typography>
                <Typography
                  style={{ whiteSpace: 'pre-wrap', marginBottom: 16 }}
                >
                  {mealData.mealInstructions}
                </Typography>
              </Section>
            )}
          </RecipeContainer>
        )}
      </Layout>
    )
  }
}

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
    } else if (randomColor.includes('blue')) {
      return css`
        background-color: hsla(193, 100%, 50%, 10%);
        color: var(--blue-90);
        border-color: var(--blue-90);
      `
    } else {
      return css`
        background-color: hsla(248, 43%, 50%, 10%);
        color: var(--purple-90);
        border-color: var(--purple-90);
      `
    }
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
        display: flex;
        flex-direction: row;
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
  font-size: var(--body-large);
`

const colors = [
  'var(--orange-20)',
  'var(--orange-30)',
  'var(--orange-40)',
  'var(--orange-40)',
  'var(--orange-50)',
  'var(--blue-20)',
  'var(--blue-30)',
  'var(--blue-40)',
  'var(--blue-50)',
  'var(--purple-20)',
  'var(--purple-30)',
  'var(--purple-40)',
  'var(--purple-50)',
]
