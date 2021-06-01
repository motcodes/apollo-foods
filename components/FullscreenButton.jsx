/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import styled from 'styled-components'
import { Button } from '../utils'

export const FullscreenButton = ({ toggleFullscreen }) => {
  return <Btn onClick={toggleFullscreen}></Btn>
}

const Btn = styled(Button)``
