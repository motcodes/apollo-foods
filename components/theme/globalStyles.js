/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import { createGlobalStyle } from 'styled-components'
/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

export const GlobalStyle = createGlobalStyle({
  ':root': {
    '--white': 'hsla(0,0%,100%,100%)',
    '--black': 'hsla(0,0%,0%,100%)',

    '--orange-10': 'hsla(11,96%,10%,100%)',
    '--orange-20': 'hsla(12,96%,20%,100%)',
    '--orange-30': 'hsla(11,96%,30%,100%)',
    '--orange-40': 'hsla(11,95%,40%,100%)',
    '--orange-50': 'hsla(11,95%,50%,100%)',
    '--orange-60': 'hsla(11,95%,60%,100%)',
    '--orange-70': 'hsla(11,96%,70%,100%)',
    '--orange-80': 'hsla(12,96%,80%,100%)',
    '--orange-90': 'hsla(11,96%,90%,100%)',

    '--blue-10': 'hsla(194,100%,10%,100%)',
    '--blue-20': 'hsla(194,100%,20%,100%)',
    '--blue-30': 'hsla(194,100%,30%,100%)',
    '--blue-40': 'hsla(193,100%,40%,100%)',
    '--blue-50': 'hsla(193,100%,50%,100%)',
    '--blue-60': 'hsla(193,100%,60%,100%)',
    '--blue-70': 'hsla(193,100%,70%,100%)',
    '--blue-80': 'hsla(193,100%,80%,100%)',
    '--blue-90': 'hsla(193,100%,90%,100%)',

    '--purple-10': 'hsla(248,43%,10%,100%)',
    '--purple-20': 'hsla(248,43%,20%,100%)',
    '--purple-30': 'hsla(248,43%,30%,100%)',
    '--purple-40': 'hsla(248,43%,40%,100%)',
    '--purple-50': 'hsla(248,43%,50%,100%)',
    '--purple-60': 'hsla(248,43%,60%,100%)',
    '--purple-70': 'hsla(248,43%,70%,100%)',
    '--purple-80': 'hsla(248,43%,80%,100%)',
    '--purple-90': 'hsla(248,43%,90%,100%)',

    '--grey-10': 'hsla(145,3%,10%,100%)',
    '--grey-20': 'hsla(145,3%,20%,100%)',
    '--grey-30': 'hsla(145,3%,30%,100%)',
    '--grey-40': 'hsla(145,3%,40%,100%)',
    '--grey-50': 'hsla(145,3%,50%,100%)',
    '--grey-60': 'hsla(145,3%,60%,100%)',
    '--grey-70': 'hsla(145,3%,70%,100%)',
    '--grey-80': 'hsla(145,3%,80%,100%)',
    '--grey-90': 'hsla(145,3%,90%,100%)',

    // mobile
    '--h1': '3.052rem',
    '--h2': '2.441rem',
    '--h3': '1.953rem',
    '--h4': '1.563rem',
    '--h5': '1.25rem',
    '--body-large': '1.25rem',
    '--body': '16px',
    '--body-small': '14.4px',

    // tablet
    '@media (min-width: 768px)': {
      '--h1': '4.209rem',
      '--h2': '3.157rem',
      '--h3': '2.369rem',
      '--h4': '1.777rem',
      '--h5': '1.33rem',
      '--body-large': '1.33rem',
      '--body': '18px',
      '--body-small': '16px',
    },

    // desktop
    '@media (min-width: 1280px)': {
      '--h1': '5.653rem',
      '--h2': '4rem',
      '--h3': '2.827rem',
      '--h4': '2rem',
      '--h5': '1.414rem',
      '--body-large': '1.414rem',
      '--body': '18px',
      '--body-small': '16px',
    },
  },

  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontWeight: 400,
  },
  html: {
    fontFamily:
      "Blatant, -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif",
    lineHeight: 1.15,
    '-webkit-text-size-adjust': '100%',
    height: '100%',
    color: 'white',
  },
  body: {
    fontFamily:
      "Blatant, -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif",
    margin: 0,
    background: 'black',
  },
  '#__next': {
    height: '100%',
  },
  main: {
    display: 'block',
  },
  h1: {
    margin: 0,
  },
  h2: {
    margin: 0,
  },
  h3: {
    margin: 0,
  },
  h4: {
    margin: 0,
  },
  h5: {
    margin: 0,
  },
  h6: {
    margin: 0,
  },

  p: {
    fontSize: 'var(--body)',
    margin: 0,
  },
  a: {
    fontSize: 'var(--body)',
    margin: 0,
  },
  li: {
    fontSize: 'var(--body)',
    margin: 0,
  },

  '@media (min-width: 768px)': {
    p: { fontSize: 'var(--body-large)' },
    a: { fontSize: 'var(--body-large)' },
    li: { fontSize: 'var(--body-large)' },
  },

  hr: {
    boxSizing: 'content-box',
    height: 0,
    overflow: 'visible',
  },
  pre: {
    fontFamily: 'monospace, monospace',
    fontSize: '1em',
  },
  a: {
    backgroundColor: 'transparent',
  },
  'abbr[title]': {
    borderBottom: 'none',
    textDecoration: 'underline',
    textDecoration: 'underline dotted',
  },

  b: {
    fontWeight: 'bolder',
  },
  strong: {
    fontWeight: 'bolder',
  },

  code: {
    fontFamily: 'monospace, monospace',
    fontSize: '1em',
  },

  small: {
    fontSize: '80%',
  },
  img: {
    borderStyle: 'none',
  },

  button: {
    fontFamily: 'inherit',
    fontSize: '100%',
    lineHeight: 1.15,
    margin: 0,
  },
  input: {
    fontFamily: 'inherit',
    fontSize: '100%',
    lineHeight: 1.15,
    margin: 0,
  },
  optgroup: {
    fontFamily: 'inherit',
    fontSize: '100%',
    lineHeight: 1.15,
    margin: 0,
  },
  select: {
    fontFamily: 'inherit',
    fontSize: '100%',
    lineHeight: 1.15,
    margin: 0,
  },
  textarea: {
    fontFamily: 'inherit',
    fontSize: '100%',
    lineHeight: 1.15,
    margin: 0,
  },

  button: {
    overflow: 'visible',
    textTransform: 'none',
  },
  input: {
    overflow: 'visible',
  },

  select: {
    textTransform: 'none',
  },

  button: {
    '-webkit-appearance': 'button',
  },
  '[type="button"]': {
    '-webkit-appearance': 'button',
  },
  '[type="reset"]': {
    '-webkit-appearance': 'button',
  },
  '[type="submit"] ': {
    '-webkit-appearance': 'button',
  },

  'button::-moz-focus-inner': {
    borderStyle: 'none',
    padding: 0,
  },
  '[type="button"]::-moz-focus-inner': {
    borderStyle: 'none',
    padding: 0,
  },
  '[type="reset"]::-moz-focus-inner': {
    borderStyle: 'none',
    padding: 0,
  },
  '[type="submit"]::-moz-focus-inner': {
    borderStyle: 'none',
    padding: 0,
  },

  'button:-moz-focusring': {
    outline: '1px dotted ButtonText',
  },
  '[type="button"]:-moz-focusring': {
    outline: '1px dotted ButtonText',
  },
  '[type="reset"]:-moz-focusring': {
    outline: '1px dotted ButtonText',
  },
  '[type="submit"]:-moz-focusring': {
    outline: '1px dotted ButtonText',
  },

  fieldset: {
    padding: '0.35em 0.75em 0.625em',
  },

  legend: {
    boxSizing: 'border-box',
    color: 'inherit',
    display: 'table',
    maxWidth: '100%',
    padding: 0,
    whiteSpace: 'normal',
  },

  progress: {
    verticalAlign: 'baseline',
  },

  textarea: {
    overflow: 'auto',
  },

  '[type="checkbox"]': {
    boxSizing: 'border-box',
    padding: 0,
  },
  '[type="radio"]': {
    boxSizing: 'border-box',
    padding: 0,
  },

  '[type="number"]::-webkit-inner-spin-button': {
    height: 'auto',
  },
  '[type="number"]::-webkit-outer-spin-button': {
    height: 'auto',
  },

  '[type="search"]': {
    '-webkit-appearance': 'textfield',
    outlineOffset: '-2px',
  },

  '[type="search"]::-webkit-search-decoration': {
    '-webkit-appearance': 'none',
  },

  '::-webkit-file-upload-button': {
    '-webkit-appearance': 'button',
    font: 'inherit',
  },

  details: {
    display: 'block',
  },

  summary: {
    display: 'list-item',
  },

  template: {
    display: 'none',
  },

  '[hidden]': {
    display: 'none',
  },
})
