/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { Button } from '../utils'
import { useUser } from '../lib'

export const AccountModal = ({
  session,
  onMouseEnter,
  onMouseLeave,
  signOut,
  top = '5rem',
  right = '1rem',
}) => {
  const user = useUser()
  const router = useRouter()
  return (
    <Modal
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      top={top}
      right={right}
    >
      {session && user && (
        <nav>
          {router.asPath !== `/u/${user.username}` && (
            <Link href={`/u/${user.username}`}>
              <a>View profile</a>
            </Link>
          )}
          <Link href={`/u/${user.username}/settings`}>
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

const Modal = styled.div`
  position: absolute;
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  width: auto;
  padding: 1rem;
  background-color: white;
  border-radius: 12px;
  z-index: 10;
  nav {
    a,
    a:visited {
      color: black;
      width: max-content;
    }
    display: flex;
    flex-direction: column;
    gap: 1rem;
    button {
      transform-origin: left;
    }
  }
`
