import styled from 'styled-components'

export const CardGrid = styled.section`
  margin: 0rem 0 4rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    margin: 2rem 0 4rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`
