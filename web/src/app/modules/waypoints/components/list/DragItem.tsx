import React from 'react'
import { path } from 'ramda'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

import type { SavedWaypoint } from '../../../../../services/client'

import { Marker } from '../../../../../atoms'
import { RemoveButton } from  './RemoveButton'

type Props = {
    item: SavedWaypoint,
    index: number,
    onRemove: (waypoint: SavedWaypoint) => void;
}

const MarkerWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${path(['theme', 'colors', 'primary', 'main'])};
    background: #fff;
    border-radius: 50%;
    border: 3px solid ${path(['theme', 'colors', 'primary', 'main'])};
    width: 26px;
    height: 26px;
    margin-top: 0.75rem;
`

const DirectionItem = styled.div`
    display: grid;
    grid-template-columns: calc(26px + 1rem) auto 3rem;

    padding: 1rem;
    transition: ${path(['theme', 'transition'])}s opacity, ${path(['theme', 'transition'])}s background-color;

    &[data-dragging="true"] {
        opacity: 0.7;
        background-color: ${path(['theme', 'colors', 'neutral', 'weak'])};
    }

    &:hover ${RemoveButton} {
        opacity: 0.8;
    }
`

const Item = styled.div`
    transition: ${path(['theme', 'transition'])}s background-color;

    &[data-dragging="true"] {
        background-color: ${path(['theme', 'colors', 'neutral', 'weak'])};
    }

`

const Name = styled.div`
    display: flex;
    align-items: center;
`

export  const DragItem = ({ item, index, onRemove }: Props) => (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
        {(provided, snapshot) => {
          // fix positioning offset
          // ref: https://github.com/atlassian/react-beautiful-dnd/issues/1881
          if (snapshot.isDragging) {
              // @ts-ignore
              provided.draggableProps.style.left = provided.draggableProps.style.offsetLeft;
              // @ts-ignore
              provided.draggableProps.style.top = provided.draggableProps.style.offsetTop;
          }
          return (
            <Item
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                data-dragging={snapshot.isDragging}
            >
              <DirectionItem>
                  <MarkerWrap>
                      <Marker size={12} />
                  </MarkerWrap>
                  <Name>{item.name}</Name>
                  <RemoveButton onClick={() => onRemove(item)}>❌</RemoveButton>
              </DirectionItem>
            </Item>
          )
        }}
    </Draggable>
)
