import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import router from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/client'
import Layout from '../components/Layout'
import { Button, Link, Typography, Input, Textarea } from '../utils'
import { fetcher, server, useUser, useUserState } from '../lib'

function Demo() {
  const [session] = useSession()
  const user = useUser()

  useEffect(() => {
    if (session && user && user.username) {
      router.replace(`/u/[username]`, `/u/${user.username}`)
    } else if (session && user) {
      router.replace(`/profileSetup`)
    }
  }, [session, user])

  return (
    <Layout>
      <Center>
        {!session && (
          <>
            Not signed in <br />
            <Button onClick={signIn}>Sign In</Button>
          </>
        )}
        {session && user && (
          <>
            Sign in as {user.email} <br />
            <div>you can acces super secret pages</div>
            <Link href="/secret">To Secret</Link>
            <Button onClick={signOut}>Sign Out</Button>
            <pre style={{ marginTop: 32 }}>{JSON.stringify(user, null, 2)}</pre>
          </>
        )}
      </Center>
    </Layout>
  )
}

export default Demo

const Center = styled.div`
  display: grid;
  place-content: center;
  overflow: hidden;
`

const UserContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 720px;
  margin: 2rem auto 4rem;
  padding: 0 0.5rem;
`

const ImageWrapper = styled.div`
  --imageSize: 96px;
  --mBottom: 8px;
  max-width: var(--imageSize);
  max-height: var(--imageSize);
  margin-bottom: var(--mBottom);
  border: 2px solid var(--grey-80);
  border-radius: calc(var(--imageSize) / 2);
  img {
    border-radius: calc(var(--imageSize) / 2);
  }
  @media (min-width: 768px) {
    --imageSize: 128px;
    --mBottom: 16px;
  }
  @media (min-width: 1024px) {
    --imageSize: 204px;
    --mBottom: 24px;
  }
`

const SaveButton = styled(Button)`
  margin-top: 2rem;
`
