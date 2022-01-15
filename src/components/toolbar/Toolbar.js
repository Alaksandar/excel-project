import {ExcelComponent} from "@core/ExcelComponent";
import {createToolbar} from "@/components/toolbar/toolbar.template";
import {$} from "@core/dom";

export class Toolbar extends ExcelComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            ...options
        });

    }

    onClick(event) {
        const target = $(event.target)
        if (target.data.type === 'button') {
            const value = target.data.value
            this.$root.findAll(`[data-value='${value}']`).forEach(el => {
                $(el).toggleClass('active')
            })
        }
    }

    toHTML() {
        return createToolbar()
    }
}