import { global } from '../../stitches.config'

/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */
export const globalStyles = global({
  '@font-face': {
    fontFamily: 'Blatant',
    fontWeight: 400,
    src: 'loacl("Blatant"), url(../../fonts/Blatant.otf) format("otf")',
  },

  '*': {
    m: 0,
    p: 0,
  },
  html: {
    fontFamily: 'Blatant',
    lineHeight: 1.15,
    '-webkit-text-size-adjust': '100%',
  },
  body: {
    fontFamily: 'Blatant',
    m: 0,
  },
  main: {
    display: 'block',
  },
  h1: {
    fontSize: '$h1',
    m: 0,
  },
  h2: {
    fontSize: '$h2',
    m: 0,
  },
  h3: {
    fontSize: '$h3',
    m: 0,
  },
  h4: {
    fontSize: '$h4',
    m: 0,
  },
  h5: {
    fontSize: '$h5',
    m: 0,
  },
  h6: {
    fontSize: '$h6',
    m: 0,
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
    m: 0,
  },
  input: {
    fontFamily: 'inherit',
    fontSize: '100%',
    lineHeight: 1.15,
    m: 0,
  },
  optgroup: {
    fontFamily: 'inherit',
    fontSize: '100%',
    lineHeight: 1.15,
    m: 0,
  },
  select: {
    fontFamily: 'inherit',
    fontSize: '100%',
    lineHeight: 1.15,
    m: 0,
  },
  textarea: {
    fontFamily: 'inherit',
    fontSize: '100%',
    lineHeight: 1.15,
    m: 0,
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
    p: 0,
  },
  '[type="button"]::-moz-focus-inner': {
    borderStyle: 'none',
    p: 0,
  },
  '[type="reset"]::-moz-focus-inner': {
    borderStyle: 'none',
    p: 0,
  },
  '[type="submit"]::-moz-focus-inner': {
    borderStyle: 'none',
    p: 0,
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
    p: '0.35em 0.75em 0.625em',
  },

  legend: {
    boxSizing: 'border-box',
    color: 'inherit',
    display: 'table',
    maxWidth: '100%',
    p: 0,
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
    p: 0,
  },
  '[type="radio"]': {
    boxSizing: 'border-box',
    p: 0,
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
