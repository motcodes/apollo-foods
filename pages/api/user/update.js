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
