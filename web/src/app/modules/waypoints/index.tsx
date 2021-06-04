import React, { useEffect, useCallback } from 'react'
import { path } from 'ramda'
import styled from 'styled-components'

import type { ConfigType } from '../../config'
import { Button } from  '../../../atoms'
import { Title, Map, List, ListContainer } from './components'

import { useMap } from  '../../../services/map/useMap'
import { useWaypoints } from './store'

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

const Divider = styled.hr`
    width: 100%;
    height: 1px;
    margin: 1rem 0;
    background-color: ${path(['theme', 'colors', 'neutral', 'main'])};
    border: none;
`

const ButtonWrap = styled.div`
    padding: 0 1rem;
`

export const Waypoints = ({ config }: Props) => {
  const { ref } = useMap(config.mapbox)
  const { state, getWaypoints } = useWaypoints()
  const isLoading = state.list.loading || state.item.loading

  const getNextPageOnEnd = useCallback((end) => {
      if (end > state.list.data.length) {
        return getWaypoints({ page: state.list.page + 1 })
      }
  }, [state.list.data.length])

  useEffect(() => {
      getWaypoints({ page: 1 })
  }, [])

  return (
      <Container>
          <Title>This is the way<span>point app</span>.</Title>
          <Box>
              <ListContainer>
                  <ButtonWrap>
                      <Button disabled={isLoading} aria-disabled={isLoading}>Add new</Button>
                  </ButtonWrap>
                  <Divider />
                  <List items={state.list.data} count={1000} loadItems={(_, end) => getNextPageOnEnd(end)} />
              </ListContainer>
              <Map ref={ref} />
          </Box>
      </Container>
  )
}
