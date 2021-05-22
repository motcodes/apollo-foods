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
  @media (min-width: 768px) {
    --imageSize: 128px;
    --mBottom: 16px;
  }
  @media (min-width: 1024px) {
    --imageSize: 204px;
    --mBottom: 24px;
  }
`
