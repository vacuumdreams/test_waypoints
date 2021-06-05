import React from 'react'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  & span {
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
`

export const MapSkeleton = () => <Wrapper><Skeleton wrapper={Wrapper} /></Wrapper>
