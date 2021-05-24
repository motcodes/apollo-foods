import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async (req, res) => {
  const id = JSON.parse(req.body)
  console.log('id :', id)
  const removeMeal = await prisma.meal.delete({
    where: {
      id: parseInt(id),
    },
  })
  // console.log(removeMeal )

  if (removeMeal.id === parseInt(id)) {
    res.send({ message: 'success' })
  } else {
    res.send({ message: 'error' })
  }
}
