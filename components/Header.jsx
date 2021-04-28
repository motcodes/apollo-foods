import React from 'react'
import { useRouter } from 'next/router'
import { Typography, Logo } from '../utils'
import styled from 'styled-components'

const Header = () => {
  const router = useRouter()
  const isActive = (pathname) => router.pathname === pathname

  return (
    <Container>
      <LogoWrapper>
        <NavLogo />
        <Typography variant="h6">Apollo Foods</Typography>
      </LogoWrapper>
      <svg
        className="navIcon"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 20H36M21 29H36" stroke="white" stroke-width="2" />
      </svg>
    </Container>
  )
}

export default Header

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
