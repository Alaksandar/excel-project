import {storage} from "@core/utils";
import {defaultStyles} from "@/constants";

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles
}

function normalize(state) {
    return {
        ...state,
        currentText: '',
        currentStyles: defaultStyles
    }
}

export const initialState = storage('excel-state')
    ? normalize(storage('excel-state'))
    : defaultState