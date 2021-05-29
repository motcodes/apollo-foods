import { useEffect, useState } from 'react'
import router from 'next/router'
import { useSession } from 'next-auth/client'
import styled from 'styled-components'
import Layout from '../../../components/Layout'
import { fetcher, server, useUserState } from '../../../lib'
import { Button, Typography, Input, Textarea } from '../../../utils'

import prisma from '../../../prisma/prisma'

export async function getServerSideProps(context) {
  const { username } = context.query
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  })

  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  }
}

function Settings(props) {
  const { user } = props
  const [session] = useSession()
  const [userData, dispatchUser] = useUserState(user)
  const [usernameIsTaken, setUsernameIsTaken] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [buttonText, setButtonText] = useState('Save my data')
  const [isDeleteModal, setDeleteModal] = useState(false)

  async function updateUser(e) {
    e.preventDefault()

    if (
      userData.username === '' ||
      userData.username === ' ' ||
      userData.username === null ||
      userData.username.length < 3
    ) {
      setUsernameError(true)
      setButtonText('Try again')
      return
    } else {
      setUsernameError(false)
    }

    const checkUsername = await fetcher(`${server}/api/user/check`, {
      method: 'POST',
      body: JSON.stringify(userData.username),
    })

    // console.log('checkUsername :', checkUsername)
    if (checkUsername.isTaken) {
      setUsernameIsTaken(true)
      setButtonText('Try again')
      return
    } else {
      setUsernameIsTaken(false)
    }
    setButtonText('Save my data')

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
      } else {
        router.push(`/u/[username]`, `/u/${userData.username}`)
      }
    }
  }

  async function deleteUser(e) {
    e.stopPropagation()

    const deleteUser = await fetcher(`${server}/api/user/delete`)
    // console.log('deleteUser :', deleteUser)
    if (deleteUser.message === 'success') {
      router.push('/')
    }
  }

  return (
    <Layout>
      {session && userData && (
        <UserContainer onSubmit={updateUser} aria-label="form">
          <Typography variant="h1">Your Info</Typography>
          <Input
            id="fullname"
            label="Name*"
            name="name"
            value={userData.name}
            onChange={(e) =>
              dispatchUser({ type: 'name', value: e.target.value })
            }
          />
          <Input
            id="username"
            label="Username"
            name="username"
            value={userData.username}
            onChange={(e) =>
              dispatchUser({ type: 'username', value: e.target.value })
            }
            isTaken={usernameIsTaken}
            error={usernameError}
            // disabled
          />
          <Input
            id="email"
            label="Email"
            type="email"
            name="email"
            value={userData.email}
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

          <DangerContainer>
            <Typography variant="h4">This is the danger zone!</Typography>
            <DangerWrapper>
              <Typography font="Blatant">
                You can delete your Account here.
              </Typography>
              <Button
                scale={0.8}
                type="button"
                onClick={() => setDeleteModal(true)}
              >
                Delete my Account
              </Button>
            </DangerWrapper>
          </DangerContainer>
        </UserContainer>
      )}
      {isDeleteModal && (
        <DeletePanel onClick={() => setDeleteModal(false)}>
          <DeleteModal>
            <Typography variant="h4">
              Are you sure you want to delete your Account?
            </Typography>
            <section>
              <CancelButton onClick={() => setDeleteModal(false)}>
                Cancel
              </CancelButton>
              <ConfirmButton onClick={deleteUser}>Delete</ConfirmButton>
            </section>
          </DeleteModal>
        </DeletePanel>
      )}
    </Layout>
  )
}
export default Settings

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

const DangerContainer = styled.section`
  margin-top: 5rem;
`
const DangerWrapper = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid var(--orange-30);
  background-color: hsla(11, 95%, 50%, 20%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  button {
    margin: 1rem 0 0;
    transform-origin: left;
  }
`

const DeletePanel = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  display: grid;
  place-content: center;
`
const DeleteModal = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  padding: 1rem;
  border-radius: 12px;
  background-color: white;
  color: black;
  section {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
`
const CancelButton = styled(Button)`
  flex: 1;
`
const ConfirmButton = styled(Button)`
  flex: 1;
  color: var(--orange-50);
  background-color: white;
  &:hover {
    background-color: var(--orange-90);
  }
`
