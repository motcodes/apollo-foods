/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { useState } from 'react'
import styled from 'styled-components'
import { signIn, useSession } from 'next-auth/client'
import { fetcher, useFullscreen } from '../../lib'
import { BookmarkIcon, FullscreenIcon } from '../Icons'
import { StageControlsButton } from './StageControlsButton'
import { Dots } from '../../utils'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

export function StageControls({
  elementId,
  mealProps = {},
  isMealSaved,
  bookmark = false,
  enableFullscreen = true,
}) {
  const [session] = useSession()
  const { isFullscreenEnabled, toggleFullscreen } = useFullscreen(elementId)
  const [isSaved, setIsSaved] = useState(isMealSaved)
  const [isLoading, toggleLoading] = useState(false)
  const { query } = useRouter()

  async function handleSaveMeal() {
    toggleLoading(true)
    if (session) {
      if (isSaved) {
        const json = await fetcher('/api/meal/delete', {
          method: 'POST',
          body: JSON.stringify(query.id),
        })
        if (json.success === true) {
          toast.success('Successfully removed from Account!')
          setIsSaved(false)
          toggleLoading(false)
          console.log('removed')
        } else {
          toast.success('Could not removed from Account!')
          toggleLoading(false)
          console.log('error')
        }
      } else {
        const json = await fetcher('/api/meal/save', {
          method: 'POST',
          body: JSON.stringify(mealProps),
        })
        if (json.success === true) {
          toast.success('Successfully saved to Account!')
          setIsSaved(true)
          toggleLoading(false)
          console.log('saved')
        } else {
          toast.success('Could not save to Account!')
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
  right: 0;
  bottom: 1rem;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  gap: 1rem;
`
