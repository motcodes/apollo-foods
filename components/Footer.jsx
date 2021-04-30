import styled from 'styled-components'
import { Typography, Link } from '../utils'

export default function Footer() {
  return (
    <Container>
      <Typography variant="h5">Apollo Foods</Typography>
      <ListContainer>
        <List>
          <li>
            <Link href="/generate">
              <a>Generate</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/showcase">
              <a>Showcase</a>
            </Link>
          </li>
        </List>
        <List>
          <li>
            <Link href="https://github.com/motcodes/apollo-foods">
              <a>Github</a>
            </Link>
          </li>
          <li>
            <Link href="https://www.themealdb.com/">
              <a>Meal DB</a>
            </Link>
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
  max-width: 1056px;
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
    color: ${({ theme }) => theme.blue90};
    margin-bottom: 0.5rem;
  }
`
