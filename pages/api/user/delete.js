/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { getSession } from 'next-auth/client'
import prisma from '../../../prisma/prisma'

export default async function (req, res) {
  const session = await getSession({ req })

  const removeMeals = prisma.meal.deleteMany({
    where: {
      creatorUsername: session.user.username,
    },
  })
  const removeCustomRecipe = prisma.customRecipe.deleteMany({
    where: {
      ownerUsername: session.user.username,
    },
  })
  const removeUser = prisma.user.delete({
    where: {
      username: session.user.username,
    },
  })

  const transaction = await prisma.$transaction([
    removeMeals,
    removeCustomRecipe,
    removeUser,
  ])
  console.log('transaction :', transaction)
  if (transaction) {
    res.json({ message: 'success', success: true })
  } else {
    res.json({ message: 'error', success: false })
  }
}

// Kown Bug where Account Tabel can't get deleted
// const account = await prisma.account.findUnique({
//   where: {
//     user_id: transaction[2].id,
//   },
//   select: {
//     id: true,
//   },
// })
// console.log('account :', account)
// const removeAccount = await prisma.account.delete({
//   where: {
//     id: account.id,
//   },
// })
// console.log('removeAccount :', removeAccount)
// if (removeAccount) {
//   res.json({ message: 'success', success: true })
// } else {
//   res.json({ message: 'error', success: false })
// }
