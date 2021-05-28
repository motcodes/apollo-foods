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
  const body = JSON.parse(req.body)

  try {
    const { id: userId } = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })
    // console.log('session && saveMeal :', userId)

    const saveMeal = await prisma.meal.create({
      data: {
        id: parseInt(body.id),
        name: body.name,
        createdAt: body.createdAt,
        userId: userId,
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
