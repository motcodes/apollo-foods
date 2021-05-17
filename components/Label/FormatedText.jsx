import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { resizeText } from '../../lib'

const FormatedText = ({ text }) => {
  const elementRef = useRef()
  useEffect(() => {
    if (elementRef.current) {
      resizeText({
        element: elementRef.current,
      })
    }
  }, [])
  return (
    <FormatedTextContainer>
      <FormatedTypo ref={elementRef}>{text}</FormatedTypo>
    </FormatedTextContainer>
  )
}

export default FormatedText

const FormatedTextContainer = styled.div`
  height: 100%;
  height: 400px;
  flex: 1;
`

const FormatedTypo = styled.p`
  white-space: pre-wrap;
  font-size: clamp(0.8rem, 6vw - 2rem, 3rem);
`
