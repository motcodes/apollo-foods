/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import Layout from '../components/Layout'
import { MealCard, MealCardSkeleton } from '../components/MealCard'
import { CardGrid, Typography, Intro } from '../utils'

import prisma from '../prisma/prisma'

export async function getServerSideProps() {
  const meals = await prisma.meal.findMany({
    include: {
      user: {
        select: {
          username: true,
          image: true,
        },
      },
    },
    take: 20,
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
      <Intro>
        <Typography variant="h1">Expedition</Typography>
        <Typography as="h2">
          Discover and see which recipes your astronaut colleagues want to cook.
        </Typography>
      </Intro>
      <CardGrid>
        {!mealData
          ? [0, 1, 2, 3, 4, 5].map((meal) => <MealCardSkeleton key={meal} />)
          : mealData.map((meal, index) => (
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
