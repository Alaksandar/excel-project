import {ExcelComponent} from '@core/ExcelComponent';
import {Toolbar} from "@/components/toolbar/Toolbar";

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root) {
        super($root);

        this.$root = $root
        console.log('$root for Formula', $root)
    }

    toHTML() {
        return `
            <div class="formula-info"><span>fx</span></div>
            <div class="formula-input" contenteditable spellcheck="false"></div>
        `
    }
}