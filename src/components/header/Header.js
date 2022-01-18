import {ExcelComponent} from "@core/ExcelComponent";
import {defaultTableName} from "@/constants";
import * as action from "@/redux/actions";
import {$} from "@core/dom";
import {debounce} from "@core/utils";
import {changeTitle} from "@/redux/actions";

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        });
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }

    toHTML() {
        const title = this.store.getState().title || defaultTableName
        return `
            <input id="title" type="text" class="header-input" value="${title}">
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
        this.$dispatch(changeTitle(target.text()))
    }
}