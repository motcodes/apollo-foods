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
  const id = JSON.parse(req.body)

  try {
    const removeMeal = await prisma.meal.delete({
      where: {
        id: parseInt(id),
      },
    })

    if (removeMeal.id === parseInt(id)) {
      res.json({ message: 'success', success: true })
    } else {
      res.json({ message: 'error', success: false })
    }
  } catch (error) {
    res.json({ message: error, success: false })
  }
}
