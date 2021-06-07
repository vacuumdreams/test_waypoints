import React, { useState, useEffect } from 'react'
import { path } from 'ramda'
import styled from 'styled-components'

import type { ConfigType } from '../../../config'
import { Blur, Divider } from  '../../../../atoms'

import { Title } from './title/Title'
import { Map } from './map/Map'
import { Add } from './add/Add'
import { ListContainer } from './list/Container'
import { Directions } from './list/Directions'

import { useWaypoints } from '../store'

type Props = {
  config: ConfigType,
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${path(['theme', 'colors', 'background', 'main'])};
    height: 100vh;
    width: 100vw;
`

const Box = styled.div`
    display: flex;
    flex: 1;
    margin: auto;
    width: 100%;
    padding: 1rem;
    overflow: hidden;
`

const ButtonWrap = styled.div`
    padding: 0 1rem;
`

const ListWrap = styled(Blur)`
    flex: 1 1 auto;
`

export const WaypointsComponent = ({ config }: Props) => {
  const [isSearchOpen, setSearchOpen] = useState(false)
  const { state, getWaypoints } = useWaypoints()

  const isLoading = state.list.loading || state.item.loading

  useEffect(() => {
      getWaypoints()
  }, [])

  return (
      <Container>
          <Title>This is the way<span>point app</span>.</Title>
          <Box>
              <ListContainer>
                  <ButtonWrap>
                      <Add isLoading={isLoading} config={config.mapbox} setSearchOpen={setSearchOpen} />
                  </ButtonWrap>
                  <Divider />
                  <ListWrap data-blur={isSearchOpen || isLoading}>
                    <Directions items={state.list.data} />
                  </ListWrap>
              </ListContainer>
              <Map config={config.mapbox} />
          </Box>
      </Container>
  )
}
