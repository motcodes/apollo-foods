import styled from 'styled-components'
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
              src={placeholderImage}
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
                <UserImage
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
  background-color: var(--orange-10);
  border: 2px solid var(--orange-90);
  border-radius: 12px;
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 100px 108px rgba(75, 75, 75, 0.2),
    0px 41.7776px 45.1198px rgba(75, 75, 75, 0.143771),
    0px 22.3363px 24.1232px rgba(75, 75, 75, 0.119221),
    0px 12.5216px 13.5233px rgba(75, 75, 75, 0.1),
    0px 6.6501px 7.18211px rgba(75, 75, 75, 0.0807786),
    0px 2.76726px 2.98864px rgba(75, 75, 75, 0.0562291);

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
const UserImage = styled(Image)``
