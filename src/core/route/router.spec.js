/**
 * @jest-environment jsdom
 */
// or: "test": "jest --env=jsdom" at package.json

import {Router} from "@core/route/Router"
import {Page} from "@core/page/Page"

class DashboardPage extends Page {
    getRoot() {
        const root = document.createElement("div")
        root.innerHTML = 'dashboard'
        return root
    }
}
class ExcelPage extends Page {}

describe('Router:', () => {
    let router
    let $root = null

    beforeEach(() => {
        $root = document.createElement("div")
        router = new Router($root, {
            dashboard: DashboardPage,
            excel: ExcelPage
        })
    })

    test("shoud be defined", () => {
        expect(router).toBeDefined()
    })

    test("shoud render DB Page", () => {
        router.changePageHandler()
        // expect($root.innerHTML).toBe('<div>dashboard</div>')
        expect($root.innerHTML).toBe('<div class="loader"><div class="lds-dual-ring"></div></div>')
    })
})
