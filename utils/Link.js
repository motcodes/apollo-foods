import React from 'react'
import styled from 'styled-components'
import { default as NextLink } from 'next/link'
import { isExternalUrl } from '../lib'

export const Link = ({ href = '/', prefetch = false, linkProps, ...rest }) => {
  return (
    <NextLink href={href} prefetch={prefetch} {...linkProps}>
      <LinkStyles {...rest} />
    </NextLink>
  )
}
export const LinkExt = ({ href = '/', ...rest }) => {
  return (
    <LinkStyles
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    />
  )
}

const LinkStyles = styled.a({
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: ({ theme }) => theme.font.primary,
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: 'var(--body)',
  textDecoration: 'none',
  color: 'var(--blue-80)',
  cursor: 'pointer',
  '&:visited': {
    color: 'var(--blue-80)',
  },
  '&:hover': {
    textDecoration: 'underline',
  },
  '@media (min-width: 768px)': {
    fontSize: 'var(--body-large)',
  },
})
