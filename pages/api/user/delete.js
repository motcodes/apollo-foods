import { getSession } from 'next-auth/client'
import prisma from '../../../prisma/prisma'

export default async (req, res) => {
  const session = await getSession({ req })

  const user = await prisma.user.findUnique({
    where: {
      username: session.user.username,
    },
  })
  const removeUser = await prisma.user.delete({
    where: {
      id: user.id,
    },
  })
  const removeUser = await prisma.meal.delete({
    where: {
      userId: user.id,
    },
  })

  if (removeUser.id === parseInt(user.id)) {
    res.json({ message: 'success', success: true })
  } else {
    res.json({ message: 'error', success: false })
  }
}
