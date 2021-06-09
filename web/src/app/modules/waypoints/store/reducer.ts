import produce from 'immer'
import { compose, map, prop, indexBy, sortBy, toString } from 'ramda'

import { SavedWaypoint } from '../../../../services/client'
import { Action, ActionMap } from  './actions'
import { State } from  './state'

const getOrder = compose(
    map(compose(toString, prop('id'))),
    sortBy(prop('order')),
)

const getData = (waypoints: SavedWaypoint[]) => indexBy(prop('id'), waypoints)

const pruneErrors = (state: State) => {
    state.list.error = false
    state.item.error = false
    state.order.error = false
    state.itemDelete.error = false
}

export function reducer (state: State, action: Action) {
  switch (action.type) {
    case ActionMap.GET_LIST: {
        return produce(state, nextState => {
            nextState.list.loading = true
            pruneErrors(nextState)
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
            nextState.list.loading = false
            nextState.list.error = true
        })
    }

    case ActionMap.UPDATE_ORDER: {
        return produce(state, nextState => {
            nextState.order.loading = true
            pruneErrors(nextState)
            nextState.list.order = action.payload.next
        })
    }
    case ActionMap.UPDATE_ORDER_SUCCESS: {
        return produce(state, nextState => {
            nextState.order.loading = false
            nextState.list.order = getOrder(action.payload)
        })
    }
    case ActionMap.UPDATE_ORDER_FAILURE: {
        return produce(state, nextState => {
            nextState.order.loading = false
            nextState.order.error = true
            nextState.list.order = action.payload.prev
        })
    }

    case ActionMap.SAVE_ITEM: {
        return produce(state, nextState => {
            nextState.item.loading = true
            pruneErrors(nextState)
        })
    }
    case ActionMap.SAVE_ITEM_SUCCESS: {
        return produce(state, nextState => {
            nextState.item.loading = false
            nextState.list.order.push(action.payload.id.toString())
            nextState.list.data = {
              ...state.list.data,
              [action.payload.id]: action.payload,
            }
        })
    }
    case ActionMap.SAVE_ITEM_FAILURE: {
        return produce(state, nextState => {
            nextState.item.loading = false
            nextState.item.error = true
        })
    }

    case ActionMap.DELETE_ITEM: {
        return produce(state, nextState => {
            nextState.itemDelete.loading = true
            pruneErrors(nextState)
        })
    }
    case ActionMap.DELETE_ITEM_SUCCESS: {
        return produce(state, nextState => {
            nextState.itemDelete.loading = false
            nextState.list.order.splice(nextState.list.order.indexOf(action.payload.id.toString()), 1)
            delete nextState.list.data[action.payload.id]
        })
    }
    case ActionMap.DELETE_ITEM_FAILURE: {
        return produce(state, nextState => {
            nextState.itemDelete.loading = false
            nextState.itemDelete.error = true
        })
    }

    default:
      throw new Error();
  }
}
