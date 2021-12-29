const CODES = {
    A: 65,
    Z: 90
}
function toCell(row) {          //  or:  function toCell(row, col)
    return function(_, col) {   //
        return `
            <div 
                class="cell" 
                data-type="cell"
                data-row="${row+1}"
                data-column="${toChar('', col)}" 
                data-id="${row}:${col}"
                data-charCoords="${row+1}:${toChar('', col)}"
                contenteditable
            ></div>
        `
    }
}

function toCol(col) {
    return `
        <div class="column-info" data-type="resizable" data-column="${col}">
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

export function createTable(rowsCount = 10) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toCol)
        .join('')
    rows.push(createRow(cols))

    // const selectedCellRow = new Array(colsCount)
    //     .fill('')
    //     .map((e, i) => {
    //         if(i === 0){
    //             return toCell(i, 'selected', 1)
    //         }
    //         return toCell(i, '', 1)
    //     })
    //     .join('')
    // rows.push(createRow(selectedCellRow, 1))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(row)) // or: .map((_, col) => toCell(row, col))
            .join('')
        rows.push(createRow(cells, row + 1))
    }

    return rows.join('')
}