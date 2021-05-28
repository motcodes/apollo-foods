import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { signIn, useSession } from 'next-auth/client'
import { fetcher, useFullscreen } from '../../lib'
import { BookmarkIcon, FullscreenIcon } from '../Icons'
import { StageControlsButton } from './StageControlsButton'
import { Dots } from '../../utils'

export function StageControls({
  elementId,
  mealData = {},
  isMealSaved,
  bookmark = false,
  enableFullscreen = true,
}) {
  const [session] = useSession()
  const { isFullscreenEnabled, toggleFullscreen } = useFullscreen(elementId)
  const [isSaved, setIsSaved] = useState(isMealSaved)
  const [isLoading, toggleLoading] = useState(false)

  async function handleSaveMeal() {
    toggleLoading(true)
    if (session) {
      if (isSaved) {
        const json = await fetcher('/api/meal/delete', {
          method: 'POST',
          body: JSON.stringify(mealData.id),
        })
        if (json.success === true) {
          setIsSaved(false)
          toggleLoading(false)
          console.log('removed')
        } else {
          toggleLoading(false)
          console.log('error')
        }
      } else {
        const json = await fetcher('/api/meal/save', {
          method: 'POST',
          body: JSON.stringify(mealData),
        })
        if (json.success === true) {
          setIsSaved(true)
          toggleLoading(false)
          console.log('saved')
        } else {
          toggleLoading(false)
          console.log('error')
        }
      }
    } else {
      signIn()
    }
  }

  return (
    <ControlContainer>
      {enableFullscreen && isFullscreenEnabled && (
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
          text={
            session
              ? isSaved
                ? 'Remove from Account'
                : 'Save to Account'
              : 'Sign In to Save'
          }
          onClick={handleSaveMeal}
          enableHover
        >
          {isLoading ? (
            <Dots />
          ) : (
            <BookmarkIcon size={24} fill={isSaved ? 'white' : 'none'} />
          )}
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
