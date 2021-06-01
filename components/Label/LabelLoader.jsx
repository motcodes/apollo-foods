/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import styled from 'styled-components'
import { Logo } from '../../utils'

const LabelLoader = () => (
  <Loader>
    <Logo size={160} />
    <h1>Rendering in the background</h1>
  </Loader>
)

export default LabelLoader

const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  background-color: var(--blue-10);
  display: grid;
  place-content: center;
  place-items: center;
  gap: 1rem;
  text-align: center;
  z-index: 10;
`
