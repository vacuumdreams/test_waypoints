import React from 'react'
import { path } from 'ramda'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

import type { SavedWaypoint } from '../../../../../services/client'

import { Marker } from '../../../../../atoms'

type Props = {
    item: SavedWaypoint,
    index: number,
}

const MarkerWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color:  ${path(['theme', 'colors', 'primary', 'main'])};
    margin-right: 1rem;
    background: #fff;
    border-radius: 50%;
    border: 3px solid ${path(['theme', 'colors', 'primary', 'main'])};
    width: 1.8rem;
    height: 1.8rem;
`

const DirectionItem = styled.div`
    display: flex;
    padding: 1rem;
    transition: ${path(['theme', 'transition'])}s opacity, ${path(['theme', 'transition'])}s background-color;

    &[data-dragging="true"] {
        opacity: 0.7;
        background-color: ${path(['theme', 'colors', 'neutral', 'weak'])};
    }
`

const Item = styled.div`
    transition: ${path(['theme', 'transition'])}s background-color;

    &[data-dragging="true"] {
        background-color: ${path(['theme', 'colors', 'neutral', 'weak'])};
    }

`

export  const DragItem = ({ item, index }: Props) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
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
                  {item.name}
              </DirectionItem>
            </Item>
          )
        }}
    </Draggable>
)
