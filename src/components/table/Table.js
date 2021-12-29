import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize"
import {shouldResize} from "@/components/table/table.functions"
import {isCell} from "@/components/table/table.functions"
import {TableSelection} from "@/components/table/TableSelection";

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }

    onMousedown(event) {

        if(shouldResize(event)) {
            resizeHandler(this.$root, event)
        }

        if(isCell(event)) {
            const target = $(event.target)

            if(event.shiftKey) {
                const current = target.id(true)
                const prev = this.selection.prev.id(true)
                const rows = range(prev.row, current.row)
                const cols = range(prev.col, current.col)

                const ids = cols.reduce((acc, col) => {
                    rows.forEach(row => acc.push(`${row}:${col}`))
                    return acc
                }, [])
                const $cells = ids.map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells, target.id())

            } else {
                this.selection.select(target)
            }
        }
    }

    // component preparation and supporting functionality
    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        this.$cell = this.$root.find(`[data-id="0:0"]`)
        this.selection.select(this.$cell)
    }

    toHTML() {
        return createTable(15)
    }
}


function range(start, end) {
    if(start > end) {
        [start, end] = [end, start]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index)
}