/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { useReducer } from 'react'

const initialState = {
  name: '',
  username: '',
  bio: '',
  website: '',
  twitter: '',
  instagram: '',
  github: '',
  dribbble: '',
}

const links = {
  twitter: 'https://twitter.com/',
  instagram: 'https://instagram.com/',
  github: 'https://github.com/',
  dribbble: 'https://dribbble.com/',
  reddit: 'https://reddit.com/u/',
}

function reducer(state, action) {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.value }
    case 'username':
      return { ...state, username: action.value }
    case 'bio':
      return { ...state, bio: action.value }
    case 'website':
      return { ...state, website: action.value }
    case 'twitter':
      return { ...state, twitter: action.value }
    case 'instagram':
      return { ...state, instagram: action.value }
    case 'github':
      return { ...state, github: action.value }
    case 'dribbble':
      return { ...state, dribbble: action.value }
    case 'reddit':
      return { ...state, reddit: action.value }
    default:
      break
  }
}

export function useUserState(initialData) {
  const [state, dispatch] = useReducer(reducer, initialData || initialState)
  return [state, dispatch]
}
