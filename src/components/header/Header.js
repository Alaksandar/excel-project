import {ExcelComponent} from "@core/ExcelComponent";

export class Header extends ExcelComponent {
    static className = 'excel__header'
    // constructor($root) {
    //     super($root, {
    //         name: 'Header',
    //         listeners: ['input', 'submit', 'click']
    //     });
    // }

    toHTML() {
        return `
            <input type="text" class="header-input" value="Новая таблица">
            <div class="header-buttons">
                <button class="button-icon">
                    <i class="material-icons">delete</i>
                </button>
                <button class="button-icon">
                    <i class="material-icons">exit_to_app</i>
                </button>
            </div>
        `
    }
}