import produce from 'immer'
import { useReducer } from 'react'
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
        data: Waypoint[],
    },
    item: {
        loading: boolean,
        error: null | string,
    },
}

type Action = { type: ActionMap.GET_LIST }
    | { type: ActionMap.GET_LIST_SUCCESS, payload: Waypoint[] }
    | { type: ActionMap.GET_LIST_FAILURE, payload: string }
    | { type: ActionMap.SAVE_ITEM }
    | { type: ActionMap.SAVE_ITEM_SUCCESS, payload: Waypoint }
    | { type: ActionMap.SAVE_ITEM_FAILURE, payload: string }

const initialState: State = {
    list: {
        loading: false,
        error: null,
        data: [],
    },
    item: {
        loading: false,
        error: null,
    },
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
            nextState.list.data = action.payload
        })
    }
    case ActionMap.GET_LIST_FAILURE: {
        return produce(state, nextState => {
            nextState.list.loading = true
            nextState.list.error = action.payload
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
            nextState.list.data = [action.payload, ...state.list.data]
        })
    }
    case ActionMap.SAVE_ITEM_FAILURE: {
        return produce(state, nextState => {
            nextState.item.loading = false
            nextState.item.error = action.payload
        })
    }

    default:
      throw new Error();
  }
}

export const useWaypoints = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const getWaypoints = async () => {
        dispatch({ type: ActionMap.GET_LIST })
        return WaypointService.list()
            .then(waypoints => {
              dispatch({ type: ActionMap.GET_LIST_SUCCESS, payload: waypoints })
              return waypoints
            })
            .catch(error => {
              dispatch({ type: ActionMap.GET_LIST_FAILURE, payload: error.message })
              return state.list.data
            })
    }

    const saveWaypoint = async (waypoint: Waypoint): Promise<Waypoint> => {
        dispatch({ type: ActionMap.SAVE_ITEM })
        return WaypointService.create(waypoint)
            .then(waypoint => {
              dispatch({ type: ActionMap.SAVE_ITEM_SUCCESS, payload: waypoint })
              return waypoint
            })
            .catch(error => {
              dispatch({ type: ActionMap.SAVE_ITEM_FAILURE, payload: error.message })
              return null
            })
    }

    return {
        state,
        getWaypoints,
        saveWaypoint,
    }
}
