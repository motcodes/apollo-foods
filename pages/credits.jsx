/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import styled from 'styled-components'
import Layout from '../components/Layout'
import { creditsData } from '../lib'
import { LinkExt, Typography } from '../utils'

export default function Credits() {
  return (
    <Layout marginTop>
      <Typography variant="h1">Credits</Typography>
      <List>
        {creditsData.map((item) => (
          <li key={item.name}>
            {item.name} -{' '}
            <LinkExt href={item.link}>
              Link
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </LinkExt>
          </li>
        ))}
      </List>
    </Layout>
  )
}

const List = styled.ul`
  list-style: none;
  li {
    padding: 0.25rem;
  }

  a,
  a:visited {
    color: var(--blue-80);
    svg {
      margin-left: 0.25rem;
    }
  }
`
