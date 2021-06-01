/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { getSession } from 'next-auth/client'

import prisma from '../../../prisma/prisma'
export default async (req, res) => {
  const session = await getSession({ req })
  const { email } = session.user

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  Object.keys(user).forEach((key) => {
    if (!user[key]) {
      user[key] = ''
    }
  })

  const meals = await prisma.meal.findMany({
    where: {
      userId: user.id,
    },
  })

  user.meals = [...meals]

  if (session) {
    res.json({
      user,
    })
  } else {
    res.json({
      user: {},
    })
  }
}
