import React, { useRef, useState } from 'react'
import { path } from 'ramda'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'
import { debounce } from 'throttle-debounce'

import { Autocomplete } from '../../../../../atoms'
import { SearchOption } from './SearchOption'
import { AddButton } from './AddButton'

import type { SearchOptionProps } from './SearchOption'
import type { Waypoint } from '../../../../../services/client'
import type { ConfigType } from '../../../../config'

import { useSearch } from '../../../../../services/map/useSearch'
import { useWaypoints } from '../../store'
import { useClickAway } from '../../../../../services/ui/useClickAway'

type Props = {
    isLoading: boolean,
    config: ConfigType['mapbox'],
    setSearchOpen: (value: boolean) => void;
}

const TransitionWrap = styled.div`
    position: relative;
`

export const Add = ({ config, isLoading, setSearchOpen }: Props) => {
    const inputRef = useRef(null)
    const [isAdding, setAdding] = useState(false)
    const [searchList, setSearchList] = useState<Waypoint[]>([])
    const { searchForPlace } = useSearch(config)
    const { saveWaypoint } = useWaypoints()
    useClickAway(inputRef, () => setAdding(false))

    const label = "Add new place"

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

    const onOptionAddClick = (item: Waypoint) => saveWaypoint(item)

    return (
        <Transition in={isAdding} timeout={300}>
            {(state) => (
                <TransitionWrap data-state={state}>
                    <Autocomplete<Waypoint, SearchOptionProps>
                        items={searchList}
                        placeholder={state === 'entered' ? label : ''}
                        onChange={onChangeHandler}
                        onOpenChange={setSearchOpen}
                        itemToString={path<string>(['name'])}
                        disabled={isLoading}
                        inputRef={inputRef}
                        optionProps={{ onAddClick: onOptionAddClick }}
                        Option={SearchOption}
                    />
                    <AddButton
                        disabled={isLoading}
                        onClick={() => {
                          setAdding(true)
                          if (inputRef.current) {
                              inputRef.current.focus()
                          }
                        }}
                    >
                        <span>{label}</span>
                    </AddButton>
                </TransitionWrap>
            )}
        </Transition>
    )
}
