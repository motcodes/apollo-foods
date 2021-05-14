import styled from 'styled-components'
import { useHtmlToImage } from '../../lib'
import { Logo } from '../../utils'

export const Label = (props) => {
  const {
    foodName = 'Ilchard Puttanesca',
    id = 52837,
    category = 'Pasta',
    area = 'Italy',
    description = 'cook :]',
    ingridients = ['Spaghettig', 'Olive Oil'],
    measure = ['300g', '1 tbls'],
  } = props

  const [generateImage, appRef, imageUrl, isLoading] = useHtmlToImage(2048)

  // if (!isLoading) {
  //   return (
  //     <Redirect
  //       push
  //       to={{
  //         pathname: '/boxlarge',
  //         state: { imageUrl: imageUrl },
  //       }}
  //     />
  //   )
  // } else {
  return (
    <>
      <Container ref={appRef}>
        <Front>
          <Hero />
          <Description>
            <FoodName>{foodName}</FoodName>
            <DescriptionContainer>
              <h2>#{id}</h2>
              <h3>
                <span>Category: </span>
                <span>{category}</span>
              </h3>
              <h3>
                <span>Area: </span>
                <span>{area}</span>
              </h3>
              <p>{description}</p>
            </DescriptionContainer>
          </Description>
        </Front>
        <Back>
          <Hero />
          <Description>
            <FoodName>{foodName}</FoodName>
            <IngridientsContainer>
              <h2>#{id}</h2>
              <h3>Ingredients</h3>
              <List>
                <Ingridients>
                  {ingridients.map((item, index) => (
                    <li key={item + index}>{item}</li>
                  ))}
                </Ingridients>
                <Measure>
                  {measure.map((item, index) => (
                    <li key={item + index}>{item}</li>
                  ))}
                </Measure>
              </List>
            </IngridientsContainer>
          </Description>
        </Back>
      </Container>
      {/* <FullScreenLoader generateImage={generateImage} /> */}
    </>
  )
  // }
}

const Hero = () => (
  <HeroContainer>
    <Logo variant="black" />
    <h1>Apollo Foods</h1>
  </HeroContainer>
)

const FullScreenLoader = ({ generateImage }) => (
  <Loader>
    <h1>Rendering in the background</h1>
    <button onClick={(e) => generateImage(e)}>Capture</button>
  </Loader>
)

const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--blue-50);
  display: grid;
  place-items: center;
  z-index: 10;
`

const HeroContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  svg {
    width: 196px;
    height: 196px;
  }
  h1 {
    margin: 0;
    font-size: 64px;
  }
`

const Container = styled.div`
  * {
    color: black;
  }
  position: fixed;
  /* position: relative; */ //for debugging
  top: 0;
  left: 0;
  width: 2048px;
  height: 2048px;
  background-color: var(--orange-50);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 120px;
  padding: 820px 48px 0;
`

const Front = styled.div`
  grid-column: span 1;
  height: 910px;
  background-color: white;
  border-radius: 25px;
  padding: 0 24px 36px;
`

const Back = styled(Front)``

const Description = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const DescriptionContainer = styled.div`
  min-width: 620px;
  width: 90%;
  background: white;
  border: 9px solid var(--orange-50);
  box-sizing: border-box;
  padding: 16px 8px;
  h3,
  h2,
  p {
    margin: 0;
  }
  h2 {
    margin-bottom: 8px;
    font-size: 48px;
  }
  h3 {
    font-size: 32px;
  }
  p {
    margin-top: 24px;
    font-size: 24px;
    font-size: clamp(1.5rem, 8vw - 2rem, 3rem);
  }
`

const FoodName = styled.h2`
  font-size: 48px;
  width: fit-content;
  padding: 16px 32px;
  margin: 0 0 32px;
  background: linear-gradient(
    91.47deg,
    #f93406 0%,
    #594ab6 51.56%,
    #00c6ff 100%
  );
  border-radius: 96px;
  color: white;
`

const IngridientsContainer = styled(DescriptionContainer)``
const List = styled.div`
  display: flex;
  li {
    font-size: clamp(1.5rem, 8vw - 2rem, 3rem);
  }
`

const Ingridients = styled.ul`
  display: flex;
  flex-direction: column;
  margin-left: 32px;
  margin-top: 24px;
`
const Measure = styled(Ingridients)`
  list-style: none;
`
