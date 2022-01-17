import {APPLY_STYLE, CHANGE_STYLES, CHANGE_TEXT, TABLE_RESIZE} from "@/redux/types";

export function rootReducer(state, action) {
    let field
    let oldState
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            return {...state, [field]: getOldState(state, action, field)}
        case CHANGE_TEXT:
            field = 'dataState'
            return {
                ...state,
                currentText: action.data.value,
                [field]: getOldState(state, action, field)
            }
        case APPLY_STYLE:
            field = 'stylesState'
            oldState = state[field] || {}
            action.data.ids.forEach(id => {
                oldState[id] = {...oldState[id], ...action.data.value}
            })
            return {...state,
                [field]: oldState,
                currentStyles: {...state.currentStyles, ...action.data.value}}
        case CHANGE_STYLES:
            return {...state, currentStyles: action.data}
        default: return state
    }
}

function getOldState(state, action, field) {
    const oldState = state[field] || {}
    oldState[action.data.id] = action.data.value
    return oldState
}