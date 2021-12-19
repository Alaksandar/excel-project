import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click']
        });

        // this.$root = $root
        // console.log('$root for Formula', $root)
    }

    onInput(e) {
        console.log('Formula root', this.$root)
        console.log('Formula onInput', e.target.textContent.trim())
    }

    onClick(e) {
        console.log('Formula onClick', e)
    }

    toHTML() {
        return `
            <div class="formula-info"><span>fx</span></div>
            <div class="formula-input" contenteditable spellcheck="false"></div>
        `
    }
}