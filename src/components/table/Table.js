import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize"
import {shouldResize} from "@/components/table/table.functions"
import {isCell} from "@/components/table/table.functions"
import {TableSelection} from "@/components/table/TableSelection";
import {matrix, range} from "@core/utils";

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

        } else if(isCell(event)) {
            const target = $(event.target)

            if(event.shiftKey) {
                const $cells = matrix(target, this.selection.prev)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells, target)

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