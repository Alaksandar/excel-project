import {ExcelComponent} from '@core/ExcelComponent'
import {$} from "@core/dom"

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        });
    }

    toHTML() {
        return `
            <div class="formula-info"><span>fx</span></div>
            <div id="formula" class="formula-input" contenteditable spellcheck="false"></div>
        `
    }

    init() {
        super.init();
        this.$input = this.$root.find('#formula')

        this.$on('table:select', $cell => {
            this.$input.text($cell.data.value)
        })

        this.$on('table:input', value => {
            this.$input.text(value)
        })
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (!keys.includes(event.key)) return
        event.preventDefault()
        this.$emit('formula:submit', event.key)
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }
}
