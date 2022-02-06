export class Page {
    constructor(params) {
        this.param = params[1]
    }

    getRoot() {
        throw new Error('Method "getRoot" should be implemented')
    }

    afterRender() {}

    destroy() {}
}
