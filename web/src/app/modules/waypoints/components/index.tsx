import React, { useState, useEffect } from 'react'
import { path } from 'ramda'
import styled from 'styled-components'

import type { ConfigType } from '../../../config'
import { Blur, Divider, Message } from  '../../../../atoms'

import { Title } from './title/Title'
import { Map } from './map/Map'
import { Add } from './add/Add'
import { ListContainer } from './list/Container'
import { Directions } from './list/Directions'
import { LoadingList } from './list/Loading'

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

export const WaypointsComponent = ({ config }: Props) => {
  const [isSearchOpen, setSearchOpen] = useState(false)
  const { state, getWaypoints, updateWaypointsOrder, deleteWaypoint } = useWaypoints()

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
                  {state.list.error && (
                      <Message type="error">Could not load your saved waypoints.</Message>
                  )}
                  {state.item.error && (
                      <Message type="error">Could not save save your data.</Message>
                  )}
                  {state.order.error && (
                      <Message type="error">Could not save save new  order.</Message>
                  )}
                  {!state.item.error && !state.list.error && isLoading && (
                      <LoadingList />
                  )}
                  {!state.item.error && !state.list.error && !isLoading && state.list.order.length === 0 && (
                      <Message type="info">Go on and add your first waypoint!</Message>
                  )}
                  <Blur data-blur={isSearchOpen || isLoading}>
                      <Directions
                          isLoading={isLoading || state.order.loading}
                          items={state.list.data}
                          order={state.list.order}
                          setOrder={updateWaypointsOrder}
                          removeItem={deleteWaypoint}
                      />
                  </Blur>
              </ListContainer>
              <Map config={config.mapbox} />
          </Box>
      </Container>
  )
}
