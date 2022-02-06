import {ExcelComponent} from "@core/ExcelComponent";
import {defaultTitle} from "@/constants";
import * as action from "@/redux/actions";
import {$} from "@core/dom";
import {debounce, removeStorage} from "@core/utils";
import {changeTitle} from "@/redux/actions";
import {ActiveRoute} from "@core/route/ActiveRoute";


export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        });
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return `
            <input id="title" type="text" class="header-input" value="${title}">
            <div class="header-buttons">
                <button class="button-icon" data-type="delete">
                    <i class="material-icons" data-type="delete">delete</i>
                </button>
                <button class="button-icon">
                    <i class="material-icons" data-type="exit">exit_to_app</i>                    
                </button>
            </div>
        `
    }

    onInput(event) {
        const target = $(event.target)
        this.$dispatch(changeTitle(target.text()))
    }

    onClick(event) {
        if ($(event.target).data.type === 'delete') {
            const deleteTableWarning = confirm("Действительно хотите удалить таблицу?")
            if (deleteTableWarning) {
                removeStorage('excel:' + ActiveRoute.param[1])
                ActiveRoute.navigate('')
            }
        } else if ($(event.target).data.type === 'exit') {
            ActiveRoute.navigate('')
        }
    }
}
