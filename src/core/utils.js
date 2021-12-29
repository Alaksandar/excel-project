// Pure functions
export function capitalize(str) {
    if(typeof str !== 'string') {
        return ''
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function range(start, end) {
    if(start > end) {
        [start, end] = [end, start]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index)
}

export  function matrix($current, $prev) {
    const current = $current.id(true)
    const prev = $prev.id(true)

    const rows = range(prev.row, current.row)
    const cols = range(prev.col, current.col)

    return cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`))
        return acc
    }, [])
}