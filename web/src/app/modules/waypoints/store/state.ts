import { SavedWaypoint } from '../../../../services/client'

export type State = {
    list: {
        loading: boolean,
        error: boolean,
        order: string[],
        data: {
          [key: string]: SavedWaypoint,
        },
    },
    item: {
        loading: boolean,
        error: boolean,
    },
}

export const initialState: State = {
    list: {
        loading: false,
        error: false,
        order: [],
        data: {},
    },
    item: {
        loading: false,
        error: false,
    },
}
