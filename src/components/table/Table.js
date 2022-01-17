import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {toEndLineCursor} from "@core/utils";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize"
import {changeCell, shouldResize, isCell, matrix} from "./table.functions"
import {TableSelection} from "@/components/table/TableSelection";
import * as action from "@/redux/actions"
import {defaultStyles} from "@/constants";

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
        this.updateTextInStore(this.selection.current.text())

        this.$on('formula:input', text => {
            this.selection.current.text(text)
            this.updateTextInStore(text)
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

        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value)
            this.$dispatch(action.applyStyle({
                value,
                ids: this.selection.groupIds
            }))
        })
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
                // console.log('key', event.key)
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
        // this.$emit('table:input', $(event.target))
        this.updateTextInStore($(event.target).text())
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
        if ($cell.text()) toEndLineCursor($cell.node())
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(action.changeStyles(styles))
    }

    updateTextInStore(value) {
        this.$dispatch(action.changeText({
            id: this.selection.current.id(),
            value
        }))
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(action.tableResize(data))
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }
}