import styled from 'styled-components'

const LabelLoader = () => (
  <Loader>
    <h1>Rendering in the background</h1>
    {/* <button onClick={(e) => generateImage(e)}>Capture</button> */}
  </Loader>
)

export default LabelLoader

const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--blue-10);
  display: grid;
  place-items: center;
  z-index: 10;
`
