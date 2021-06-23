/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { getSession } from 'next-auth/client'
import { isEmptyOrSpaces } from '../../../lib'

import prisma from '../../../prisma/prisma'

export default async function (req, res) {
  const session = await getSession({ req })
  const { email, username } = session.user

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  Object.keys(user).forEach((key) => {
    if (!user[key]) {
      user[key] = ''
    }
  })

  if (!isEmptyOrSpaces(user.username)) {
    const meals = await prisma.meal.findMany({
      where: {
        username,
      },
    })

    user.meals = [...meals]
  }

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
