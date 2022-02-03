import {
    APPLY_STYLE, CHANGE_STYLES, CHANGE_TEXT,
    CHANGE_TITLE, TABLE_RESIZE, UPDATE_DATE
} from "@/redux/types";
import {defaultTitle} from "@/constants";

export function rootReducer(state, action) {
    let field
    let value
    switch (action.type) {

        case CHANGE_TITLE:
            value = state['tableName'] || defaultTitle
            return {...state, title: action.data}

        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            return {...state, [field]: getValue(state, action, field)}

        case CHANGE_TEXT:
            return {
                ...state,
                currentText: action.data.value,
                dataState: getValue(state, action, 'dataState')
            }

        case APPLY_STYLE:
            return {
                ...state,
                stylesState: getValue(state, action, 'stylesState'),
                currentStyles: {...state.currentStyles, ...action.data.value}}

        case CHANGE_STYLES:
            return {...state, currentStyles: action.data}

        case UPDATE_DATE:
            return {...state, openedDate: new Date().toJSON()}

        default: return state
    }
}

function getValue(state, action, field) {
    const value = state[field] || {}
    if(action.data.ids) {
        action.data.ids.forEach(id => {
            value[id] = {...value[id], ...action.data.value}
        })
        return value
    }
    value[action.data.id] = action.data.value
    return value
}