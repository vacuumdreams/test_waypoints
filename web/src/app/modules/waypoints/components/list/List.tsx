import React from 'react'
import { path, pathSatisfies } from 'ramda'
import styled from 'styled-components'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import Autosizer from 'react-virtualized-auto-sizer'
import Skeleton from 'react-loading-skeleton'

import { Waypoint } from '../../../../../services/client'

type Props = {
    items: Waypoint[],
    count: number,
    loadItems: (startIndex: number, stopIndex: number) => Promise<Waypoint[]>,
}

const odd = (num: number) => num % 2 === 1

const Item = styled.div<{ index: number }>`
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 1rem;
    font-weight: ${path(['theme', 'fonts', 'primary', 'weight', 'bold'])};

    ${p => pathSatisfies(odd, ['index'], p)
    ? `background-color: ${path(['theme', 'colors', 'neutral', 'weak'], p)};`
    : ''
    }

    & span {
        display: block;
        width:  100%;
    }

    & .react-loading-skeleton {
        width: 100%;
        opacity: 0.8;
    }
`

const Row = (items: Waypoint[]) => ({ index, style }) => (
    <Item style={style} index={index}>
        {items[index] ? <div>{items[index].name}</div> : <Skeleton />}
    </Item>
)

export const List = ({ items, count, loadItems }:  Props) => (
    <Autosizer>
        {({ width, height }) => (
            <InfiniteLoader
                isItemLoaded={(index) => !!items[index]}
                itemCount={count}
                loadMoreItems={loadItems}
            >
                {({ onItemsRendered, ref }) => (
                    <FixedSizeList
                        ref={ref}
                        itemCount={count}
                        itemSize={48}
                        height={height}
                        width={width}
                        onItemsRendered={onItemsRendered}
                    >
                      {Row(items)}
                    </FixedSizeList>
                )}
            </InfiniteLoader>
        )}
    </Autosizer>
)
