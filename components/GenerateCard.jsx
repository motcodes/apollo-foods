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
  marginBottom = false,
  createButton = false,
}) => (
  <Container bgColor={bgColor} marginBottom={marginBottom}>
    <Typography variant="h4">{heading}</Typography>
    <Typography font="Blatant">{text}</Typography>
    <ButtonContainer>
      <TestItButton bgColor={bgColor} onClick={() => router.push('/generate')}>
        {buttonText}
      </TestItButton>
      {createButton && (
        <TestItButton
          variant="outlined"
          bgColor={bgColor}
          onClick={() => router.push('/generate')}
        >
          Add your recipe
        </TestItButton>
      )}
    </ButtonContainer>
  </Container>
)

const Container = styled.section`
  width: 100%;
  padding: 1rem;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? '5rem' : 0)};
  border-radius: 12px;
  background-color: ${({ bgColor }) => bgColor};
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`
const TestItButton = styled(Button)`
  /* background-color: var(--purple-90); */
  /* color: var(--purple-20); */
  border: none;
  padding-inline: 3rem;
  &:hover {
    background-color: var(--purple-80);
  }
  ${({ bgColor, variant }) => {
    if (bgColor.includes('purple')) {
      if (variant === 'outlined') {
        return css`
          border: 2px solid var(--purple-90);
          color: var(--purple-90);
          &:hover {
            background: var(--purple-40);
            border-color: var(--purple-80);
          }
        `
      }
      return css`
        background-color: var(--purple-90);
        color: var(--purple-20);
        &:hover {
          background-color: var(--purple-80);
        }
      `
    }
    if (bgColor.includes('blue')) {
      if (variant === 'outlined') {
        return css`
          border: 2px solid var(--blue-90);
          color: var(--blue-90);
          &:hover {
            background: var(--blue-40);
            border-color: var(--blue-80);
          }
        `
      }
      return css`
        background-color: var(--blue-90);
        color: var(--blue-20);
        &:hover {
          background-color: var(--blue-80);
        }
      `
    }
    if (variant === 'outlined') {
      return css`
        border: 2px solid var(--orange-90);
        color: var(--orange-90);
        &:hover {
          background: var(--orange-40);
          border-color: var(--orange-80);
        }
      `
    }
    return css`
      background-color: var(--orange-90);
      color: var(--orange-20);
      &:hover {
        background-color: var(--orange-80);
      }
    `
  }};
`

const ButtonContainer = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`
