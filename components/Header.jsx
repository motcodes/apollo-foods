import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import useMedia from 'use-media'
import { signIn, signOut, useSession } from 'next-auth/client'
import { Typography, Logo, Button } from '../utils'

const Header = () => {
  const isLarge = useMedia({ minWidth: 768 })
  const [session] = useSession()

  return (
    <Container>
      <LogoWrapper>
        <NavLogo />
        <Typography variant="h6">Apollo Foods</Typography>
      </LogoWrapper>
      {isLarge ? (
        <LinkList>
          <li>
            <Link href="/">
              <a>Homepage</a>
            </Link>
          </li>
          <li>
            <Link href="/generate">
              <a>Generate</a>
            </Link>
          </li>
          <li>
            <Link href="/expedition">
              <a>Expedition</a>
            </Link>
          </li>
          <li>
            {!session && <Button onClick={signIn}>Sign In</Button>}
            {session && (
              <>
                <Link href={`/u/${session.user.username}`}>
                  <UserImageWrapper>
                    <Image
                      src={session.user.image}
                      alt={session.user.username}
                      width="48"
                      height="48"
                    />
                  </UserImageWrapper>
                </Link>
              </>
            )}
          </li>
        </LinkList>
      ) : (
        <svg
          className="navIcon"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 20H36M21 29H36" stroke="white" strokeWidth="2" />
        </svg>
      )}
    </Container>
  )
}

export default Header

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
  height: 3rem;
  padding: 0.5rem 1rem;

  .navIcon {
    width: 3rem;
    height: 3rem;
  }

  @media (min-width: 768px) {
    padding: 0.5rem 1rem;
    height: 6rem;
    h6 {
      font-size: 36px;
    }
    .navIcon {
      width: 4rem;
      height: 4rem;
    }
  }
`
const LogoWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`

const NavLogo = styled(Logo)`
  margin-right: 0.25rem;
  @media (min-width: 768px) {
    height: 6rem;
    width: auto;
    margin-right: 0.5rem;
  }
`

const LinkList = styled.ul`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  gap: 1rem;
  list-style: none;

  a,
  a:visited {
    color: white;
  }
`

const UserImageWrapper = styled.a`
  cursor: pointer;
  div {
    border: 2px solid white;
    border-radius: 50%;
  }
`
