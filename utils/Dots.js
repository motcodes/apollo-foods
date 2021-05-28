import styled, { keyframes } from 'styled-components'

export const Dots = () => (
  <DotContainer>
    {[1, 2, 3].map((dot) => (
      <Dot key={dot} delay={0.15 * dot} />
    ))}
  </DotContainer>
)

const DotContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 24px;
  height: 24px;
`
const DotAnimation = keyframes({
  '0%': { opacity: 0 },
  '50%': { opacity: 1 },
  '100%': { opacity: 0 },
})
const Dot = styled.span`
  background-color: white;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  animation: ${DotAnimation} 1s ease-in-out infinite;
  animation-delay: ${({ delay }) => `${delay}s`};
`
