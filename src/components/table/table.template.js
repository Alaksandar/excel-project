const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24


function getHeight(row, state) {
    const rowState = state.rowState ? state.rowState : ''
    const height = rowState[row]
        ? rowState[row] + 'px'
        : DEFAULT_HEIGHT + 'px'
    return height
}

function getWidth(index, state) {
    const colState = state.colState ? state.colState : ''
    const width = colState[index]
        ? colState[index] + 'px'
        : DEFAULT_WIDTH + 'px'
    return width
}

function toCell(row, state) {
    const height = getHeight(row, state)
    return function(_, index) {
        const width = getWidth(index, state)
        const style = (width !==  DEFAULT_WIDTH + 'px'
            || height !== DEFAULT_HEIGHT + 'px')
                ? `style="width:${width}; height:${height}"` : ''
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

function createRow(content, index = '', state) {
    const isResizable = (index || index === 0)
    const height = (isResizable && getHeight(index, state) !== '24px')
        ? getHeight(index, state) : ''

    return `
        <div class="table-row">
            <div class="row-info"
                ${isResizable 
                    ? `data-type="resizable"
                        data-row="${index}"
                        style="height:${height}">    
                    <span>${index + 1}</span>
                    <div class="row-resize" data-resize="row"></div>` 
                    : '>' 
                }
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
        .map(getWidthFrom(state))
        .map(toCol)
        .join('')
    rows.push(createRow(cols))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(row, state))
            .join('')
        rows.push(createRow(cells, row, state))
    }

    return rows.join('')
}