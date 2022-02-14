export class Page {
    constructor(params) {
        this.param = params[1] || Date.now().toString()
    }

    getRoot() {
        throw new Error('Method "getRoot" should be implemented')
    }

    afterRender() {}

    destroy() {}
}
