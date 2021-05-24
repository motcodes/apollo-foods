import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/client'

const prisma = new PrismaClient()

export default async (req, res) => {
  const session = await getSession({ req })
  const body = JSON.parse(req.body)
  // console.log('req.body :', body)

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
      texture: '',
      placeholderImage: body.placeholderImage,
    },
  })
  // console.log(saveMeal)

  if (session) {
    res.send({ message: 'success' })
  } else {
    res.send({ message: 'error' })
  }
}
