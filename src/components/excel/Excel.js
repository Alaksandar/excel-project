import {$} from "@core/dom";

export class Excel {
    constructor(selector, options) {
        this.$app = $(selector)
        this.components = options.components || []
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        // const $root = document.createElement('div')
        // $root.classList.add('excel')

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el)
            $el.html(component.toHTML())

            // DEBUG:
            // if(component.name) {
            //     window['c' + component.name] = component
            // }

            // console.log(`root $el from Excel`, $el)
            // console.log('component', component)

            $root.append($el)
            return component
        })

        return $root
    }

    render() {
        this.$app.append(this.getRoot())
        this.components.forEach(components => components.init())
    }
}