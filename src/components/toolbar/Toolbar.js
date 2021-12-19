import {ExcelComponent} from "@core/ExcelComponent";

export class Toolbar extends ExcelComponent {
    static className = 'excel__toolbar'

    constructor($root) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click']
        });

    }

    onClick() {
        console.log(`${this.name} click`)
    }

    toHTML() {
        return `
            <div class="toolbar-buttons">
                <button class="button-icon">
                    <i class="material-icons">format_bold</i>
                </button>
                <button class="button-icon">
                    <i class="material-icons">format_italic</i>
                </button>
                <button class="button-icon">
                    <i class="material-icons">format_underlined</i>
                </button>
                <button class="button-icon">
                    <i class="material-icons">format_color_text</i>
                </button>
                <button class="button-icon">
                    <i class="material-icons">format_align_left</i>
                </button>
                <button class="button-icon">
                    <i class="material-icons">format_align_center</i>
                </button>
                <button class="button-icon">
                    <i class="material-icons">format_align_right</i>
                </button>

            </div>
        `
    }
}