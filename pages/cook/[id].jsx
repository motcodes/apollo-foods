import { useEffect, useState } from 'react'
import { PrismaClient } from '@prisma/client'
import { Label } from '../../components/Label/Label'
import Layout from '../../components/Layout'
import Stage from '../../components/Stage/Stage'
import PouchModel from '../../components/Pouch'
import {
  fetcher,
  formatMeal,
  getRandomItem,
  mealDbById,
  useHtmlToImage,
  useMealById,
} from '../../lib'
import { Typography } from '../../utils'

const prisma = new PrismaClient()

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
  const { data } = useMealById(props.data.mealId, {
    initialData: props.data,
  })

  const [randomColor] = useState(props.isMealSaved?.textureColor)
  const [isMealSaved] = useState(props.isMealSaved?.isSaved)

  const mealData = {
    id: props.data.mealId,
    name: props.data.mealName,
    textureColor: randomColor,
    createdAt: new Date(),
  }

  const [generateImage, appRef, imageUrl, isLoading] = useHtmlToImage(2048)

  useEffect((e) => {
    generateImage(e)
  }, [])

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
        {data && (
          <Label meal={data} labelRef={appRef} randomColor={randomColor} />
        )}
      </div>
    )
  } else {
    return (
      <Layout>
        <Stage
          canvasProps={canvasProps}
          controlsProps={controlsProps}
          mealData={mealData}
          isMealSaved={isMealSaved}
          bookmark
          isPlaceholderImage
        >
          <PouchModel textureUrl={imageUrl} rotation={[0, Math.PI, 0]} />
        </Stage>
        <Typography variant="h1" color="white">
          {data.mealName}
        </Typography>
      </Layout>
    )
  }
}

const colors = [
  'var(--orange-20)',
  'var(--orange-30)',
  'var(--orange-40)',
  'var(--orange-50)',
  'var(--orange-60)',
  'var(--blue-20)',
  'var(--blue-30)',
  'var(--blue-40)',
  'var(--blue-50)',
  'var(--blue-60)',
  'var(--purple-20)',
  'var(--purple-30)',
  'var(--purple-40)',
  'var(--purple-50)',
  'var(--purple-60)',
]
