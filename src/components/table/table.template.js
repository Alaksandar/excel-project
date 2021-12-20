const CODES = {
    A: 65,
    Z: 90
}

function toCell(selected = '') {
    return `<div class="cell ${selected}" contenteditable></div>`
}

function toCol(col) {
    return `<div class="column-info">${col}</div>`
}

function createRow(content, num = '') {
    return `
        <div class="table-row">
            <div class="row-info">${num}</div>
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
                return toCell('selected')
            }
            return toCell()
        })
        .join('')
    rows.push(createRow(selectedCellRow, 1))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell)
            .join('')
        rows.push(createRow(cells, i + 2))
    }

    return rows.join('')
}