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
            this.selection.select($(event.target))
            this.$cell = $(event.target)
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