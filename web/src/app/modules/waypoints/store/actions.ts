import { SavedWaypoint, WaypointOrder } from '../../../../services/client'

export enum ActionMap {
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

export type Action = { type: ActionMap.GET_LIST }
    | { type: ActionMap.GET_LIST_SUCCESS, payload: SavedWaypoint[] }
    | { type: ActionMap.GET_LIST_FAILURE, payload: { message: string } }
    | { type: ActionMap.UPDATE_ORDER, payload: { next: string[] } }
    | { type: ActionMap.UPDATE_ORDER_SUCCESS, payload: WaypointOrder[] }
    | { type: ActionMap.UPDATE_ORDER_FAILURE, payload: { message: string, prev: string[] } }
    | { type: ActionMap.SAVE_ITEM }
    | { type: ActionMap.SAVE_ITEM_SUCCESS, payload: SavedWaypoint }
    | { type: ActionMap.SAVE_ITEM_FAILURE, payload: { message: string } }
