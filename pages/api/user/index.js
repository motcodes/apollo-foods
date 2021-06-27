/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { getSession } from 'next-auth/client'

import prisma from '../../../prisma/prisma'

export default async function (req, res) {
  const session = await getSession({ req })
  const { email } = session.user

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      createdMeals: true,
      savedMeals: true,
    },
  })

  Object.keys(user).forEach((key) => {
    if (!user[key]) {
      user[key] = ''
    }
  })

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
