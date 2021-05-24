import { useState } from 'react'
import styled from 'styled-components'
import { signIn, useSession } from 'next-auth/client'
import { fetcher, useFullscreen } from '../../lib'
import { BookmarkIcon, FullscreenIcon } from '../Icons'
import { StageControlsButton } from './StageControlsButton'

export function StageControls({ elementId, mealData = {}, bookmark = false }) {
  const [session] = useSession()
  const { isFullscreenEnabled, toggleFullscreen } = useFullscreen(elementId)
  const [isSaved, setIsSaved] = useState(false)

  async function handleSaveMeal() {
    if (session) {
      if (isSaved) {
        setIsSaved(false)
        console.log('removed')
      } else {
        const json = await fetcher('/api/meal/save', {
          method: 'POST',
          body: JSON.stringify(mealData),
        })

        console.log(json)

        setIsSaved(true)
        console.log('saved')
      }
    } else {
      signIn()
    }
  }

  return (
    <ControlContainer>
      {isFullscreenEnabled && (
        <StageControlsButton
          text="Enter Fullscreen"
          onClick={toggleFullscreen}
          enableHover
        >
          <FullscreenIcon />
        </StageControlsButton>
      )}
      {bookmark && (
        <StageControlsButton
          text={isSaved ? 'Remove from Account' : 'Save to Account'}
          onClick={handleSaveMeal}
          enableHover
        >
          <BookmarkIcon size={24} fill={isSaved ? 'white' : 'none'} />
        </StageControlsButton>
      )}
    </ControlContainer>
  )
}

const ControlContainer = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  gap: 1rem;
`
