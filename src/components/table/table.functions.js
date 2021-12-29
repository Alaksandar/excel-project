import {$} from "@core/dom";
import {TableSelection} from "@/components/table/TableSelection";


export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export function getCell($cell, event) {
    const selection = new TableSelection()
    selection.select($(event.target))
    return $(event.target)
}