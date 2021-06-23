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
}) => (
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

const ButtonProps = {
  padding: ({ size }) => {
    if (size === 'large') {
      return '0.8rem 3rem'
    }
    if (size === 'medium') {
      return '0.9rem 1rem'
    }
    if (size === 'small') {
      return '0.5rem 0.8rem'
    }
    return '0.8rem'
  },
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
    }
    if (variant === 'outlined') {
      return color || 'transparent'
    }
    return theme.orange50
  },

  color: ({ theme, variant }) => {
    if (variant === 'outlined' || variant === 'text') {
      return theme.orange50
    }
    return 'white'
  },
  border: ({ theme, variant }) => {
    if (variant === 'text') {
      return '2px solid transparent'
    }
    return `2px solid ${theme.orange50}`
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
      }
      if (variant === 'outlined') {
        return theme.orange20
      }
      return theme.orange60
    },
    borderColor: ({ theme, variant, transparent }) => {
      if (transparent || variant === 'text') {
        return 'rgba(255,255,255,0.15)'
      }
      if (variant === 'outlined') {
        return theme.orange40
      }
      return theme.orange60
    },
  },
}

const Btn = styled('button')({
  ...ButtonProps,
})
