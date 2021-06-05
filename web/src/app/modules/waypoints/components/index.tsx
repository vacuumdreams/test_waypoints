import React, { useEffect, useCallback } from 'react'
import { path } from 'ramda'
import styled from 'styled-components'

import type { ConfigType } from '../../../config'
import { Divider } from  '../../../../atoms'

import { Title } from './title/Title'
import { Map } from './map/Map'
import { Add } from './add/Add'
import { ListContainer } from './list/Container'
import { List } from './list/List'

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

const ListWrap = styled.div`
    flex: 1 1 auto;
`

export const WaypointsComponent = ({ config }: Props) => {
  const { state, getWaypoints } = useWaypoints()

  const isLoading = state.list.loading || state.item.loading

  const onScrollEnd = useCallback((end) => {
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
                      <Add isLoading={isLoading} />
                  </ButtonWrap>
                  <Divider />
                  <ListWrap>
                    <List items={state.list.data} count={1000} loadItems={(_, end) => onScrollEnd(end)} />
                  </ListWrap>
              </ListContainer>
              <Map config={config.mapbox} />
          </Box>
      </Container>
  )
}
