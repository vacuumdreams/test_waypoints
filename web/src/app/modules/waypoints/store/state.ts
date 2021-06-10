import { SavedWaypoint } from '../../../../services/client'

export type IndexedWaypoints = {
    [key: string]: SavedWaypoint,
}

export type State = {
    list: {
        loading: boolean,
        error: boolean,
        order: string[],
        data: IndexedWaypoints,
    },
    item: {
        loading: boolean,
        error: boolean,
    },
    itemDelete: {
        loading: boolean,
        error: boolean,
    },
    order: {
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
    itemDelete: {
        loading: false,
        error: false,
    },
    order: {
        loading: false,
        error: false,
    },
}
