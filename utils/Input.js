import styled, { css } from 'styled-components'
import { Typography } from './Typography'

export function Input({
  id,
  label = 'Label',
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  isTaken = false,
  minLength = 3,
  ...rest
}) {
  if (isTaken) {
    error = false
  }
  return (
    <Container htmlFor={id}>
      <Typography variant="h5">{label}:</Typography>
      <InputField
        {...rest}
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        disabled={disabled}
        isError={error || isTaken}
      />
      {error && (
        <ErrorContainer>
          {value === '' && <Typography>A {name} is required</Typography>}
          {value <= minLength && (
            <Typography>
              The {name} must inclued at least 3 characters
            </Typography>
          )}
        </ErrorContainer>
      )}
      {isTaken && (
        <ErrorContainer>
          <Typography>The {name} is not available</Typography>
        </ErrorContainer>
      )}
    </Container>
  )
}

const Container = styled.label`
  padding: 0 0 0.5rem;
  width: 100%;

  @media (min-width: 768px) {
    padding: 0 0 1rem;
    h5 {
      padding-left: 0.25rem;
      margin-bottom: 0.25rem;
    }
  }
`

const InputField = styled.input`
  --width: 100%;
  --padding: 0.5rem 0.5rem;
  --fSize: 1rem;
  --bWidth: 1.5px;
  --bRadius: 8px;
  --shadowSize: 4px;

  width: var(--width);
  padding: var(--padding);
  border: var(--bWidth) solid var(--grey-80);
  border-radius: var(--bRadius);
  background-color: transparent;
  font-size: var(--fSize);
  line-height: 120%;
  color: white;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 0 0 var(--shadowSize) var(--purple-30);
  }
  &:focus {
    outline: none;
    border-color: var(--purple-70);
    box-shadow: 0 0 0 var(--shadowSize) var(--purple-40);
  }
  &:disabled {
    outline: none;
    color: var(--grey-70);
    background-color: var(--grey-20);
    border-color: var(--grey-50);
    box-shadow: none;
  }

  ${({ isError }) =>
    isError &&
    css`
      background-color: var(--orange-20);
      border-color: var(--orange-50);
      /* box-shadow: 0 0 0 var(--shadowSize) var(--orange-30); */
      color: white;

      &:hover {
        box-shadow: 0 0 0 var(--shadowSize) var(--orange-30);
      }
      &:focus,
      &:active {
        outline: none;
        border-color: var(--orange-70);
        box-shadow: 0 0 0 var(--shadowSize) var(--orange-40);
        color: white;
      }
    `}

  @media (min-width: 768px) {
    --padding: 0.75rem;
    --fSize: 1.25rem;
    --bWidth: 2px;
    --bRadius: 12px;
    --shadowSize: 6px;
  }
`

const ErrorContainer = styled.div`
  padding-top: 4px;
  p {
    color: var(--grey-80);
    font-size: 0.8rem;
  }
`
