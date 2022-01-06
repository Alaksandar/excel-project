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

export function toEndLineCursor(node) {
    if (!(node instanceof HTMLElement)) {
        console.error('Node is not instanceof HTMLElement!')
        return
    }
    const range = document.createRange();
    range.selectNodeContents(node);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}