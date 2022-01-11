const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24


function getHeight(row, state) {
    console.log(state)
    return (state[row] || DEFAULT_HEIGHT) + 'px'
}

function getWidth(index, state) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function toCell(row, state) {
    return function(_, index) {
        const width = getWidth(index, state)
        const style = width !==  DEFAULT_WIDTH + 'px'
                ? `style="width:${width};` : ''
        return `
            <div 
                class="cell"
                ${style}
                data-type="cell"
                data-row="${row}"
                data-col="${index}" 
                data-id="${row}:${index}"
                contenteditable
            ></div>
        `
    }
}

function toCol({col, index, width}) {
    const style = width !==  DEFAULT_WIDTH + 'px'
        ? `style="width:${width};"` : ''

    return `
        <div 
            class="column-info"
            ${style}
            data-type="resizable" 
            data-col="${index}"
        >
            <span>${col}</span>
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(content, state, index = '') {
    const isResizable = (index || index === 0)
    const height = getHeight(index, state)
    console.log(height)

    return `
        <div 
            class="table-row" 
            ${isResizable ? `
                style="height:${height}" 
                data-type="resizable" 
                data-row="${index}"` : ''}
        >
            <div class="row-info">    
                ${isResizable ? `
                    <span>${index + 1}</span>
                    <div class="row-resize" data-resize="row"></div>` : ''}
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
        return function (col, index) {
            const width = getWidth(index, state)
            return {col, index, width}
        }
    }

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(getWidthFrom(state.colState))
        .map(toCol)
        .join('')
    rows.push(createRow(cols, {}))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(row, state.colState))
            .join('')
        rows.push(createRow(cells, state.rowState, row))
    }

    return rows.join('')
}