import {ExcelComponent} from "@core/ExcelComponent";
import {defaultTableName} from "@/constants";
import * as action from "@/redux/actions";
import {$} from "@core/dom";

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        });
    }

    toHTML() {
        const title = this.store.getState().tableName || defaultTableName
        return `
            <input id="header" type="text" class="header-input" value="${title}">
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

    onInput(event) {
        const target = $(event.target)
        this.$dispatch(action.changeTitle(target.text()))
    }
}