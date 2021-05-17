import styled from 'styled-components'
import { useFullscreen } from '../../lib'
import { FullscreenButton } from '../FullscreenButton'

export function StageControls({ elementId }) {
  const { isFullscreenEnabled, toggleFullscreen } = useFullscreen(elementId)
  return (
    <ControlContainer>
      {isFullscreenEnabled && (
        <FullscreenButton toggleFullscreen={toggleFullscreen} />
      )}
    </ControlContainer>
  )
}

const ControlContainer = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`
