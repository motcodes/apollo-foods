import styled from 'styled-components'
import { useSession } from 'next-auth/client'
import useMedia from 'use-media'
import Layout from '../../../components/Layout'
import { ProfileImage } from '../../../components/ProfileImage'
import { GenerateCard } from '../../../components/GenerateCard'
import { MealCard } from '../../../components/MealCard'
import { Typography, LinkExt, Link, CardGrid } from '../../../utils'
import {
  TwitterIcon,
  InstagramIcon,
  DribbbleIcon,
  GithubIcon,
  GlobeIcon,
  RedditIcon,
  SettingIcon,
} from '../../../components/Icons'

import prisma from '../../../prisma/prisma'

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
  const isLarge = useMedia({ minWidth: 768 })
  const [session] = useSession()

  const { user, meals } = props

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
        {session && session.user.username === user.username && (
          <Settings href={`/u/${user.username}/settings`}>
            <SettingIcon />
          </Settings>
        )}
        <ProfileImage src={user.image} alt={user.name} />
        <Name as="h1">{user.name}</Name>

        <Bio font="Blatant">{user.bio}</Bio>

        {checkLinks && (
          <LinkContainer>
            {user.twitter && (
              <li>
                <LinkExt href={`https://twitter.com/${user.twitter}`}>
                  <TwitterIcon size={isLarge ? 24 : 18} />@{user.twitter}
                </LinkExt>
              </li>
            )}
            {user.instagram && (
              <li>
                <LinkExt href={`https://instagram.com/${user.instagram}`}>
                  <InstagramIcon size={isLarge ? 24 : 18} />@{user.instagram}
                </LinkExt>
              </li>
            )}
            {user.reddit && (
              <li>
                <LinkExt href={`https://reddit.com/u/${user.reddit}`}>
                  <RedditIcon size={isLarge ? 24 : 18} />
                  u/{user.reddit}
                </LinkExt>
              </li>
            )}
            {user.dribbble && (
              <li>
                <LinkExt href={`https://dribbble.com/${user.dribbble}`}>
                  <DribbbleIcon size={isLarge ? 24 : 18} />@{user.dribbble}
                </LinkExt>
              </li>
            )}
            {user.github && (
              <li>
                <LinkExt href={`https://github.com/${user.github}`}>
                  <GithubIcon size={isLarge ? 24 : 18} />@{user.github}
                </LinkExt>
              </li>
            )}
            {user.website && (
              <li>
                <LinkExt href={`${user.website}`}>
                  <GlobeIcon size={isLarge ? 24 : 18} />
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
          <CardGrid>
            {meals &&
              meals.map((meal, index) => (
                <MealCard
                  key={meal.id * index}
                  id={meal.id}
                  name={meal.name}
                  placeholderImage={meal.placeholderImage}
                  user={meal.user}
                />
              ))}
          </CardGrid>
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
  margin-bottom: 4rem;
  position: relative;
`
const Name = styled(Typography)`
  font-size: var(--h3);
`
const Bio = styled(Typography)`
  font-size: var(--body-large);
`

const Settings = styled(Link)`
  position: absolute;
  right: 1rem;
  top: 1rem;
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
      font-size: var(--body);
    }
  }
  @media (min-width: 1024px) {
    li {
      a {
        font-size: 1.25rem;
      }
    }
  }
`
