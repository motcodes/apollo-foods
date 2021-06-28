/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import styled from 'styled-components'
import { Typography, Link, LinkExt } from '../utils'

export default function Footer() {
  return (
    <Container>
      <Typography variant="h3">Apollo Foods</Typography>
      <ListContainer>
        <List>
          <li>
            <Link href="/generate">Generate</Link>
          </li>
          <li>
            <Link href="/expedition">Expedition</Link>
          </li>
        </List>
        <List>
          <li>
            <Link href="/credits">Credits</Link>
          </li>
          <li>
            <Link href="/imprint">Imprint</Link>
          </li>
        </List>
        <List>
          <li>
            <Link href="/privacyPolicy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/tos">Terms of Service</Link>
          </li>
        </List>
        <List>
          <li>
            <LinkExt href="https://github.com/motcodes/apollo-foods">
              Github
            </LinkExt>
          </li>
          <li>
            <LinkExt href="https://github.com/motcodes/apollo-foods">
              Portfolio
            </LinkExt>
          </li>
        </List>
      </ListContainer>
    </Container>
  )
}

const Container = styled.footer`
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 1rem 5rem;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ListContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;

  li {
    margin-bottom: 0.5rem;
  }
  a,
  a:visited {
    color: var(--blue-80);
  }
`
