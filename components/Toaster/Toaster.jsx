import toast from 'react-hot-toast'
import styled from 'styled-components'
import { Typography, Button } from '../../utils'

export const cookieToaster = toast.custom((t) => (
  <ToastContainer
    className={`${t.visible ? 'animate-enter' : 'animate-leave'}`}
  >
    <Typography>
      This site uses cookies for authentications.
      <br />
      By clicking ok you approve the use of cookies
    </Typography>
    <Button onClick={() => toast.dismiss(t.id)}>OK</Button>
  </ToastContainer>
))

const ToastContainer = styled.div``
