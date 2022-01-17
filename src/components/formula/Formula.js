import {ExcelComponent} from '@core/ExcelComponent';
import {$} from "@core/dom";

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
            this.$input.text($cell.text())
        })

        // this.$on('table:input', $cell => {
        //     this.$input.text($cell.text())
        // })
        // this.$subscribe(state => {
        //     console.log('FormulaState', state.currentText)
        //     this.$input.text(state.currentText)
        // })
    }

    storeChanged({currentText}) {
        this.$input.text(currentText)
    }

    onKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault()
            this.$emit('formula:submit', 'Enter')
        }
        if (event.key === 'Tab') {
            event.preventDefault()
            this.$emit('formula:submit', 'Tab')
        }
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }
}