import {clone} from "@core/utils";
import {defaultStyles, defaultTitle} from "@/constants";

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentStyles: defaultStyles,
    currentText: '',
    title: defaultTitle,
    openedDate: new Date().toJSON()
}

function normalize(state) {
    return {
        ...state,
        currentText: '',
        currentStyles: defaultStyles
    }
}

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}
