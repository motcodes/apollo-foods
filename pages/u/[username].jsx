import { PrismaClient } from '@prisma/client'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { ProfileImage } from '../../components/ProfileImage'
import { GenerateCard } from '../../components/GenerateCard'
import { Typography, LinkExt } from '../../utils'
import {
  TwitterIcon,
  InstagramIcon,
  DribbbleIcon,
  GithubIcon,
  GlobeIcon,
  RedditIcon,
} from '../../components/Icons'
import { useSession } from 'next-auth/client'

const prisma = new PrismaClient()

export async function getServerSideProps({ params }) {
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
  })
  const meals = await prisma.meal.findMany({
    where: {
      userId: user.id,
    },
  })
  // parses date fields correctly
  const userData = JSON.parse(JSON.stringify(user))
  const mealData = JSON.parse(JSON.stringify(meals))
  return {
    props: { user: userData, meals: mealData },
  }
}

export default function User(props) {
  const [session] = useSession()
  console.log('props :', props)
  const { user, meals } = props
  console.log(meals.length)

  const checkLinks =
    user.twitter ||
    user.instagram ||
    user.reddit ||
    user.dribble ||
    user.github ||
    user.website

  return (
    <Layout>
      <ProfileContainer>
        <ProfileImage src={user.image} alt={user.name} />
        <Name as="h1">{user.name}</Name>

        <Typography font="Blatant">{user.bio}</Typography>

        {checkLinks && (
          <LinkContainer>
            {user.twitter && (
              <li>
                <LinkExt href={`https://twitter.com/${user.twitter}`}>
                  <TwitterIcon />@{user.twitter}
                </LinkExt>
              </li>
            )}
            {user.instagram && (
              <li>
                <LinkExt href={`https://instagram.com/${user.instagram}`}>
                  <InstagramIcon />@{user.instagram}
                </LinkExt>
              </li>
            )}
            {user.reddit && (
              <li>
                <LinkExt href={`https://reddit.com/u/${user.reddit}`}>
                  <RedditIcon />
                  u/{user.reddit}
                </LinkExt>
              </li>
            )}
            {user.dribbble && (
              <li>
                <LinkExt href={`https://dribbble.com/${user.dribbble}`}>
                  <DribbbleIcon />@{user.dribbble}
                </LinkExt>
              </li>
            )}
            {user.github && (
              <li>
                <LinkExt href={`https://github.com/${user.github}`}>
                  <DribbbleIcon />@{user.github}
                </LinkExt>
              </li>
            )}
            {user.website && (
              <li>
                <LinkExt href={`${user.website}`}>
                  <GlobeIcon />
                  {user.website.replace('https://', '').replace('http://', '')}
                </LinkExt>
              </li>
            )}
          </LinkContainer>
        )}
        <Typography variant="h3" as="h2">
          Creations
        </Typography>
        {meals.length !== 0 && (
          <MealContainer>
            {meals.map((meal, index) => (
              <MealCard>
                <Typography variant="h4" as="h3">
                  {meal.name}
                </Typography>
              </MealCard>
            ))}
          </MealContainer>
        )}
        {meals.length === 0 && session && <GenerateCard />}
      </ProfileContainer>
    </Layout>
  )
}

const ProfileContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`
const Name = styled(Typography)`
  font-size: var(--h4);
`

const LinkContainer = styled.ul`
  list-style: none;
  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.25rem 0;
    svg {
      margin-right: 12px;
    }
    a {
      font-size: 0.9rem;
    }
  }
`
const MealContainer = styled.section``
const MealCard = styled.article``
