/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { getSession } from 'next-auth/client'

import prisma from '../../../prisma/prisma'

export default async function (req, res) {
  const session = await getSession({ req })
  console.log('session :', session)
  const body = JSON.parse(req.body)

  try {
    const saveMeal = await prisma.meal.create({
      data: {
        id: parseInt(body.id),
        name: body.name,
        createdAt: body.createdAt,
        username: session.user.username,
        textureColor: body.textureColor,
        placeholderImage: body.placeholderImage,
      },
    })

    if (session && saveMeal) {
      res.json({ message: 'success', success: true })
    } else {
      res.json({ message: 'error', success: false })
    }
  } catch (error) {
    res.json({ message: error, success: false })
  }
}
