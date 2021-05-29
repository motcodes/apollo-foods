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

  const checkMeal = await prisma.meal.findMany({
    where: {
      id: {
        equals: parseInt(id),
      },
    },
  })

  if (checkMeal[0]?.id === parseInt(id)) {
    res.json({ textureColor: checkMeal[0].textureColor, isSaved: true })
  } else {
    res.json({ isSaved: false })
  }
}
