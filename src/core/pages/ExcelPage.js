import {Page} from "@core/Page";
import {createStore} from "@core/store/createStore";
import {rootReducer} from "@/redux/rootReducer";
import {normalizeInitialState} from "@/redux/initialState";
import {debounce, storage} from "@core/utils";
import {Excel} from "@/components/excel/Excel";
import {Header} from "@/components/header/Header";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";

function createStorageName(param) {
    return 'excel:' + param
}

export class ExcelPage extends Page {
    constructor(param) {
        super(param);

        this.storeSub = null
    }


    getRoot() {
        const param = this.param ? this.param : Date.now().toString()
        const state = storage(createStorageName(param))
        const store = createStore(rootReducer, normalizeInitialState(state))
        const stateListener = debounce(state => {
            storage(createStorageName(param), state)
        }, 300)

        this.storeSub = store.subscribe(stateListener)

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store,
        })

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
        this.storeSub.unsubscribe()
    }
}
