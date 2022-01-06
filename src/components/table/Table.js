import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {toEndLineCursor} from "@core/utils";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize"
import {changeCell, shouldResize, isCell, matrix} from "./table.functions"
import {TableSelection} from "@/components/table/TableSelection";


export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options // Excel: {emitter: this.emitter}
        });
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        if ($cell.text()) {
            toEndLineCursor($cell.node())
            console.log($cell)
        }
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
            const id = this.selection.current.id(true)
            if(keys.includes(event.key) && !event.shiftKey) {
                event.preventDefault()
                const $next = this.$root.find(changeCell(id, event, this.lastId))
                this.selectCell($next)
            }
            if (event.key === 'Tab' && event.shiftKey) {
                event.preventDefault()
            }
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }

    onMousedown(event) {
        if(shouldResize(event)) {
            resizeHandler(this.$root, event)

        } else if(isCell(event)) {
            if(event.shiftKey) {
                const $cells = matrix($(event.target), this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($(event.target))
            }
        }
    }

    // component preparation and supporting functionality
    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const allCells = this.$root.findAll(`[data-type="cell"]`)
        this.lastId = $(allCells[allCells.length - 1]).id(true)

        this.selectCell(this.$root.find(`[data-id="0:0"]`))

        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })

        this.$on('formula:submit', key => {
            let {row, col} = this.selection.current.id(true)
            if (key === 'Enter') {
                row = ++row <= this.lastId.row ? row : this.lastId.row
            } else {
                col = ++col <= this.lastId.col ? col : this.lastId.col
            }
            this.selectCell(this.$root.find(`[data-id="${row}:${col}"]`))
        })
    }

    toHTML() {
        return createTable(15)
    }
}