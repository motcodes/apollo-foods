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
    if (body.isInDb) {
      const inDbMeal = await prisma.meal.findUnique({
        where: {
          id: parseInt(body.id),
        },
      })
      const updatedUser = await prisma.user.update({
        where: {
          username: session.user.username,
        },
        data: {
          savedMeals: {
            connect: { id: inDbMeal.id },
          },
        },
      })
      if (updatedUser) {
        res.json({ message: 'success', success: true })
      } else {
        res.json({ message: 'error', success: false })
      }
    } else {
      const saveMeal = await prisma.meal.create({
        data: {
          id: parseInt(body.id),
          name: body.name,
          createdAt: body.createdAt,
          creatorUsername: session.user.username,
          textureColor: body.textureColor,
          placeholderImage: body.placeholderImage,
        },
      })
      // console.log('saveMeal :', saveMeal)

      if (session && saveMeal) {
        res.json({ message: 'success', success: true })
      } else {
        res.json({ message: 'error', success: false })
      }
    }
  } catch (error) {
    console.log(error)
    res.json({ message: error, success: false })
  }
}
