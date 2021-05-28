import styled, { keyframes } from 'styled-components'
import Image from 'next/image'
import { default as NextLink } from 'next/link'
import { Link, Typography } from '../utils'

export const MealCard = ({ id, placeholderImage, name, user = {} }) => {
  return (
    <NextLink href={`/cook/${id}`}>
      <MealLink>
        <Card>
          <MealImageWrapper>
            <MealImage
              src={placeholderImage || '/PouchPreload.png'}
              alt={name}
              layout="fill"
              objectFit="contain"
              objectPosition="50% 50%"
            />
          </MealImageWrapper>
          <TextContainer>
            <MealTitle variant="h3">
              {name} #{id}
            </MealTitle>
            {user !== {} && user.image && (
              <UserLink href={`/u/${user.username}`}>
                <Image
                  src={user.image}
                  alt={user.username}
                  width="32"
                  height="32"
                />
                @{user.username}
              </UserLink>
            )}
          </TextContainer>
        </Card>
      </MealLink>
    </NextLink>
  )
}

export const MealCardSkeleton = () => {
  return (
    <Card>
      <MealImageWrapper>
        <MealImage
          src="/PouchPreload.png"
          alt="placeholder pouch image"
          layout="fill"
          objectFit="contain"
          objectPosition="50% 50%"
        />
      </MealImageWrapper>
      <TextContainerSkeleton>
        <TitleSkeleton />
        <Flex>
          <ProfileSkeleton />
          <NameSkeleton />
        </Flex>
      </TextContainerSkeleton>
    </Card>
  )
}

const MealLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: var(--orange-90);
  &:visited {
    color: var(--orange-90);
  }
`

const Card = styled.article`
  display: grid;
  grid-template-rows: 3fr 1fr;
  width: 100%;
  height: 100%;
  min-height: 304px;
  max-height: 352px;
  background-color: var(--orange-10);
  border: 2px solid var(--orange-90);
  border-radius: 12px;

  &:hover {
    transform: translateY(-5px);
  }
`

const MealImageWrapper = styled.figure`
  background-color: black;
  position: relative;
  border-radius: 12px 12px 0 0;
`

const MealImage = styled(Image)`
  border-radius: 12px 12px 0 0;
`

const TextContainer = styled.div`
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const MealTitle = styled(Typography)`
  font-size: var(--h4);
`

const UserLink = styled(Link)`
  padding: 0.2rem 0 0;
  gap: 8px;
  div {
    border: 1px solid white;
    border-radius: 50%;
  }
  img {
    border-radius: 50%;
  }
`

const LoadingAnimation = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.6 },
  '100%': { opacity: 1 },
})

const TitleSkeleton = styled.span`
  width: 100%;
  height: 32px;
  border-radius: 6px;
  background-color: var(--orange-30);
  animation: ${LoadingAnimation} 2s ease-in-out infinite;
`
const TextContainerSkeleton = styled(TextContainer)`
  gap: 8px;
`

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`
const ProfileSkeleton = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--orange-30);
  animation: ${LoadingAnimation} 2s 0.2s ease-in-out infinite;
`
const NameSkeleton = styled.span`
  width: 50%;
  height: 24px;
  border-radius: 6px;
  background-color: var(--orange-30);
  animation: ${LoadingAnimation} 2s 0.3s ease-in-out infinite;
`
