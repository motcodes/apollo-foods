import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/client'

const prisma = new PrismaClient()

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
