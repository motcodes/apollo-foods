/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { Button } from '../utils'

export const AccountModal = ({
  session,
  onMouseEnter,
  onMouseLeave,
  signOut,
  top = '5rem',
  right = '1rem',
}) => {
  const router = useRouter()
  return (
    <Modal
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      top={top}
      right={right}
    >
      <nav>
        {router.asPath !== `/u/${session.user.username}` && (
          <Link href={`/u/${session.user.username}`}>
            <a>View profile</a>
          </Link>
        )}
        <Link href={`/u/${session.user.username}/settings`}>
          <a>Account settings</a>
        </Link>
        <Button scale={0.9} onClick={signOut}>
          Sign Out
        </Button>
      </nav>
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
  z-index: 100;
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
