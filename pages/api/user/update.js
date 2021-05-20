import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/client'

const prisma = new PrismaClient()

export default async (req, res) => {
  const session = await getSession({ req })
  const body = JSON.parse(req.body)
  console.log('req.body :', body)

  if (body && body.emailVerified === '') {
    body.emailVerified = null
  }
  const user = await prisma.user.update({
    where: {
      email: body.email,
    },
    data: {
      ...body,
    },
  })

  if (session) {
    res.send({ message: 'success' })
  } else {
    res.send({ message: 'error' })
  }
}
