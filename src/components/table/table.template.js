const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120

function toCell(row) {
    return function({col, index, width}) {
        const colWidth = width !==  DEFAULT_WIDTH + 'px'
            ? `style="width:${width};"` : ''
        return `
            <div 
                class="cell"
                ${colWidth}
                data-type="cell"
                data-row="${row+1}"
                data-col="${index}" 
                data-id="${row}:${index}"
                contenteditable
            ></div>
        `
    }
}

function toCol({col, index, width}) {
    const colWidth = width !==  DEFAULT_WIDTH + 'px'
        ? `style="width:${width};"` : ''

    return `
        <div 
            class="column-info"
            ${colWidth}
            data-type="resizable" 
            data-col="${index}"
        >
            <span>${col}</span>
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(content, i = '') {
    const rowResize = i
        ? `<div class="row-resize" data-resize="row"></div>`
        : ''

    return `
        <div class="table-row">
            <div class="row-info" data-type="resizable" data-row="${i}">
                ${i ? `<span>${i}</span>` : ''}
                ${rowResize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 10, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    function getWidthFrom(state) {
        state = state.colState ? state.colState : ''
        return function (col, index) {
            const width = state[index]
                ? state[index] + 'px'
                : DEFAULT_WIDTH + 'px'
            return {col, index, width}
        }
    }



    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(getWidthFrom(state))
        .map(toCol)
        .join('')
    rows.push(createRow(cols))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(getWidthFrom(state))
            .map(toCell(row)) // or: .map((_, col) => toCell(row, col))
            .join('')
        rows.push(createRow(cells, row + 1))
    }

    return rows.join('')
}