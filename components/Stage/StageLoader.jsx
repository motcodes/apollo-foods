/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
import styled from 'styled-components'
import Image from 'next/image'
import { Html } from '@react-three/drei'
import { Typography } from '../../utils'

export function StageLoader({
  imageUrl = '/PouchPreload.png',
  style,
  height,
  center = true,
  progress,
}) {
  return (
    <LoaderContainer
      style={{ width: 'calc(100vw - 48px)', height, ...style }}
      center={center}
    >
      <Image
        src={imageUrl}
        alt="Picture of the standard Apollo Foods Pouch"
        layout="fill"
        objectFit="contain"
      />
      <Typography color="var(--orange-50)" font="Blatant" variant="h4">
        {Math.floor(progress)}%
      </Typography>
    </LoaderContainer>
  )
}

const LoaderContainer = styled(Html)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  &:last-child {
    padding-bottom: 2rem;
  }
`
