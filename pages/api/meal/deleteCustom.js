/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { getSession } from 'next-auth/client'
import prisma from '../../../prisma/prisma'

export default async function (req, res) {
  const session = await getSession({ req })
  const mealId = parseInt(req.body)

  try {
    if (!session) throw new Error('not logged in')

    const removeCustomRecipe = prisma.customRecipe.delete({
      where: {
        mealId,
      },
    })
    const removeMeal = prisma.meal.delete({
      where: {
        id: mealId,
      },
    })

    const transaction = await prisma.$transaction([
      removeCustomRecipe,
      removeMeal,
    ])
    console.log('transaction :', transaction)

    if (transaction) {
      res.json({ message: 'success', success: true })
    } else {
      res.json({ message: 'error', success: false })
    }
  } catch (error) {
    console.log('error :', error)
    res.json({ message: error, success: false })
  }
}
