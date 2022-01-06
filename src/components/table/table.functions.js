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

export function changeCell({row, col}, event, lastId) {
    switch (event.key) {
        case "Enter":
        case "ArrowDown":
            row = ++row <= lastId.row ? row : lastId.row
            break;
        case "ArrowUp":
            row = --row >= 0 ? row : 0
            break;
        case "Tab":
        case "ArrowRight":
            col = ++col <= lastId.col ? col : lastId.col
            break;
        case "ArrowLeft":
            col = --col >= 0 ? col : 0
            break;
    }
    return `[data-id="${row}:${col}"]`
}