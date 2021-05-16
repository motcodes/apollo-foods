import { useEffect } from 'react'
import { Label } from '../../components/Label/Label'
import Layout from '../../components/Layout'
import Stage from '../../components/Stage/Stage'
import PouchModel from '../../components/Pouch'
import {
  fetcher,
  formatMeal,
  mealDbById,
  useHtmlToImage,
  useMealById,
} from '../../lib'
import { Typography } from '../../utils'

export async function getServerSideProps(context) {
  const { query } = context
  const fetchById = await fetcher(`${mealDbById}${query.id}`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': '*',
    },
  })
  const data = formatMeal(fetchById.meals[0])

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
    },
  }
}

export default function Meal(props) {
  props.data.mealIngredients = props.mealIngredients
  props.data.mealMeasure = props.mealMeasure
  const { data, isError } = useMealById(props.data.mealId, {
    initialData: props.data,
  })

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
  const controlsProps = { autoRotate: true }

  if (isLoading && !imageUrl) {
    return <div>{data && <Label meal={data} labelRef={appRef} />}</div>
  } else {
    return (
      <Layout>
        <Stage canvasProps={canvasProps} controlsProps={controlsProps}>
          <PouchModel textureUrl={imageUrl} rotation={[0, Math.PI, 0]} />
        </Stage>
        <Typography variant="h1" color="white">
          {data.mealName}
        </Typography>
      </Layout>
    )
  }
}
