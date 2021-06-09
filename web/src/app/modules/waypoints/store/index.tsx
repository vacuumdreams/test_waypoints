import React, { createContext, useReducer, useContext, useCallback } from 'react'

import { WaypointService, Waypoint, Id } from  '../../../../services/client'
import { getUser } from  '../../../../services/storage/user'

import { initialState, State } from './state'
import { ActionMap } from './actions'
import { reducer } from './reducer'

type ContextType = {
    state: State,
    getWaypoints: () => Promise<void>,
    updateWaypointsOrder: (order: string[]) => Promise<void>,
    saveWaypoint: (waypoint: Waypoint) => Promise<void>,
}

export const WaypointsContext = createContext({} as ContextType)

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
