import { createCss } from '@stitches/react'

export const {
  styled,
  css,
  global,
  keyframes,
  getCssString,
  theme,
} = createCss({
  theme: {
    colors: {
      white: 'hsla(0,0%,0%,100%)',
      black: 'hsla(0,0%,100%,100%)',

      orange10: 'hsla(11,96%,10%,100%)',
      orange20: 'hsla(12,96%,20%,100%)',
      orange30: 'hsla(11,96%,30%,100%)',
      orange40: 'hsla(11,95%,40%,100%)',
      orange50: 'hsla(11,95%,50%,100%)',
      orange60: 'hsla(11,95%,60%,100%)',
      orange70: 'hsla(11,96%,70%,100%)',
      orange80: 'hsla(12,96%,80%,100%)',
      orange90: 'hsla(11,96%,90%,100%)',

      blue10: 'hsla(194,100%,10%,100%)',
      blue20: 'hsla(194,100%,20%,100%)',
      blue30: 'hsla(194,100%,30%,100%)',
      blue40: 'hsla(193,100%,40%,100%)',
      blue50: 'hsla(193,100%,50%,100%)',
      blue60: 'hsla(193,100%,60%,100%)',
      blue70: 'hsla(193,100%,70%,100%)',
      blue80: 'hsla(193,100%,80%,100%)',
      blue90: 'hsla(193,100%,90%,100%)',

      purple10: 'hsla(248,43,10%,100%)',
      purple20: 'hsla(248,43,20%,100%)',
      purple30: 'hsla(248,43,30%,100%)',
      purple40: 'hsla(248,43,40%,100%)',
      purple50: 'hsla(248,43,50%,100%)',
      purple60: 'hsla(248,43,60%,100%)',
      purple70: 'hsla(248,43,70%,100%)',
      purple80: 'hsla(248,43,80%,100%)',
      purple90: 'hsla(248,43,90%,100%)',

      grey10: 'hsla(145,3%,10%,100%)',
      grey20: 'hsla(145,3%,20%,100%)',
      grey30: 'hsla(145,3%,30%,100%)',
      grey40: 'hsla(145,3%,40%,100%)',
      grey50: 'hsla(145,3%,50%,100%)',
      grey60: 'hsla(145,3%,60%,100%)',
      grey70: 'hsla(145,3%,70%,100%)',
      grey80: 'hsla(145,3%,80%,100%)',
      grey90: 'hsla(145,3%,90%,100%)',
    },
    fontSizes: {
      h1: '144px',
      h2: '96px',
      h3: '64px',
      h4: '48px',
      h5: '36px',
      h6: '24px',
      body: '16px',
    },
    fonts: {
      primary: 'Blatant',
    },
    fontWeights: {
      normal: 400,
    },
    // space: {},
    // lineHeights: {},
    // letterSpacings: {},
    // sizes: {},
    // borderWidths: {},
    // borderStyles: {},
    // radii: {},
    // shadows: {},
    // zIndices: {},
    // transitions: {},
  },
  media: {
    bp1: '(min-width: 640px)',
    bp2: '(min-width: 768px)',
    bp3: '(min-width: 1024px)',
    bp4: '(min-width: 1280px)',
  },
  utils: {
    // Abbreviated margin properties
    m: (config) => (value) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mt: (config) => (value) => ({
      marginTop: value,
    }),
    mr: (config) => (value) => ({
      marginRight: value,
    }),
    mb: (config) => (value) => ({
      marginBottom: value,
    }),
    ml: (config) => (value) => ({
      marginLeft: value,
    }),
    mx: (config) => (value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (config) => (value) => ({
      marginTop: value,
      marginBottom: value,
    }),
    // Abbreviated padding properties
    p: (config) => (value) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    pt: (config) => (value) => ({
      marginTop: value,
    }),
    pr: (config) => (value) => ({
      marginRight: value,
    }),
    pb: (config) => (value) => ({
      marginBottom: value,
    }),
    pl: (config) => (value) => ({
      marginLeft: value,
    }),
    px: (config) => (value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    py: (config) => (value) => ({
      marginTop: value,
      marginBottom: value,
    }),

    // A property for applying width/height together
    size: (config) => (value) => ({
      width: value,
      height: value,
    }),

    // A property to apply linear gradient
    linearGradient: (config) => (value) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),

    // An abbreviated property for border-radius
    br: (config) => (value) => ({
      borderRadius: value,
    }),
  },
})
