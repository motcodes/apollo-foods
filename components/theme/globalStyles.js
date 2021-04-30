import { createGlobalStyle } from 'styled-components'
/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */
export const GlobalStyle = createGlobalStyle({
  ':root': {
    '--white': 'hsla(0,0%,0%,100%)',
    '--black': 'hsla(0,0%,100%,100%)',

    '--orange10': 'hsla(11,96%,10%,100%)',
    '--orange20': 'hsla(12,96%,20%,100%)',
    '--orange30': 'hsla(11,96%,30%,100%)',
    '--orange40': 'hsla(11,95%,40%,100%)',
    '--orange50': 'hsla(11,95%,50%,100%)',
    '--orange60': 'hsla(11,95%,60%,100%)',
    '--orange70': 'hsla(11,96%,70%,100%)',
    '--orange80': 'hsla(12,96%,80%,100%)',
    '--orange90': 'hsla(11,96%,90%,100%)',

    '--blue10': 'hsla(194,100%,10%,100%)',
    '--blue20': 'hsla(194,100%,20%,100%)',
    '--blue30': 'hsla(194,100%,30%,100%)',
    '--blue40': 'hsla(193,100%,40%,100%)',
    '--blue50': 'hsla(193,100%,50%,100%)',
    '--blue60': 'hsla(193,100%,60%,100%)',
    '--blue70': 'hsla(193,100%,70%,100%)',
    '--blue80': 'hsla(193,100%,80%,100%)',
    '--blue90': 'hsla(193,100%,90%,100%)',

    '--purple10': 'hsla(248,43,10%,100%)',
    '--purple20': 'hsla(248,43,20%,100%)',
    '--purple30': 'hsla(248,43,30%,100%)',
    '--purple40': 'hsla(248,43,40%,100%)',
    '--purple50': 'hsla(248,43,50%,100%)',
    '--purple60': 'hsla(248,43,60%,100%)',
    '--purple70': 'hsla(248,43,70%,100%)',
    '--purple80': 'hsla(248,43,80%,100%)',
    '--purple90': 'hsla(248,43,90%,100%)',

    '--grey10': 'hsla(145,3%,10%,100%)',
    '--grey20': 'hsla(145,3%,20%,100%)',
    '--grey30': 'hsla(145,3%,30%,100%)',
    '--grey40': 'hsla(145,3%,40%,100%)',
    '--grey50': 'hsla(145,3%,50%,100%)',
    '--grey60': 'hsla(145,3%,60%,100%)',
    '--grey70': 'hsla(145,3%,70%,100%)',
    '--grey80': 'hsla(145,3%,80%,100%)',
    '--grey90': 'hsla(145,3%,90%,100%)',
  },

  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  html: {
    fontFamily: 'Blatant',
    lineHeight: 1.15,
    '-webkit-text-size-adjust': '100%',
    height: '100%',
    color: 'white',
  },
  body: {
    fontFamily: 'Blatant',
    margin: 0,
    height: '100%',
    background: 'black',
  },
  '#__next': {
    height: '100%',
  },
  main: {
    display: 'block',
  },
  h1: {
    fontSize: '144px',
    margin: 0,
  },
  h2: {
    fontSize: '96px',
    margin: 0,
  },
  h3: {
    fontSize: '64px',
    margin: 0,
  },
  h4: {
    fontSize: '48px',
    margin: 0,
  },
  h5: {
    fontSize: '36px',
    margin: 0,
  },
  h6: {
    fontSize: '24px',
    margin: 0,
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
