const CODES = {
    A: 65,
    Z: 90
}

function toCell(index, selected = '', num) {
    return `<div 
        class="cell ${selected}" 
        data-row="${num}"
        data-column="${toChar('', index)}" 
        contenteditable>
    </div>`
}

function toCol(col, i) {
    // console.log(i)
    return `
        <div class="column-info" data-type="resizable" data-column="${col}">
            <span>${col}</span>
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(content, num = '') {
    const rowResize = num
        ? `<div class="row-resize" data-resize="row"></div>`
        : ''

    return `
        <div class="table-row">
            <div class="row-info" data-type="resizable" data-row="${num}">
                <span>${num}</span>
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

    const selectedCellRow = new Array(colsCount)
        .fill('')
        .map((e, i) => {
            if(i === 0){
                return toCell(i, 'selected', 1)
            }
            return toCell(i, '', 1)
        })
        .join('')
    rows.push(createRow(selectedCellRow, 1))

    for (let i = 1; i < rowsCount; i++) {
        const num = i+1
        const cells = new Array(colsCount)
            .fill('')
            .map((e, i) => {
                return toCell(i, '', num)
            })
            .join('')

        rows.push(createRow(cells, i + 1))
    }

    return rows.join('')
}