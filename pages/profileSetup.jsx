import { useEffect, useState } from 'react'
import styled from 'styled-components'
import router from 'next/router'
import { useSession } from 'next-auth/client'
import Layout from '../components/Layout'
import { Button, Typography, Input, Textarea } from '../utils'
import { fetcher, server, useUser, useUserState } from '../lib'
import { ProfileImage } from '../components/ProfileImage'

function ProfileSetup() {
  const [session] = useSession()
  const [userState, dispatchUser] = useUserState()
  const user = useUser()
  const [usernameError, setUsernameError] = useState(false)

  useEffect(() => {
    if (user) {
      dispatchUser({ type: 'name', value: user.name })
    }
  }, [user])

  async function saveUser(e) {
    e.preventDefault()
    const userData = { ...user, ...userState }

    if (
      userData.username === '' ||
      userData.username === ' ' ||
      userData.username === null
    ) {
      setUsernameError(true)
    } else {
      userData.username = userData.username?.replace('@', '')
      userData.twitter = userData.twitter?.replace('@', '')
      userData.instagram = userData.instagram?.replace('@', '')
      userData.dribbble = userData.dribbble?.replace('@', '')
      userData.github = userData.github?.replace('@', '')
      userData.reddit = userData.reddit?.replace('@', '').replace('u/', '')

      delete userData.meals

      const infoData = await fetcher(`${server}/api/user/update`, {
        method: 'POST',
        body: JSON.stringify(userData),
      })
      // console.log('infoData :', infoData)
      if (infoData.message === 'success') {
        if (router.query.callbackUrl) {
          const callbackUrl = new URL(router.query.callbackUrl)
          if (callbackUrl.pathname.includes('/cook/')) {
            router.replace(callbackUrl.pathname)
          } else {
            router.push(`/u/[username]`, `/u/${userData.username}`)
          }
        }
      }
    }
  }

  return (
    <Layout>
      {session && user && (
        <UserContainer onSubmit={saveUser} aria-label="form">
          <ProfileImage src={user.image} alt={useState.name} />
          <Typography variant="h1">Your Info</Typography>
          <Input
            id="fullname"
            label="Name*"
            name="name"
            value={userState.name}
            onChange={(e) =>
              dispatchUser({ type: 'name', value: e.target.value })
            }
          />
          <Input
            id="username"
            label="Username*"
            name="username"
            value={userState.username}
            onChange={(e) =>
              dispatchUser({ type: 'username', value: e.target.value })
            }
            error={false}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            name="email"
            value={userState.email}
            disabled
          />
          <Textarea
            id="bio"
            label="Bio"
            name="bio"
            value={userState.bio}
            onChange={(e) =>
              dispatchUser({ type: 'bio', value: e.target.value })
            }
          />

          <Typography variant="h3" as="h2" style={{ marginTop: 16 }}>
            Social Links
          </Typography>
          <Input
            id="website"
            label="Website"
            type="url"
            name="website"
            placeholder="https://mywebsite.com"
            value={userState.website}
            onChange={(e) =>
              dispatchUser({ type: 'website', value: e.target.value })
            }
          />
          <Input
            id="twitter"
            label="Twitter"
            type="text"
            name="twitter"
            placeholder="@twitter"
            value={userState.twitter}
            onChange={(e) =>
              dispatchUser({ type: 'twitter', value: e.target.value })
            }
          />
          <Input
            id="instagram"
            label="Instagram"
            type="text"
            name="instagram"
            placeholder="@instagram"
            value={userState.instagram}
            onChange={(e) =>
              dispatchUser({ type: 'instagram', value: e.target.value })
            }
          />
          <Input
            id="reddit"
            label="Reddit"
            type="text"
            name="reddit"
            placeholder="u/reddit"
            value={userState.reddit}
            onChange={(e) =>
              dispatchUser({ type: 'reddit', value: e.target.value })
            }
          />
          <Input
            id="dribbble"
            label="Dribbble"
            type="text"
            name="dribbble"
            placeholder="@dribbble"
            value={userState.dribbble}
            onChange={(e) =>
              dispatchUser({ type: 'dribbble', value: e.target.value })
            }
          />
          <Input
            id="github"
            label="Github"
            type="text"
            name="github"
            placeholder="@github"
            value={userState.github}
            onChange={(e) =>
              dispatchUser({ type: 'github', value: e.target.value })
            }
          />

          <SaveButton type="submit" fullWidth>
            Save my data
          </SaveButton>
        </UserContainer>
      )}
    </Layout>
  )
}

export default ProfileSetup

const UserContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 720px;
  margin: 2rem auto 4rem;
  padding: 0 0.5rem;
`

const SaveButton = styled(Button)`
  margin-top: 2rem;
`
