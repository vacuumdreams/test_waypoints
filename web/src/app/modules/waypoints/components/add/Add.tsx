import React, { useState } from 'react'
import { path } from 'ramda'
import styled from 'styled-components'
import { debounce } from 'throttle-debounce'
import { useCombobox } from 'downshift'

import { Button } from '../../../../../atoms'
import type { ConfigType } from '../../../../config'
import type { Waypoint } from '../../../../../services/client'
import { InputButton } from  './InputButton'

import { useSearch } from '../../../../../services/map/useSearch'
import { useWaypoints } from '../../store'

type Props = {
    isLoading: boolean,
    config: ConfigType['mapbox'],
    setSearchOpen: (value: boolean) => void;
}

const Wrapper = styled.div`
    position: relative;
`

const SearchList = styled.div`
    position: absolute;
    top: 3rem;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: ${path(['theme', 'colors', 'background', 'main'])};
    border: 3px solid ${path(['theme', 'colors', 'neutral', 'main'])};
    border-top: none;
`

const SearchItem = styled.div`
    position: relative;
    font-size: 1rem;

    & span {
      padding: 1rem;
    }

    & ${Button} {
      position: absolute;
      top: 0;
      right: 0;
    }
`
export const Add = ({ isLoading, config, setSearchOpen }: Props) => {
    const [searchList, setSearchList] = useState<Waypoint[]>([])
    const { searchForPlace } = useSearch(config)
    const { saveWaypoint } = useWaypoints()

    const onChangeHandler = debounce(400, false, ({ inputValue }) => {
        searchForPlace(inputValue)
          .then(list => {
              if (list.length) {
                setSearchOpen(true)
              } else {
                setSearchOpen(false)
              }
              setSearchList(list)
          })
    })

    const {
      isOpen,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
    } = useCombobox({
        items: searchList,
        itemToString: path(['name']),
        onInputValueChange: onChangeHandler,
    })

    const inputProps = getInputProps({
      onBlur: () => {
        setSearchOpen(false)
      }
    })

    return (
        <form role="search" aria-label="Saved waypoints">
            <Wrapper {...getComboboxProps()}>
                <InputButton
                    placeholder="Add new  place"
                    inputProps={inputProps}
                    isDisabled={isLoading}
                />
                <SearchList {...getMenuProps()}>
                    {isOpen && searchList.map((item, index) => (
                        <SearchItem
                          key={`${item.name}${index}`}
                          {...getItemProps({item, index})}
                        >
                          <span>{item.name}</span>
                          <div>
                              {highlightedIndex === index && (
                                  <Button onClick={() => saveWaypoint(item)}>Add</Button>
                              )}
                          </div>
                        </SearchItem>
                    ))}
                </SearchList>
            </Wrapper>
        </form>
    )
}
