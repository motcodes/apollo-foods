/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { getSession } from 'next-auth/client'
import prisma from '../../../prisma/prisma'

export default async (req, res) => {
  const session = await getSession({ req })
  const body = JSON.parse(req.body)
  // console.log('req.body :', session)

  if (body && body.emailVerified === '') {
    body.emailVerified = null
  }
  const user = await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      ...body,
    },
  })

  if (user) {
    res.send({ message: 'success' })
  } else {
    res.send({ message: 'error' })
  }
}
