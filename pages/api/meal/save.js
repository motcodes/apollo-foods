import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/client'

const prisma = new PrismaClient()

export default async (req, res) => {
  const session = await getSession({ req })
  const body = JSON.parse(req.body)

  const { id: userId } = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

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
  // console.log(saveMeal)

  if (session && saveMeal) {
    res.send({ message: 'success' })
  } else {
    res.send({ message: 'error' })
  }
}
