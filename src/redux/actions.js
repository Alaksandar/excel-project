import {TABLE_RESIZE_COL} from "@/redux/types";
import {TABLE_RESIZE_ROW} from "@/redux/types";

// Action Creator:
export function tableResizeCol(data) {
    console.log('data', data)
    return {
        type: TABLE_RESIZE_COL,
        data
    }
}

export function tableResizeRow(data) {
    return {
        type: TABLE_RESIZE_ROW,
        data
    }
}