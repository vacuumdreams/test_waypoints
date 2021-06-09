import React from 'react'
import { path } from 'ramda'
import styled from 'styled-components'
import { useCombobox, UseComboboxStateChange } from 'downshift'

import { Input } from '../'

export type OptionProps<T, P> = P & {
    item: T,
    isHighlighted: boolean,
    closeMenu: ()  => void,
    children: string,
}

export type OptionType<T, P> = (p: OptionProps<T, P>) => JSX.Element;

type Props<T, P> = {
  items: Array<T>,
  disabled: boolean,
  placeholder: string,
  onChange: (v: UseComboboxStateChange<T>) => void,
  onOpenChange: (isOpen: boolean) => void,
  itemToString: (item: T) => string,
  inputRef?: React.RefObject<HTMLInputElement>,
  wrapperRef?: React.RefObject<HTMLFormElement>,
  optionProps: P,
  Option?: OptionType<T, P>,
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
    font-size: 1rem;
    padding: 1rem;
`

const DefaultOption: OptionType<any, any> = ({ children }) => <SearchItem>{children}</SearchItem>

export function Autocomplete<T = any, P = any> ({
    items,
    placeholder,
    onChange,
    onOpenChange,
    itemToString,
    disabled,
    inputRef,
    wrapperRef,
    optionProps,
    Option = DefaultOption,
}: Props<T, P>) {
    const {
      isOpen,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
      closeMenu,
    } = useCombobox<T>({
        items,
        itemToString: itemToString,
        onInputValueChange: onChange,
        onIsOpenChange: ({ isOpen }) => onOpenChange(isOpen),
    })

    const inputProps = getInputProps({
      ref: inputRef,
    })

    return (
        <form ref={wrapperRef} role="search" aria-label="Saved waypoints" onSubmit={(event) => event.preventDefault()}>
            <Wrapper {...getComboboxProps()}>
                <Input
                    placeholder={placeholder}
                    disabled={disabled}
                    aria-disabled={disabled}
                    aria-autocomplete="list"
                    {...inputProps}
                />
                <SearchList {...getMenuProps()}>
                    {isOpen && items.map((item, index) => (
                        <Option
                            key={`${index}-${itemToString(item)}`}
                            item={item}
                            isHighlighted={highlightedIndex  === index}
                            closeMenu={closeMenu}
                            {...optionProps}
                            {...getItemProps({item, index})}
                        >
                            {itemToString(item)}
                        </Option>
                    ))}
                </SearchList>
            </Wrapper>
        </form>
    )
}
