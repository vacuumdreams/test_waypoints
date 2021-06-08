import { SavedWaypoint } from '../../../../services/client'

export type State = {
    list: {
        loading: boolean,
        error: null | string,
        order: string[],
        data: {
          [key: string]: SavedWaypoint,
        },
    },
    item: {
        loading: boolean,
        error: null | string,
    },
}

export const initialState: State = {
    list: {
        loading: false,
        error: null,
        order: [],
        data: {},
    },
    item: {
        loading: false,
        error: null,
    },
}
