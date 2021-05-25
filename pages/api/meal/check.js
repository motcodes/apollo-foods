import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

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
