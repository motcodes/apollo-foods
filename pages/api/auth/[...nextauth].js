/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import NextAuth from 'next-auth'
import Adapters from 'next-auth/adapters'
import Providers from 'next-auth/providers'

import prisma from '../../../prisma/prisma'

const options = {
  providers: [
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  pages: {
    newUser: '/profileSetup',
  },
  callbacks: {
    async session(session, user) {
      session.user.username = user.username
      session.user.image = user.image
      return session
    },
    async redirect(url, baseUrl) {
      return url.startsWith(baseUrl) ? url : baseUrl
    },
  },
}

export default (req, res) => NextAuth(req, res, options)
