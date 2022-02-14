import {Page} from "@core/page/Page";
import {$} from "@core/dom";
import {createTableRecords} from "@/shared/dashboard.functions"

export class DashboardPage extends Page {
    getRoot() {
        const now = Date.now().toString()
        this.$root = $.create('div', 'dashboard').html(`
            <div class="dashboard__header">
                <h1>Excel</h1>
            </div>
    
            <div class="dashboard__new">
                <div class="dashboard__view">
                    <a href="#excel/${now}" class="new__create" data-create="newTable">
                        Новая <br> таблица
                    </a>
                </div>
            </div>
    
            <div class="dashboard__list dashboard__view">
                ${createTableRecords()}
            </div>
        `)
        return this.$root
    }

    afterRender() {}
}
