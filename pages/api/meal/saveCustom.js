/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { getSession } from 'next-auth/client'

import prisma from '../../../prisma/prisma'

export default async function (req, res) {
  const session = await getSession({ req })
  const body = JSON.parse(req.body)

  try {
    const saveMeal = await prisma.meal.create({
      data: {
        id: parseInt(body.id),
        name: body.name,
        creatorUsername: session.user.username,
      },
    })

    const saveCustomRecipe = await prisma.customRecipe.create({
      data: {
        area: body.area,
        category: body.category,
        instruction: body.instruction,
        ingredients: body.ingredients,
        measure: body.measure,
        mealId: saveMeal.id,
        ownerUsername: session.user.username,
      },
    })

    if (session && saveMeal && saveCustomRecipe) {
      res.json({ message: 'success', success: true })
    } else {
      res.json({ message: 'error', success: false })
    }
  } catch (error) {
    res.json({ message: error, success: false })
  }
}
