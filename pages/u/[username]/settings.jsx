import { useSession } from 'next-auth/client'
import styled from 'styled-components'
import Layout from '../../../components/Layout'
import { useUserState } from '../../../lib'
import { Button, Typography, Input, Textarea } from '../../../utils'
import { ProfileImage } from '../../../components/ProfileImage'

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
  const [userState, dispatchUser] = useUserState()

  function updateUser() {}
  return (
    <Layout>
      {session && user && (
        <UserContainer onSubmit={updateUser} aria-label="form">
          <ProfileImage src={user.image} alt={user.name} />
          <Typography variant="h1">Your Info</Typography>
          <Input
            id="fullname"
            label="Name*"
            name="name"
            value={user.name}
            onChange={(e) =>
              dispatchUser({ type: 'name', value: e.target.value })
            }
          />
          <Input
            id="username"
            label="Username*"
            name="username"
            value={user.username}
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
            value={user.email}
            disabled
          />
          <Textarea
            id="bio"
            label="Bio"
            name="bio"
            value={user.bio}
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
            value={user.website}
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
            value={user.twitter}
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
            value={user.instagram}
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
            value={user.reddit}
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
            value={user.dribbble}
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
            value={user.github}
            onChange={(e) =>
              dispatchUser({ type: 'github', value: e.target.value })
            }
          />

          <SaveButton type="submit" fullWidth>
            Save my data
          </SaveButton>

          <DangerContainer>
            <Typography variant="h4">This is the danger zone!</Typography>
            <DangerWrapper>
              <Typography font="Blatant">
                You can delete your Account here.
              </Typography>
              <Button scale={0.8}>Delete my Account</Button>
            </DangerWrapper>
          </DangerContainer>
        </UserContainer>
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
