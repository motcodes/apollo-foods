import React from 'react'
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()
  const isActive = (pathname) => router.pathname === pathname

  return <nav>{/* <h1>Apollo Foods</h1> */}</nav>
}

export default Header
