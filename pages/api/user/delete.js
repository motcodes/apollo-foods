/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { getSession } from 'next-auth/client'
import prisma from '../../../prisma/prisma'

export default async (req, res) => {
  const session = await getSession({ req })

  const user = await prisma.user.findUnique({
    where: {
      username: session.user.username,
    },
  })

  const removeMeals = prisma.meal.deleteMany({
    where: {
      userId: parseInt(user.id),
    },
  })
  const removeUser = prisma.user.delete({
    where: {
      id: user.id,
    },
  })

  const transaction = await prisma.$transaction([removeMeals, removeUser])
  console.log('transaction :', transaction)
  if (transaction) {
    res.json({ message: 'success', success: true })
  } else {
    res.json({ message: 'error', success: false })
  }
}
