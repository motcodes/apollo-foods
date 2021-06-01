/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import React from 'react'
import styled from 'styled-components'

export const Button = ({
  size = 'medium',
  variant = 'filled',
  scale = 1,
  fullWidth = false,
  disabled = false,
  children = 'Button',
  ...rest
}) => {
  return (
    <Btn
      {...rest}
      size={size}
      variant={variant}
      scale={scale}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {children}
    </Btn>
  )
}

// export const IconButton = ({
//   size = 'medium',
//   variant = 'filled',
//   scale = 1,
//   fullWidth = false,
//   children = 'Text',
//   ...rest
// }) => {
//   return (
//     <IconBtn
//       {...rest}
//       size={size}
//       variant={variant}
//       scale={scale}
//       style={{
//         width: fullWidth ? '100%' : 'fit-content',
//       }}
//     >
//       {children}
//     </IconBtn>
//   )
// }

const ButtonProps = {
  padding: ({ size }) =>
    size === 'large'
      ? '0.8rem 3rem'
      : size === 'medium'
      ? '0.9rem 1rem'
      : size === 'small'
      ? '0.5rem 0.8rem'
      : '0.8rem',
  borderRadius: '12px',
  fontFamily: ({ theme }) => theme.font.primary,
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 'var(--body)',
  lineHeight: '100%',
  cursor: 'pointer',
  textDecoration: 'none',
  userSelect: 'none',
  transition: 'all 0.2s ease-out',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: ({ fullWidth }) => (fullWidth ? '100%' : 'fit-content'),
  backgroundColor: ({ theme, variant, color }) => {
    if (variant === 'text') {
      return 'transparent'
    } else if (variant === 'outlined') {
      return color ? color : 'transparent'
    } else {
      return theme.orange50
    }
  },

  color: ({ theme, variant }) => {
    if (variant === 'outlined' || variant === 'text') {
      return theme.orange50
    } else {
      return 'white'
    }
  },
  border: ({ theme, variant }) => {
    if (variant === 'text') {
      return '2px solid transparent'
    } else {
      return `2px solid ${theme.orange50}`
    }
  },
  transform: ({ scale }) => (scale ? `scale(${scale})` : 'scale(1)'),
  transfromOrigin: 'center',

  '@media (min-width: 768px)': {
    fontSize: 'var(--body-large)',
  },

  '&:hover': {
    transition: 'all 0.3 ease-out',
    backgroundColor: ({ theme, variant, transparent }) => {
      if (transparent || variant === 'text') {
        return 'rgba(255,255,255,0.15)'
      } else {
        return theme.orange60
      }
    },
    borderColor: ({ theme, variant, transparent }) => {
      if (transparent || variant === 'text') {
        return 'rgba(255,255,255,0.15)'
      } else {
        return theme.orange60
      }
    },
  },
}

const Btn = styled('button')({
  ...ButtonProps,
})
