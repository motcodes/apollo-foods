import styled from 'styled-components'

export const Typography = ({
  variant = 'p',
  as,
  font,
  fontWeight,
  color,
  children,
  ...rest
}) => {
  switch (variant) {
    case 'h1':
      return (
        <H1 as={as} font={font} color={color} {...rest}>
          {children}
        </H1>
      )
    case 'h2':
      return (
        <H2 as={as} font={font} color={color} {...rest}>
          {children}
        </H2>
      )
    case 'h3':
      return (
        <H3 as={as} font={font} color={color} {...rest}>
          {children}
        </H3>
      )
    case 'h4':
      return (
        <H4 as={as} font={font} color={color} {...rest}>
          {children}
        </H4>
      )
    case 'h5':
      return (
        <H5 as={as} font={font} color={color} {...rest}>
          {children}
        </H5>
      )
    case 'h6':
      return (
        <H6 as={as} font={font} color={color} {...rest}>
          {children}
        </H6>
      )
    case 'label':
      return (
        <Label as={as} font={font} color={color} {...rest}>
          {children}
        </Label>
      )
    case 'p':
      return (
        <P as={as} font={font} color={color} {...rest}>
          {children}
        </P>
      )
    default:
      return (
        <P as={as} font={font} color={color} {...rest}>
          {children}
        </P>
      )
  }
}

const headingOption = {
  display: 'flex',
  alignItems: 'center',
  lineHeight: '120%',
  fontWeight: 400,
  color: ({ color }) => (color ? color : 'currentColor'),
  fontFamily: ({ font, theme }) => (font ? font : theme.font.primary),
}

const H1 = styled('h1')({
  ...headingOption,
  fontSize: 'var(--h1)',
})
const H2 = styled('h2')({
  ...headingOption,
  fontSize: 'var(--h2)',
})
const H3 = styled('h3')({
  ...headingOption,
  fontSize: 'var(--h3)',
})
const H4 = styled('h4')({
  ...headingOption,
  fontSize: 'var(--h4)',
})
const H5 = styled('h5')({
  ...headingOption,
  fontSize: 'var(--h5)',
})
const H6 = styled('h6')({
  ...headingOption,
  fontSize: 'var(--h6)',
})
const Label = styled('label')({
  ...headingOption,
})
const P = styled.p`
  display: flex;
  align-items: center;
  font-weight: 400;
  color: ${({ color }) => (color ? color : 'currentColor')};
  font-family: ${({ font, theme }) => (font ? font : theme.font.body)};
`
