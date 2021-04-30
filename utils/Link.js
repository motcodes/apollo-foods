import React from 'react'
import styled from 'styled-components'
import { default as NextLink } from 'next/link'

export const Link = ({
  href = '/',
  prefetch = false,
  linkProps,
  color,
  ...rest
}) => {
  return (
    <NextLink href={href} prefetch={prefetch} {...linkProps}>
      <LinkStyles {...rest} color={color} />
    </NextLink>
  )
}

const LinkStyles = styled.a({
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: ({ theme }) => theme.font.primary,
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '1rem',
  textDecoration: 'none',
  color: ({ theme, color }) => (color ? color : theme.secondary),
  '&:visited': {
    color: ({ theme, color }) => (color ? color : theme.secondary),
  },
  '@media (min-width: 768px)': {
    fontSize: 18,
  },
})
