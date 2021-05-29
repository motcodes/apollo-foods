import { getSession } from 'next-auth/client'
// const { PrismaClient } = require('@prisma/client')

// let prisma
// if (process.env.NODE_ENV !== 'production') {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient({
//       debug: true,
//     })
//   }
//   prisma = global.prisma
// } else {
//   prisma = new PrismaClient()
// }
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
