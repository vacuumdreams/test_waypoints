import React, { createContext, useReducer, useContext, useCallback } from 'react'
import produce from 'immer'
import { insertAll, remove } from 'ramda'
import { WaypointService, Waypoint } from  '../../../../services/client'

enum ActionMap {
    GET_LIST = 'getList',
    GET_LIST_SUCCESS = 'getListSuccess',
    GET_LIST_FAILURE = 'getListFailure',
    SAVE_ITEM = 'saveItem',
    SAVE_ITEM_SUCCESS = 'saveItemSuccess',
    SAVE_ITEM_FAILURE = 'saveItemFailure',
}

type State = {
    list: {
        loading: boolean,
        error: null | string,
        page: number,
        data: Waypoint[],
    },
    item: {
        loading: boolean,
        error: null | string,
    },
}

type Action = { type: ActionMap.GET_LIST }
    | { type: ActionMap.GET_LIST_SUCCESS, payload: { page: number, size: number, data: Waypoint[] } }
    | { type: ActionMap.GET_LIST_FAILURE, payload: { page: number, data: string } }
    | { type: ActionMap.SAVE_ITEM }
    | { type: ActionMap.SAVE_ITEM_SUCCESS, payload: { data: Waypoint } }
    | { type: ActionMap.SAVE_ITEM_FAILURE, payload: { data: string } }

const initialState: State = {
    list: {
        loading: false,
        error: null,
        page: 0,
        data: [],
    },
    item: {
        loading: false,
        error: null,
    },
}

type ListGet = (query: { page: number, size?: number }) => Promise<Waypoint[]>
type ItemSave = (waypoint: Waypoint) => Promise<Waypoint>
const noop = (m: any) => m

export const WaypointsContext = createContext({
  state: initialState,
  getWaypoints: noop as ListGet,
  saveWaypoint: noop as ItemSave,
})

const addReplaceItems = (items: Waypoint[], newItems: Waypoint[], page: number, size: number) => {
    const start = (page - 1) * size
    return insertAll(start, newItems, remove(start, newItems.length, items))
}

function reducer (state: State, action: Action) {
  switch (action.type) {
    case ActionMap.GET_LIST: {
        return produce(state, nextState => {
            nextState.list.loading = true
            nextState.list.error = null
        })
    }
    case ActionMap.GET_LIST_SUCCESS: {
        return produce(state, nextState => {
            nextState.list.loading = false
            nextState.list.page = action.payload.page
            nextState.list.data = addReplaceItems(state.list.data, action.payload.data, action.payload.page, action.payload.size)
        })
    }
    case ActionMap.GET_LIST_FAILURE: {
        return produce(state, nextState => {
            nextState.list.loading = true
            nextState.list.error = action.payload.data
        })
    }
    case ActionMap.SAVE_ITEM: {
        return produce(state, nextState => {
            nextState.item.loading = true
            nextState.item.error = null
        })
    }
    case ActionMap.SAVE_ITEM_SUCCESS: {
        return produce(state, nextState => {
            nextState.item.loading = false
            nextState.list.data = [action.payload.data, ...state.list.data]
        })
    }
    case ActionMap.SAVE_ITEM_FAILURE: {
        return produce(state, nextState => {
            nextState.item.loading = false
            nextState.item.error = action.payload.data
        })
    }

    default:
      throw new Error();
  }
}

export const WaypointsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const getWaypoints = useCallback(async ({ page, size = 20 }) => {
        dispatch({ type: ActionMap.GET_LIST })
        return WaypointService.list({ page, size })
            .then(waypoints => {
              dispatch({ type: ActionMap.GET_LIST_SUCCESS, payload: { page, size, data: waypoints } })
              return waypoints
            })
            .catch(error => {
              dispatch({ type: ActionMap.GET_LIST_FAILURE, payload: { page, data: error.message} })
              return state.list.data
            })
    }, [])

    const saveWaypoint = useCallback(async (waypoint: Waypoint): Promise<Waypoint> => {
        dispatch({ type: ActionMap.SAVE_ITEM })
        return WaypointService.create({ requestBody: waypoint })
            .then(waypoint => {
              dispatch({ type: ActionMap.SAVE_ITEM_SUCCESS, payload: { data: waypoint } })
              return waypoint
            })
            .catch(error => {
              dispatch({ type: ActionMap.SAVE_ITEM_FAILURE, payload: { data: error.message } })
              return null
            })
    }, [])

    return (
        <WaypointsContext.Provider value={{ state, getWaypoints, saveWaypoint }}>
            {children}
        </WaypointsContext.Provider>
    )
}

export const useWaypoints = () => {
    return useContext(WaypointsContext)
}
