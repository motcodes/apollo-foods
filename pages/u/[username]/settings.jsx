import { useState, Fragment } from 'react'
import router from 'next/router'
import { signOut, useSession } from 'next-auth/client'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import Layout from '../../../components/Layout'
import {
  fetcher,
  isEmptyOrSpaces,
  server,
  usernameValidation,
  useUserState,
} from '../../../lib'
import {
  Button,
  Typography,
  Input,
  Textarea,
  UserContainer,
} from '../../../utils'

import prisma from '../../../prisma/prisma'

export async function getServerSideProps(context) {
  const { username } = context.query
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      createdMeals: {
        where: {
          customRecipe: {
            isNot: null,
          },
        },
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  }
}

function Settings(props) {
  const { user } = props
  console.log('user :', user)
  const [session] = useSession()
  const [userData, dispatchUser] = useUserState(user)
  const [usernameIsTaken, setUsernameIsTaken] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [buttonText, setButtonText] = useState('Save my data')
  const [isDeleteModal, setDeleteModal] = useState(false)
  const [isDeleteModalRecipe, setDeleteModalRecipe] = useState(false)
  const [deleteRecipeId, setDeleteRecipeId] = useState('')
  const [createdMeals, setCreatedMeals] = useState(user.createdMeals)

  async function updateUser(e) {
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
    delete userData.createdMeals

    const infoData = await fetcher(`${server}/api/user/update`, {
      method: 'POST',
      body: JSON.stringify(userData),
    })

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
    const deleteUserRes = await fetcher(`${server}/api/user/delete`)
    if (deleteUserRes.success) {
      toast.success('Successfully deleted your account')
      signOut({ callbackUrl: '/' })
    } else {
      toast.error('Error while deleting your account')
    }
  }

  async function deleteRecipe(e) {
    e.preventDefault()

    const deleteCustomRecipe = await fetcher(
      `${server}/api/meal/deleteCustom`,
      {
        method: 'POST',
        body: JSON.stringify(deleteRecipeId),
      }
    )
    if (deleteCustomRecipe.success) {
      setCreatedMeals(createdMeals.filter((m) => m.id !== deleteRecipeId))
      toast.success('Successfully deleted recipe')
    } else {
      console.log(deleteCustomRecipe.message)
      toast.error('Error while deleting your recipe')
    }
  }

  return (
    <Layout>
      {session && userData && (
        <UserContainer aria-label="form" onSubmit={updateUser}>
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
        </UserContainer>
      )}
      <UserContainer as="section">
        {createdMeals.length !== 0 && (
          <>
            <Typography variant="h3" as="h2" style={{ marginTop: 16 }}>
              Custom Recipes
            </Typography>
            <MealContainer>
              {createdMeals.map((meal) => (
                <Fragment key={meal.id}>
                  <Typography variant="h5">{meal.name}</Typography>
                  <DeleteButton
                    onClick={() => {
                      setDeleteModalRecipe(true)
                      setDeleteRecipeId(meal.id)
                    }}
                  >
                    Delete
                  </DeleteButton>
                </Fragment>
              ))}
            </MealContainer>
          </>
        )}

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
      {isDeleteModal && (
        <DeleteModal
          setDeleteModal={() => setDeleteModal(false)}
          deleteFunction={deleteUser}
        />
      )}
      {isDeleteModalRecipe && (
        <DeleteModal
          setDeleteModal={() => setDeleteModalRecipe(false)}
          deleteFunction={deleteRecipe}
          text="Are you sure you want to delete your Recipe?"
        />
      )}
    </Layout>
  )
}
export default Settings

const DeleteModal = ({
  text = 'Are you sure you want to delete your Account?',
  setDeleteModal,
  deleteFunction,
}) => (
  <DeletePanel onClick={setDeleteModal}>
    <DeleteContainer>
      <Typography variant="h4">{text}</Typography>
      <section>
        <CancelButton onClick={setDeleteModal}>Cancel</CancelButton>
        <ConfirmButton onClick={deleteFunction}>Delete</ConfirmButton>
      </section>
    </DeleteContainer>
  </DeletePanel>
)

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
const DeleteContainer = styled.div`
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

const MealContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--grey-80);
  /* background-color: hsla(0, 0%, 100%, 20%); */
  border-radius: 8px;
  @media (min-width: 768px) {
    border-radius: 12px;
  }
`
const DeleteButton = styled(Button)`
  /* padding: 0.75rem; */
  @media (min-width: 768px) {
    /* padding: 1rem; */
  }
`
