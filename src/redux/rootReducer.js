import {TABLE_RESIZE} from "@/redux/types";

export function rootReducer(state, action) {
    let oldState
    let field
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            oldState = state[field] || {}
            oldState[action.data.id] = action.data.value
            return {...state, [field]: oldState}
        default: return state
    }
}