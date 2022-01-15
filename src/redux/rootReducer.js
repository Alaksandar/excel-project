import {CHANGE_TEXT, TABLE_RESIZE} from "@/redux/types";

export function rootReducer(state, action) {
    let oldState
    let field
    console.log('action', action)
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            return {...state, [field]: getNewState(state, action, field)}
        case CHANGE_TEXT:
            return {...state, currentText: action.data.value, dataState: getNewState(state, action, 'dataState')}

        default: return state
    }
}

function getNewState(state, action, field) {
    const oldState = state[field] || {}
    oldState[action.data.id] = action.data.value
    return oldState
}