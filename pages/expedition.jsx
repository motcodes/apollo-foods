import styled from 'styled-components'
import { PrismaClient } from '@prisma/client'
import Layout from '../components/Layout'
import { CardGrid, Typography } from '../utils'
import { MealCard } from '../components/MealCard'

const prisma = new PrismaClient()

export async function getServerSideProps({}) {
  const meals = await prisma.meal.findMany({
    include: {
      user: {
        select: {
          username: true,
          image: true,
        },
      },
    },
  })
  const mealData = JSON.parse(JSON.stringify(meals))
  return {
    props: { mealData },
  }
}

export default function Expedition(props) {
  const { mealData } = props
  return (
    <Layout>
      <Typography variant="h1">Expedition</Typography>
      <Typography variant="h6" as="h2">
        Discover and see which recipes your astronaut colleagues want to cook.
      </Typography>
      <CardGrid>
        {mealData &&
          mealData.map((meal, index) => (
            <MealCard
              key={meal.id * index}
              id={meal.id}
              name={meal.name}
              placeholderImage={meal.placeholderImage}
              user={meal.user}
            />
          ))}
      </CardGrid>
    </Layout>
  )
}
