import styled from 'styled-components'
import LabelHero from './LabelHero'
import FormatedList from './FormatedList'
import FormatedText from './FormatedText'
import LabelLoader from './LabelLoader'

export const Label = (props) => {
  const {
    mealId = 52837,
    mealName = 'Ilchard Puttanesca',
    mealCategory = 'Pasta',
    mealArea = 'Italy',
    mealInstructions = 'cook :]',
    mealIngredients = ['Spaghettig', 'Olive Oil'],
    mealMeasure = ['300g', '1 tbls'],
  } = props.meal

  return (
    <>
      <Container ref={props.labelRef} style={props.style}>
        <Front>
          <LabelHero />
          <Description>
            <FoodName>{mealName}</FoodName>
            <DescriptionContainer>
              <HeadingGrid>
                <h2>#{mealId}</h2>
                <h3>
                  <span>Category: </span>
                  <span>{mealCategory}</span>
                </h3>
                <h3>
                  <span>Area: </span>
                  <span>{mealArea}</span>
                </h3>
              </HeadingGrid>
              <h3>Ingredients:</h3>
              <FormatedList
                ingredients={mealIngredients}
                measure={mealMeasure}
              />
            </DescriptionContainer>
          </Description>
        </Front>
        <Back>
          <LabelHero />
          <Description>
            <DescriptionContainer>
              <h2>#{mealId}</h2>
              <FormatedText text={mealInstructions} />
            </DescriptionContainer>
          </Description>
        </Back>
      </Container>
      <LabelLoader />
    </>
  )
}

const Container = styled.div`
  * {
    color: black;
  }
  position: fixed;
  /* position: relative; //for debugging */
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
  display: flex;
  flex-direction: column;
`

const Back = styled(Front)``

const HeadingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 1rem;
  h2 {
    grid-column: 2;
    grid-row: 1 / 3;
    place-self: center;
    font-size: 64px;
    background: linear-gradient(
      91.47deg,
      #f93406 0%,
      #594ab6 51.56%,
      #00c6ff 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  h3 {
    grid-column: 1;
    font-size: 32px;
  }
`

const Description = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`

const DescriptionContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-width: 620px;
  width: 90%;
  max-height: 530px;
  background: white;
  border: 9px solid var(--orange-50);
  box-sizing: border-box;
  padding: 16px 8px;
  overflow: hidden;
  h3,
  h2,
  p {
    margin: 0;
  }
  h2 {
    font-size: 48px;
  }
  h3 {
    font-size: 32px;
  }
`

const FoodName = styled.h2`
  font-size: 48px;
  width: fit-content;
  padding: 16px 32px;
  margin: 0 0 24px;
  background: linear-gradient(
    91.47deg,
    #f93406 0%,
    #594ab6 51.56%,
    #00c6ff 100%
  );
  border-radius: 96px;
  color: white;
`
