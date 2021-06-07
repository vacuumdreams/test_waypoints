import { path } from 'ramda'
import { useEffect } from 'react'

export const useClickAway = (ref: React.RefObject<HTMLElement>, onClickAway: () => void) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(path(['target'], event))) {
                onClickAway()
            }
        }

        window.addEventListener("mousedown", handleClickOutside)
        return () => {
            window.removeEventListener("mousedown", handleClickOutside)
        };
    }, [ref]);
}
