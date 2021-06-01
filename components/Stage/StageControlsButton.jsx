/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../utils'

export const StageControlsButton = ({
  text,
  children,
  enableHover = false,
  ...rest
}) => {
  const [hoverBookmark, setHoverBookmark] = useState(false)

  return (
    <IconButton
      {...rest}
      onMouseEnter={() => setHoverBookmark(true)}
      onMouseLeave={() => setHoverBookmark(false)}
    >
      {enableHover && hoverBookmark ? (
        <>
          <span style={{ marginRight: 8 }}>{text}</span>
          {children}
        </>
      ) : (
        children
      )}
    </IconButton>
  )
}

const IconButton = styled(Button)``
