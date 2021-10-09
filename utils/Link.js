/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import React from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'

export const Link = ({ href = '/', prefetch = false, linkProps, ...rest }) => (
  <NextLink href={href} prefetch={prefetch} {...linkProps}>
    <LinkStyles {...rest} />
  </NextLink>
)
export const LinkExt = ({ href = '/', ...rest }) => (
  <LinkStyles href={href} target="_blank" rel="noopener noreferrer" {...rest} />
)

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
