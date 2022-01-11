import {TABLE_RESIZE_COL} from "@/redux/types";
import {TABLE_RESIZE_ROW} from "@/redux/types";

export function rootReducer(state, action) {
    let oldState
    switch (action.type) {
        case TABLE_RESIZE_COL:
            oldState = state.colState || {}
            oldState[action.data.id] = action.data.value
            return {...state, colState: oldState}
        case TABLE_RESIZE_ROW:
            oldState = state.rowState || {}
            oldState[action.data.id] = action.data.value
            return {...state, rowState: oldState}
        default: return state
    }
}