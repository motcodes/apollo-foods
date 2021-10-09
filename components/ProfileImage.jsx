/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import styled from 'styled-components'
import Image from 'next/image'

export const ProfileImage = ({
  src,
  alt = '',
  size = 256,
  layout = 'responsive',
}) => (
  <ImageWrapper>
    <Image src={src} alt={alt} width={size} height={size} layout={layout} />
  </ImageWrapper>
)
export const FallbackProfileImage = ({ size = 96, letter = 'M' }) => (
  <ImageWrapper>
    <FallbackProfileImageIcon size={size} letter={letter} />
  </ImageWrapper>
)
export const FallbackProfileImageIcon = ({ size = 96, letter = 'M' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="23.5"
      height="23.5"
      rx="12"
      fill="var(--orange-50)"
      stroke="white"
      strokeWidth="0.5px"
    />
    <text
      x="49%"
      y="53%"
      dominantBaseline="middle"
      textAnchor="middle"
      color="white"
      fill="white"
      fontSize="1.25rem"
    >
      {letter.toUpperCase()}
    </text>
  </svg>
)

const ImageWrapper = styled.figure`
  --imageSize: 96px;
  --mBottom: 8px;

  max-width: var(--imageSize);
  max-height: var(--imageSize);
  margin-bottom: var(--mBottom);
  border: 2px solid var(--grey-80);
  border-radius: calc(var(--imageSize) / 2);
  img {
    border-radius: calc(var(--imageSize) / 2);
  }
  svg {
    width: var(--imageSize);
    height: var(--imageSize);
  }
  @media (min-width: 768px) {
    --imageSize: 128px;
    --mBottom: 16px;
  }
  @media (min-width: 1024px) {
    --imageSize: 204px;
    --mBottom: 24px;
  }
`
