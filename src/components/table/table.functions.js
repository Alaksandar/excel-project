import {range} from "@core/utils";
import {$} from "@core/dom";

export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export  function matrix($current, $prev) {
    const current = $current.id(true)
    const prev = $prev.id(true)
    console.log(current, prev)

    const rows = range(prev.row, current.row)
    const cols = range(prev.col, current.col)

    return cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

export function changeCell({row, col}, $root, event, lastId) {
    const lastRow = lastId.row
    const lastCol = lastId.col

    switch (event.key) {
        case "Enter":
        case "ArrowDown":
            row++
            break;
        case "ArrowUp":
            row--
            break;
        case "Tab":
        case "ArrowRight":
            col++
            break;
        case "ArrowLeft":
            col--
            break;
    }

    row = row >= 0 ? row : 0
    col = col >= 0 ? col : 0
    row = row <= lastRow ? row : lastRow
    col = col <= lastCol ? col : lastCol

    return $root.find(`[data-id="${row}:${col}"]`)
}