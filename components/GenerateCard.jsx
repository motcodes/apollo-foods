import router from 'next/router'
import styled from 'styled-components'
import { Typography, Button } from '../utils'

export const GenerateCard = () => {
  return (
    <Container>
      <Typography variant="h4">Generate your first recipe</Typography>
      <Typography font="Blatant">
        and save it to your personal account
      </Typography>
      <TestItButton onClick={() => router.push('/generate')}>
        Test it out now!
      </TestItButton>
    </Container>
  )
}

const Container = styled.section`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  background-color: var(--orange-50);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 65px 86px rgba(249, 52, 6, 0.14),
    0px 27.1554px 35.9287px rgba(249, 52, 6, 0.10064),
    0px 14.5186px 19.2092px rgba(249, 52, 6, 0.083455),
    0px 8.13901px 10.7685px rgba(249, 52, 6, 0.07),
    0px 4.32257px 5.71909px rgba(249, 52, 6, 0.056545),
    0px 1.79872px 2.37984px rgba(249, 52, 6, 0.0393604);
`
const TestItButton = styled(Button)`
  margin-top: 12px;
  background-color: var(--purple-90);
  color: var(--purple-20);
  border: none;
  padding-inline: 3rem;
`
