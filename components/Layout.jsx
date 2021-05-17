import React from 'react'
import styled from 'styled-components'

const Layout = (props) => (
  <Main marginTop={props.marginTop}>{props.children}</Main>
)

export default Layout

const Main = styled.main`
  --margin-top: 1rem;
  --header-height: 3rem;
  @media (min-width: 768px) {
    --margin-top: 1.5rem;
    --header-height: 7rem;
  }

  margin-top: var(--margin-top);
  padding: 0 1rem;
  min-height: calc(100vh - var(--header-height));
`
