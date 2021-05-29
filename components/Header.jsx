import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import useMedia from 'use-media'
import { signIn, signOut, useSession } from 'next-auth/client'
import { Typography, Logo, Button, Link as LinkInt } from '../utils'
import { AccountIcon, BeakonIcon, SparklesIcon } from './Icons'
import { useRouter } from 'next/router'

const Header = () => {
  const isLarge = useMedia({ minWidth: 768 })
  const [session] = useSession()
  const [isHover, toggleHover] = useState(false)

  return (
    <>
      <Container>
        <Link href="/">
          <LogoWrapper>
            <NavLogo />
            <Typography variant="h6">Apollo Foods</Typography>
          </LogoWrapper>
        </Link>
        {isLarge && (
          <>
            <LinkList>
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
                    <UserImageWrapper onClick={() => toggleHover(!isHover)}>
                      <Image
                        src={session.user.image}
                        alt={session.user.username}
                        width="48"
                        height="48"
                      />
                    </UserImageWrapper>
                    {isHover && session && (
                      <AccountModal
                        onMouseLeave={() => toggleHover(false)}
                        session={session}
                      />
                    )}
                  </>
                )}
              </li>
            </LinkList>
          </>
        )}
      </Container>
      {!isLarge && (
        <MobileNavigation>
          <NavItem href="/expedition">
            <SparklesIcon />
            <span>Expedition</span>
          </NavItem>
          <NavItem href="/generate">
            <BeakonIcon />
            <span>Gengerate</span>
          </NavItem>
          {session ? (
            <NavItem href={`/u/${session.user.username}`}>
              <AccountIcon />
              <span>Account</span>
            </NavItem>
          ) : (
            <NavItem href={`/api/auth/signin`}>
              <AccountIcon />
              <span>Account</span>
            </NavItem>
          )}
        </MobileNavigation>
      )}
    </>
  )
}

const NavItem = ({ href, children }) => {
  const router = useRouter()

  return (
    <NavLink
      href={href}
      color={router.pathname === href ? 'var(--orange-30)' : 'white'}
    >
      {children}
    </NavLink>
  )
}

const AccountModal = ({ session, onMouseEnter, onMouseLeave }) => {
  return (
    <Modal onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {session && (
        <nav>
          <Link href={`/u/${session.user.username}`}>
            <a>View profile</a>
          </Link>
          <Link href={`/u/${session.user.username}/settings`}>
            <a>Account settings</a>
          </Link>
          <Button scale={0.9} onClick={signOut}>
            Sign Out
          </Button>
        </nav>
      )}
    </Modal>
  )
}

export default Header

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1280px;
  margin: 0 auto;
  height: 3rem;
  padding: 0.5rem 1rem;

  .navIcon {
    width: 3rem;
    height: 3rem;
  }

  @media (min-width: 768px) {
    justify-content: space-between;
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
const LogoWrapper = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  text-decoration: none;
  cursor: pointer;
  &:visited {
    color: white;
  }
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

const UserImageWrapper = styled.figure`
  cursor: pointer;
  div {
    border: 2px solid white;
    border-radius: 50%;
  }
`

const Modal = styled.div`
  position: absolute;
  top: 5rem;
  right: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 12px;
  z-index: 10;
  nav {
    a,
    a:visited {
      color: black;
    }
    display: flex;
    flex-direction: column;
    gap: 1rem;
    button {
      transform-origin: left;
    }
  }
`

const MobileNavigation = styled.nav`
  position: fixed;
  bottom: -1px;
  width: 100%;
  /* height: 48px; */
  padding: 0.5rem 0 1.5rem;
  background: rgba(249, 249, 249, 0.7);
  border-top: 1px solid var(--grey-80);
  box-shadow: 0px -0.5px 0px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  z-index: 10;
`
const NavLink = styled(LinkInt)`
  flex-direction: column;
  width: 40px;
  color: ${({ color }) => color};
  &:visited {
    color: ${({ color }) => color};
  }
  span {
    font-size: 0.8rem;
  }
`
