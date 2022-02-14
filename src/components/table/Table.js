import {ExcelComponent} from "@core/ExcelComponent"
import {$} from "@core/dom"
import {toEndLineCursor} from "@core/utils"
import {colsCount, createTable} from "@/components/table/table.template"
import {resizeHandler} from "@/components/table/table.resize"
import {changeCell, shouldResize, isCell, matrix} from "./table.functions"
import {TableSelection} from "@/components/table/TableSelection"
import * as action from "@/redux/actions"
import {defaultStyles} from "@/shared/constants"
import {parse} from "@core/parse"

export class Table extends ExcelComponent {
    static className = 'excel__table'
    static rowsCount = 25

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            subscribe: ['currentText'],
            ...options // Excel: componentOptions
        });
    }

    // component preparation and supporting functionality
    prepare() {
        this.selection = new TableSelection()
    }

    toHTML() {
        return createTable(Table.rowsCount, this.store.getState())
    }

    init() {
        super.init()

        const [lastRow, lastCol] = [Table.rowsCount - 1, colsCount - 1]
        this.lastCellId = {lastRow, lastCol}

        this.selectCell(this.$root.find(`[data-id="0:0"]`))

        this.$on('formula:input', value => {
            this.selection.current.attr('data-value', value)
            this.selection.current.text(parse(value))
            this.updateTextInStore(value)
        })

        this.$on('formula:submit', key => {
            let {row, col} = this.selection.current.id(true)
            if (key === 'Enter') {
                row = ++row <= lastRow ? row : lastRow
            } else {
                col = ++col <= lastCol ? col : lastCol
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
                event.preventDefault()
                const $next = this.$root.find(changeCell(id, event, this.lastCellId))
                this.selectCell($next)
            }
            if (event.key === 'Tab' && event.shiftKey) {
                event.preventDefault()
            }
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target).text())
        $(event.target).data.value = $(event.target).text()
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
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(action.changeStyles(styles))
        this.$emit('table:select', $cell)
        if ($cell.text()) toEndLineCursor($cell.node())
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
