/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import useMedia from 'use-media'
import toast from 'react-hot-toast'
import router from 'next/router'
import Layout from '../components/Layout'
import { fetcher, isEmptyOrSpaces, useRecipeState } from '../lib'
import {
  Typography,
  Intro,
  Input,
  UserContainer,
  Button,
  Textarea,
} from '../utils'
import { XIcon, PlusIcon } from '../components/Icons'

export default function Create() {
  const [recipeData, dispatchRecipe] = useRecipeState()
  const [ingredientsList, setIngredientsList] = useState([
    {
      ingredient: '',
      measure: '',
    },
    {
      ingredient: '',
      measure: '',
    },
    {
      ingredient: '',
      measure: '',
    },
  ])

  const [nameError, setNameError] = useState(false)
  const [categoryError, setCategoryError] = useState(false)
  const [areaError, setAreaError] = useState(false)
  const [instructionError, setInstructionError] = useState(false)
  const [buttonText, setButtonText] = useState('save recipe')
  const isLarge = useMedia({ minWidth: 768 })

  function handleIngredientChange(e, index) {
    const { name, value } = e.target
    const list = [...ingredientsList]
    list[index][name] = value
    setIngredientsList(list)
  }

  function addIngredient(e) {
    e.preventDefault()
    setIngredientsList([
      ...ingredientsList,
      {
        ingredient: '',
        measure: '',
      },
    ])
  }
  function removeIngredient(e, index) {
    e.preventDefault()
    const list = [...ingredientsList]
    list.splice(index, 1)
    setIngredientsList(list)
  }

  async function saveMeal(e) {
    e.preventDefault()
    const data = recipeData
    data.ingredients = ingredientsList.map((i) => i.ingredient).filter(Boolean)
    data.measure = ingredientsList.map((i) => i.measure).filter(Boolean)

    if (isEmptyOrSpaces(recipeData.name)) {
      toast.error('Name your creation.')
      setNameError(true)
      setButtonText('Try again')
      return
    }
    setNameError(false)

    if (isEmptyOrSpaces(recipeData.category)) {
      toast.error('Add the meal category.')
      setCategoryError(true)
      setButtonText('Try again')
      return
    }
    setNameError(false)
    if (isEmptyOrSpaces(recipeData.area)) {
      toast.error('Add the origin of the recipe.')
      setAreaError(true)
      setButtonText('Try again')
      return
    }
    setAreaError(false)
    if (isEmptyOrSpaces(recipeData.instruction)) {
      toast.error('Add an instruction to recipe.')
      setInstructionError(true)
      setButtonText('Try again')
      return
    }
    setInstructionError(false)
    setButtonText('Save recipe')

    if (recipeData.ingredients.length === 0) {
      toast.error('Add at least one ingredient.')
      setButtonText('Try again')
    }

    const recipeResponse = await fetcher('/api/meal/saveCustom', {
      method: 'POST',
      body: JSON.stringify(recipeData),
    })
    if (recipeResponse.success === true) {
      toast.success('Successfully created recipe!')
      // console.log('saved')
      router.push({
        pathname: '/cook/[id]',
        query: { id: recipeData.id, custom: true },
      })
    } else {
      toast.error('Could not create Recipe! Try again.')
      setButtonText('Try again')
      // console.log('error')
    }
  }

  useEffect(() => {
    dispatchRecipe({
      type: 'id',
      value: Math.floor(Math.random() * 100000 + 100000),
    })
  }, [dispatchRecipe])

  return (
    <Layout>
      <Intro>
        <Typography variant="h1">
          Add your <wbr />
          personal recipe
        </Typography>
        <Typography>
          Just enter all the neccesary informations and ingedients about your
          recipe {isLarge && <br />}
          and save it to your account or share it to the rest of the world.
        </Typography>
      </Intro>
      <UserContainer onSubmit={saveMeal} aria-label="form">
        <Typography variant="h3" as="h2">
          Information
        </Typography>
        <InputContainer>
          <Input
            id="mealName"
            name="mealName"
            label="Recipe Name"
            value={recipeData.name}
            onChange={(e) =>
              dispatchRecipe({ type: 'name', value: e.target.value })
            }
            placeholder="Enter the name*"
            error={nameError}
            minLength={2}
          />
          <Input
            id="mealCategory"
            name="mealCategory"
            label="Category"
            value={recipeData.category}
            onChange={(e) =>
              dispatchRecipe({ type: 'category', value: e.target.value })
            }
            placeholder="Enter the category*"
            error={categoryError}
            minLength={2}
          />
          <Input
            id="mealArea"
            name="mealArea"
            label="Area"
            value={recipeData.area}
            onChange={(e) =>
              dispatchRecipe({ type: 'area', value: e.target.value })
            }
            placeholder="Enter the origin country*"
            error={areaError}
            minLength={2}
          />
        </InputContainer>
        <Typography variant="h3" as="h2">
          Ingredients
        </Typography>
        <IngredientsContainer as="ul">
          {ingredientsList.map((item, index) => (
            <li key={index}>
              <Input
                id={`mealIngredient${index + 1}`}
                name="ingredient"
                label={`Ingredient ${index + 1}`}
                value={item.ingredient}
                onChange={(e) => handleIngredientChange(e, index)}
                placeholder="Enter a ingredient"
              />
              <Input
                id={`mealMeasure${index + 1}`}
                name="measure"
                label={`Measure ${index + 1}`}
                value={item.measure}
                onChange={(e) => handleIngredientChange(e, index)}
                placeholder="Enter the amount"
              />
              {ingredientsList.length !== 1 && (
                <RemoveButton
                  variant="outlined"
                  onClick={(e) => removeIngredient(e, index)}
                >
                  <XIcon />
                </RemoveButton>
              )}
            </li>
          ))}
          <IngredientButtonContainer>
            <Button onClick={addIngredient} style={{ padding: 10 }}>
              <PlusIcon size={32} />
            </Button>
          </IngredientButtonContainer>
        </IngredientsContainer>
        <Typography variant="h3" as="h2">
          Instructions
        </Typography>
        <InputContainer>
          <Textarea
            id="mealInstructions"
            name="mealInstructions"
            value={recipeData.instruction}
            onChange={(e) =>
              dispatchRecipe({ type: 'instruction', value: e.target.value })
            }
            placeholder="Enter all the steps to cook this meal"
            areaHeight={200}
            error={instructionError}
          />
        </InputContainer>
        <Button fullWidth type="submit">
          {buttonText}
        </Button>
      </UserContainer>
    </Layout>
  )
}

const InputContainer = styled.div`
  margin: 0.5rem 0 4rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const IngredientsContainer = styled(InputContainer)`
  list-style: none;
  li {
    display: flex;
    gap: 1rem;
    align-items: flex-end;
  }
`

const IngredientButtonContainer = styled.li``

const RemoveButton = styled(Button)`
  height: min-content;
  margin-bottom: 1rem;
  padding: 0.75rem;
`
// const SaveButton = styled(Button)`
//   width: 300px;
// `
