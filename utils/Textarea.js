/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import styled from 'styled-components'
import { Typography } from './Typography'

export function Textarea({
  id,
  label = 'Label',
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  ...rest
}) {
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
      />
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
      text-transform: capitalize;
    }
  }
`

const InputField = styled.textarea`
  --height: 5rem;
  --width: 100%;
  --padding: 0.5rem 0.5rem;
  --fSize: 1rem;
  --bWidth: 1.5px;
  --bRadius: 8px;
  --shadowSize: 4px;

  width: var(--width);
  height: var(--height);
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
  &:focus,
  &:active {
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

  @media (min-width: 768px) {
    --padding: 0.75rem;
    --fSize: 1.25rem;
    --bWidth: 2px;
    --bRadius: 12px;
    --shadowSize: 6px;
  }
`
