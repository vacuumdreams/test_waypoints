import React from 'react'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'

type Props = {
  isLoading: boolean,
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  transition: 0.5s opacity;

  &[data-loading="false"] {
      opacity: 0;
  }

  & span {
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
`

export const MapSkeleton = ({ isLoading }: Props) => (
    <Wrapper data-loading={isLoading}>
        <Skeleton wrapper={Wrapper} />
    </Wrapper>
)
