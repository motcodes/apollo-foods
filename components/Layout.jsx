import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'

const Layout = (props) => (
  <>
    <Header />
    <Main>{props.children}</Main>
    <Footer />
  </>
)

export default Layout

const Main = styled.main`
  padding: 0 1rem;
  min-height: 100vh;
`
