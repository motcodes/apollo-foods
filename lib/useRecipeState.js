/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { useReducer } from 'react'

const initialState = {
  id: '',
  name: '',
  area: '',
  category: '',
  instruction: '',
  ingredients: [],
  measure: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'id':
      return { ...state, id: action.value }
    case 'name':
      return { ...state, name: action.value }
    case 'area':
      return { ...state, area: action.value }
    case 'category':
      return { ...state, category: action.value }
    case 'instruction':
      return { ...state, instruction: action.value }
    default:
      break
  }
}

export function useRecipeState(initialData) {
  const [state, dispatch] = useReducer(reducer, initialData || initialState)
  return [state, dispatch]
}
