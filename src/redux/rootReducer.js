import {TABLE_RESIZE} from "@/redux/types";

export function rootReducer(state, action) {
    let oldState
    switch (action.type) {
        case TABLE_RESIZE:
            oldState = state.colState || {}
            oldState[action.data.id] = action.data.value
            return {...state, colState: oldState}
        default: return state
    }
}