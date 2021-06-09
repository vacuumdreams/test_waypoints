import produce from 'immer'
import { compose, map, prop, indexBy, sortBy, toString } from 'ramda'

import { SavedWaypoint } from '../../../../services/client'
import { Action, ActionMap } from  './actions'
import { State } from  './state'

const getOrder = compose(
    map(compose(toString, prop('id'))),
    sortBy(prop('id')),
)

const getData = (waypoints: SavedWaypoint[]) => indexBy(prop('id'), waypoints)

export function reducer (state: State, action: Action) {
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
            nextState.list.loading = false
            nextState.list.error = true
        })
    }

    case ActionMap.UPDATE_ORDER: {
        return produce(state, nextState => {
            nextState.list.loading = true
            nextState.list.error = false
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
            nextState.list.error = true
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

    default:
      throw new Error();
  }
}
