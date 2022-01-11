import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {storage, toEndLineCursor} from "@core/utils";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize"
import {changeCell, shouldResize, isCell, matrix} from "./table.functions"
import {TableSelection} from "@/components/table/TableSelection";
import * as action from "@/redux/actions"
import {store} from "core-js/internals/reflect-metadata";


export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options // Excel: componentOptions
        });
    }

    // component preparation and supporting functionality
    prepare() {
        this.selection = new TableSelection()
    }

    toHTML() {
        return createTable(15, this.store.getState())
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

        // this.$subscribe(state => {
        //     console.log('TableState', state)
        //     localStorage.setItem('state', JSON.stringify(state.colState))
        // })
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
            this.resizeTable(event)

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

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        if ($cell.text()) {
            toEndLineCursor($cell.node())
            this.$dispatch('TEST')
        }
    }

    async resizeTable(event) {
        try {
            const dataType = await resizeHandler(this.$root, event)
            const {type, ...data} = dataType
            if (type === 'col') {
                this.$dispatch(action.tableResizeCol(data))
            } else {
                this.$dispatch(action.tableResizeRow(data))
            }
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }
}