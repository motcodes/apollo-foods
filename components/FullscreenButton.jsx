import styled from 'styled-components'
import { Button } from '../utils'

export const FullscreenButton = ({ toggleFullscreen }) => {
  return (
    <ButtonContainer onClick={toggleFullscreen}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        width={24}
        height={24}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
        />
      </svg>
    </ButtonContainer>
  )
}

const ButtonContainer = styled(Button)`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`
