import {$} from "@core/dom";

export class Excel {
    constructor(selector, components) {
        this.$app = $(selector)
        this.components = components.components || []
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
        console.log('$app', this.$app)
        this.$app.append(this.getRoot())
        console.log('components', this.components)
        this.components.forEach(components => components.init())
    }
}