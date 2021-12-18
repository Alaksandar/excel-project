import {$} from "@core/dom";

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
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
            // console.log('$el', $el)
            console.log(`root $el from Excel`, $el)
            console.log('component', component)

            $root.append($el)
            return component

        })

        return $root
    }

    render() {
        console.log('$el', this.$el)

        this.$el.append(this.getRoot())
        console.log('this.components', this.components)

    }
}