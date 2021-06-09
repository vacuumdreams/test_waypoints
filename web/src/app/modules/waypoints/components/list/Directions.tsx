import React from 'react'
import { move, path } from 'ramda'
import styled from 'styled-components'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'

import type { SavedWaypoint } from  '../../../../../services/client'

import { DragItem } from './DragItem'

type Props = {
    isLoading: boolean;
    order: string[]
    items: {
      [key: string]: SavedWaypoint,
    },
    setOrder: (order: string[]) => void,
}

const Wrapper = styled.div`
    border: 2px dashed ${path(['theme', 'colors', 'transparent'])};
    transition: ${path(['theme', 'transition'])}s background-color, ${path(['theme', 'transition'])}s border-color;

    &[data-dragging="true"] {
        background-color: ${path(['theme', 'colros', 'background', 'dim'])};
        border-color: ${path(['theme', 'colors', 'primary', 'main'])};
    }
`

export const Directions = ({ isLoading, items, order, setOrder }: Props) => {
    const onDragEnd = (result: DropResult) => {
        if (!isLoading && order.length > 1 && result.source && result.destination) {
            const newOrder = move(result.source.index, result.destination.index, order)
            if (newOrder.join() !== order.join()) {
              setOrder(newOrder)
            }
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <Wrapper {...provided.droppableProps} ref={provided.innerRef} data-dragging={snapshot.isDraggingOver}>
                        {order.map((id, i) => (
                            <DragItem key={id} item={items[id]} index={i} />
                        ))}
                        {provided.placeholder}
                    </Wrapper>
                )}
            </Droppable>
        </DragDropContext>
    )
}
