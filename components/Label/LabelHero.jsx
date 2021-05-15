import styled from 'styled-components'
import { Logo } from '../../utils'

const LabelHero = () => (
  <HeroContainer>
    <Logo variant="black" />
    <h1>Apollo Foods</h1>
  </HeroContainer>
)

export default LabelHero

const HeroContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  svg {
    width: 196px;
    height: 196px;
  }
  h1 {
    margin: 0;
    font-size: 64px;
  }
`
