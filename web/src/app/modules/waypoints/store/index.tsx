import React, { createContext, useReducer, useContext, useCallback } from 'react'
import { compose, map, indexBy, sortBy, prop } from 'ramda'
import produce from 'immer'
import { WaypointService, Waypoint, SavedWaypoint } from  '../../../../services/client'
import { getUser } from  '../../../../services/storage/user'

enum ActionMap {
    GET_LIST = 'getList',
    GET_LIST_SUCCESS = 'getListSuccess',
    GET_LIST_FAILURE = 'getListFailure',
    UPDATE_ORDER = 'updateOrder',
    UPDATE_ORDER_SUCCESS = 'updateOrderSuccess',
    UPDATE_ORDER_FAILURE = 'updateOrderFailure',
    SAVE_ITEM = 'saveItem',
    SAVE_ITEM_SUCCESS = 'saveItemSuccess',
    SAVE_ITEM_FAILURE = 'saveItemFailure',
}

type State = {
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

type Action = { type: ActionMap.GET_LIST }
    | { type: ActionMap.GET_LIST_SUCCESS, payload: SavedWaypoint[] }
    | { type: ActionMap.GET_LIST_FAILURE, payload: { message: string } }
    | { type: ActionMap.UPDATE_ORDER, payload: { next: string[] } }
    | { type: ActionMap.UPDATE_ORDER_SUCCESS }
    | { type: ActionMap.UPDATE_ORDER_FAILURE, payload: { message: string, prev: string[] } }
    | { type: ActionMap.SAVE_ITEM }
    | { type: ActionMap.SAVE_ITEM_SUCCESS, payload: SavedWaypoint }
    | { type: ActionMap.SAVE_ITEM_FAILURE, payload: { message: string } }

type ContextType = {
    state: State,
    getWaypoints: () => void,
    updateWaypointsOrder: (order: string[]) => void,
    saveWaypoint: (waypoint: Waypoint) => void,
}

const initialState: State = {
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

const getOrder = compose(
    map(prop('id')),
    sortBy(prop('id')),
)

const getData = (waypoints: SavedWaypoint[]) => indexBy(prop('id'), waypoints)

export const WaypointsContext = createContext({} as ContextType)

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
            nextState.list.order = getOrder(action.payload)
            nextState.list.data = getData(action.payload)
        })
    }
    case ActionMap.GET_LIST_FAILURE: {
        return produce(state, nextState => {
            nextState.list.loading = true
            nextState.list.error = action.payload.message
        })
    }

    case ActionMap.UPDATE_ORDER: {
        return produce(state, nextState => {
            nextState.list.loading = true
            nextState.list.error = null
            nextState.list.order = action.payload.next
        })
    }
    case ActionMap.UPDATE_ORDER_SUCCESS: {
        return produce(state, nextState => {
            nextState.list.loading = false
        })
    }
    case ActionMap.UPDATE_ORDER_FAILURE: {
        return produce(state, nextState => {
            nextState.list.loading = false
            nextState.list.error = action.payload.message
            nextState.list.order = action.payload.prev
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
            nextState.list.order.push(action.payload.id)
            nextState.list.data = {
              ...state.list.data,
              [action.payload.id]: action.payload,
            }
        })
    }
    case ActionMap.SAVE_ITEM_FAILURE: {
        return produce(state, nextState => {
            nextState.item.loading = false
            nextState.item.error = action.payload.message
        })
    }

    default:
      throw new Error();
  }
}

export const WaypointsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const user = getUser()

    const getWaypoints = useCallback(async () => {
        dispatch({ type: ActionMap.GET_LIST })
        return WaypointService.list({ user })
            .then(waypoints => {
                dispatch({ type: ActionMap.GET_LIST_SUCCESS, payload: waypoints })
            })
            .catch(error => {
                dispatch({ type: ActionMap.GET_LIST_FAILURE, payload: error.message })
            })
    }, [])

    const updateWaypointsOrder = useCallback(async (newOrder: string[]) => {
        const startingOrder = state.list.order
        dispatch({ type: ActionMap.UPDATE_ORDER, payload: { next: newOrder } })
        return WaypointService.updateOrder({ user, requestBody: newOrder.map((id, i) => ({ id, order: i })) })
            .then(() => {
                dispatch({ type: ActionMap.UPDATE_ORDER_SUCCESS })
            })
            .catch(error => {
                dispatch({ type: ActionMap.UPDATE_ORDER_FAILURE, payload: { prev: startingOrder, message: error.message } })
            })
    }, [])

    const saveWaypoint = useCallback(async (waypoint: Waypoint) => {
        dispatch({ type: ActionMap.SAVE_ITEM })
        return WaypointService.create({ user, requestBody: waypoint })
            .then(waypoint => {
                dispatch({ type: ActionMap.SAVE_ITEM_SUCCESS, payload: waypoint })
            })
            .catch(error => {
                dispatch({ type: ActionMap.SAVE_ITEM_FAILURE, payload: error.message })
            })
    }, [])

    return (
        <WaypointsContext.Provider value={{ state, getWaypoints, updateWaypointsOrder, saveWaypoint }}>
            {children}
        </WaypointsContext.Provider>
    )
}

export const useWaypoints = () => {
    return useContext(WaypointsContext)
}
