import {storage} from "@core/utils";
import {defaultStyles, defaultTableName} from "@/constants";

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentStyles: defaultStyles,
    currentText: '',
    tableName: defaultTableName

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