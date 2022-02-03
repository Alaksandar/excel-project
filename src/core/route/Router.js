import {$} from "@core/dom";
import {ActiveRoute} from "@core/route/ActiveRoute";

export class Router {
    constructor(selector, routes) {
        if (!selector) throw new Error('Selector is not provided in Router')

        this.$placeholder = $(selector)
        this.routes = routes
        this.page = null

        this.pageHandler = this.pageHandler.bind(this)
        this.init()
    }

    init() {
        window.addEventListener("hashchange", this.pageHandler)
        this.pageHandler()
    }

    pageHandler() {
        if(this.page) this.page.destroy()
        this.$placeholder.clear()

        const Page = ActiveRoute.param[0].includes('excel')
            ? this.routes.excel
            : this.routes.dashboard
        this.page = new Page(ActiveRoute.param)
        this.$placeholder.append(this.page.getRoot())

        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener("hashchange", this.pageHandler)
    }
}