import styled from 'styled-components'
import { Typography, Link, LinkExt } from '../utils'

export default function Footer() {
  return (
    <Container>
      <Typography variant="h5">Apollo Foods</Typography>
      <ListContainer>
        <List>
          <li>
            <Link href="/generate">Generate</Link>
          </li>
          <li>
            <Link href="/showcase">Showcase</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </List>
        <List>
          <li>
            <LinkExt href="https://github.com/motcodes/apollo-foods">
              Github
            </LinkExt>
          </li>
          <li>
            <Link href="/credits">Credits</Link>
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
      </ListContainer>
    </Container>
  )
}

const Container = styled.footer`
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 1rem 2rem;
  max-width: 1312px;
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
