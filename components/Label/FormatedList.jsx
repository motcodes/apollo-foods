/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const FormatedList = ({ ingredients, measure }) => {
  const [ingredientsList, setIngredientsList] = useState([ingredients])
  const [measureList, setMeasureList] = useState([measure])

  useEffect(() => {
    if (ingredients.length > 6) {
      const half = Math.ceil(ingredients.length / 2)
      const firstHalf = ingredients.splice(0, half)
      const secondHalf = ingredients.splice(-half)
      setIngredientsList([firstHalf, secondHalf])
    }
  }, [ingredients])

  useEffect(() => {
    if (measure.length > 6) {
      const half = Math.ceil(measure.length / 2)
      const firstHalf = measure.splice(0, half)
      const secondHalf = measure.splice(-half)
      setMeasureList([firstHalf, secondHalf])
    }
  }, [measure])

  return (
    <ListContainer>
      <List
        gridColumnCount={
          ingredientsList.length > 1 && measureList.length > 1 ? 4 : 2
        }
      >
        {ingredientsList[0].map((item, index) => (
          <li
            style={{ gridColumn: 1, gridRow: index + 1, listStyle: 'disc' }}
            key={item + index}
          >
            {item}
          </li>
        ))}
        {measureList[0].map((item, index) => (
          <li style={{ gridColumn: 2, gridRow: index + 1 }} key={item + index}>
            {item}
          </li>
        ))}
        {ingredientsList.length > 1 && measureList.length > 1 && (
          <>
            {ingredientsList[1].map((item, index) => (
              <li
                style={{
                  gridColumn: 3,
                  gridRow: index + 1,
                  marginLeft: 64,
                  listStyle: 'disc',
                }}
                key={item + index}
              >
                {item}
              </li>
            ))}
            {measureList[1].map((item, index) => (
              <li
                style={{ gridColumn: 4, gridRow: index + 1 }}
                key={item + index}
              >
                {item}
              </li>
            ))}
          </>
        )}
      </List>
    </ListContainer>
  )
}

export default FormatedList

const ListContainer = styled.div`
  column-gap: 32px;
  margin-top: 16px;
`
const List = styled.ul`
  height: 100%;
  max-height: 200px;
  width: auto;
  margin-left: 24px;
  flex: 1;
  display: grid;
  grid-template-columns: ${({ gridColumnCount }) =>
    gridColumnCount === 4
      ? 'minmax(150px, 200px) minmax(100px, 250px) minmax(214px, 264px) minmax(100px, 250px)'
      : 'minmax(150px, 200px) auto'};
  list-style: none;
  li {
    border-bottom: 1px solid black;
  }
`
