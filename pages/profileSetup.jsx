/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { useState } from 'react'
import styled from 'styled-components'
import router from 'next/router'
import { useSession } from 'next-auth/client'
import Layout from '../components/Layout'
import { Button, Typography, Input, Textarea, UserContainer } from '../utils'
import {
  fetcher,
  server,
  useUser,
  useUserState,
  usernameValidation,
  isEmptyOrSpaces,
} from '../lib'
import { FallbackProfileImage, ProfileImage } from '../components/ProfileImage'

function ProfileSetup() {
  const [session] = useSession()
  const user = useUser()
  const [userData, dispatchUser] = useUserState(user)
  const [usernameIsTaken, setUsernameIsTaken] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [buttonText, setButtonText] = useState('Save my data')

  async function saveUser(e) {
    e.preventDefault()

    if (isEmptyOrSpaces(userData.name)) {
      setNameError(true)
      setButtonText('Try again')
      return
    }
    setNameError(false)

    userData.username = userData.username?.replace('@', '')
    const isValidUsername = usernameValidation(userData.username)

    if (isEmptyOrSpaces(userData.username) || !isValidUsername) {
      setUsernameError(true)
      setButtonText('Try again')
      return
    }
    setUsernameError(false)

    const checkUsername = await fetcher(`${server}/api/user/check`, {
      method: 'POST',
      body: JSON.stringify(userData.username),
    })

    if (checkUsername.isTaken) {
      setUsernameIsTaken(true)
      setButtonText('Try again')
      return
    }
    setUsernameIsTaken(false)

    setButtonText('Save my data')

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
      } else {
        router.push(`/u/[username]`, `/u/${userData.username}`)
      }
    }
  }

  return (
    <Layout>
      {session && user && (
        <UserContainer onSubmit={saveUser} aria-label="form">
          {user.image ? (
            <ProfileImage src={user.image} alt={userData.name} />
          ) : (
            <FallbackProfileImage letter={user.email[0]} />
          )}
          <Typography variant="h1">Your Info</Typography>
          <Input
            id="fullname"
            label="Name*"
            name="name"
            value={userData.name}
            onChange={(e) =>
              dispatchUser({ type: 'name', value: e.target.value })
            }
            error={nameError}
            minLength={1}
          />
          <Input
            id="username"
            label="Username*"
            name="username"
            value={userData.username}
            onChange={(e) =>
              dispatchUser({ type: 'username', value: e.target.value })
            }
            isTaken={usernameIsTaken}
            error={usernameError}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            name="email"
            value={user.email}
            disabled
          />
          <Textarea
            id="bio"
            label="Bio"
            name="bio"
            value={userData.bio}
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
            value={userData.website}
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
            value={userData.twitter}
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
            value={userData.instagram}
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
            value={userData.reddit}
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
            value={userData.dribbble}
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
            value={userData.github}
            onChange={(e) =>
              dispatchUser({ type: 'github', value: e.target.value })
            }
          />

          <SaveButton type="submit" fullWidth>
            {buttonText}
          </SaveButton>
        </UserContainer>
      )}
    </Layout>
  )
}

export default ProfileSetup

const SaveButton = styled(Button)`
  margin-top: 2rem;
`
