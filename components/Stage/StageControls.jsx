import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { signIn, useSession } from 'next-auth/client'
import { fetcher, useFullscreen } from '../../lib'
import { BookmarkIcon, FullscreenIcon } from '../Icons'
import { StageControlsButton } from './StageControlsButton'

export function StageControls({ elementId, mealData = {}, bookmark = false }) {
  const [session] = useSession()
  const { isFullscreenEnabled, toggleFullscreen } = useFullscreen(elementId)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    async function check() {
      const json = await fetcher('/api/meal/check', {
        method: 'POST',
        body: JSON.stringify(mealData.id),
      })
      if (json) {
        setIsSaved(true)
      }
    }
    if (mealData.id) {
      check()
    }
  }, [isSaved])

  async function handleSaveMeal() {
    if (session) {
      if (isSaved) {
        const json = await fetcher('/api/meal/delete', {
          method: 'POST',
          body: JSON.stringify(mealData.id),
        })
        if (json.message === 'success') {
          setIsSaved(false)
          console.log('removed')
        } else {
          console.log('error')
        }
      } else {
        const json = await fetcher('/api/meal/save', {
          method: 'POST',
          body: JSON.stringify(mealData),
        })
        if (json.message === 'success') {
          setIsSaved(true)
          console.log('saved')
        } else {
          console.log('error')
        }
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
