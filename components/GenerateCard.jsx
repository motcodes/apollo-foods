/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import router from 'next/router'
import styled, { css } from 'styled-components'
import { Typography, Button } from '../utils'

export const GenerateCard = ({
  heading = 'Generate your first recipe',
  text = 'and save it to your personal account',
  buttonText = 'Test it out now!',
  bgColor = 'var(--orange-50)',
}) => {
  return (
    <Container bgColor={bgColor}>
      <Typography variant="h4">{heading}</Typography>
      <Typography font="Blatant">{text}</Typography>
      <TestItButton bgColor={bgColor} onClick={() => router.push('/generate')}>
        {buttonText}
      </TestItButton>
    </Container>
  )
}

const Container = styled.section`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  background-color: ${({ bgColor }) => bgColor};
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TestItButton = styled(Button)`
  margin-top: 12px;
  background-color: var(--purple-90);
  color: var(--purple-20);
  border: none;
  padding-inline: 3rem;
  &:hover {
    background-color: var(--purple-80);
  }
  ${({ bgColor }) => {
    if (bgColor.includes('purple')) {
      return css`
        background-color: var(--purple-90);
        color: var(--purple-20);
        &:hover {
          background-color: var(--purple-80);
        }
      `
    } else if (bgColor.includes('blue')) {
      return css`
        background-color: var(--blue-90);
        color: var(--blue-20);
        &:hover {
          background-color: var(--blue-80);
        }
      `
    } else {
      return css`
        background-color: var(--orange-90);
        color: var(--orange-20);
        &:hover {
          background-color: var(--orange-80);
        }
      `
    }
  }};
`
