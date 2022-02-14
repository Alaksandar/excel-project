import {range} from "@core/utils";

export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export  function matrix($target, $current) {
    const target = $target.id(true)
    const current = $current.id(true)

    const rows = range(current.row, target.row)
    const cols = range(current.col, target.col)

    return cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

export function changeCell({row, col}, event, lastCellId) {
    const {lastRow, lastCol} = lastCellId
    switch (event.key) {
        case "Enter":
        case "ArrowDown":
            row = ++row <= lastRow ? row : lastRow
            break;
        case "ArrowUp":
            row = --row >= 0 ? row : 0
            break;
        case "Tab":
        case "ArrowRight":
            col = ++col <= lastCol ? col : lastCol
            break;
        case "ArrowLeft":
            col = --col >= 0 ? col : 0
            break;
    }
    return `[data-id="${row}:${col}"]`
}
