import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize"
import {changeCell, shouldResize, isCell, matrix} from "./table.functions"
import {TableSelection} from "@/components/table/TableSelection";


export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown']
        });
        this.rowsCount = 15
    }

    onKeydown(event) {
        const  keys = [
            "Enter",
            "Tab",
            "ArrowDown",
            "ArrowUp",
            "ArrowRight",
            "ArrowLeft"
        ]
        if(isCell(event)) {
            const id = this.selection.prev.id(true)
            if(keys.includes(event.key)) {
                event.preventDefault()
                this.selection.select(changeCell(id, this.$root, event, this.lastId))

            }
            // if(keys.includes(key) && event.shiftKey) {
            //     const $nextCell = this.selection.select(this.$root.find(shiftCell(row, col, this.$root, event)))
            //     console.log("shift")
            //
            // }
        }
    }

    onMousedown(event) {
        if(shouldResize(event)) {
            resizeHandler(this.$root, event)

        } else if(isCell(event)) {
            if(event.shiftKey) {
                const $cells = matrix($(event.target), this.selection.prev)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($(event.target))
            }
        }
    }

    // component preparation and supporting functionality
    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        this.selection.select(this.$root.find(`[data-id="0:0"]`))
        const allCells = this.$root.findAll(`[data-type="cell"]`)
        this.lastId = $(allCells[allCells.length - 1]).id(true)
    }

    toHTML() {
        return createTable(this.rowsCount)
    }
}