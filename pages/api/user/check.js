/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { getSession } from 'next-auth/client'
import prisma from '../../../prisma/prisma'

export default async (req, res) => {
  const username = JSON.parse(req.body)
  // console.log('username :', username)
  const session = await getSession({ req })

  const checkUsername = await prisma.user.findMany({
    where: {
      username: username,
    },
  })

  if (
    checkUsername.length === 0 ||
    checkUsername[0]?.email === session.user.email
  ) {
    res.json({ isTaken: false })
  } else {
    res.json({ isTaken: true })
  }
}
