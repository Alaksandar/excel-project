class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.innerHTML.trim()
    }

    clear() {
        this.html('')
        return this
    }

    removeEl() {
        this.$el.remove()
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        // console.log('node', node)
        this.$el.append(node)
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    get data() {
        return this.$el.dataset
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    addClass(className) {
        return this.$el.classList.add(className)
    }

    removeClass(className) {
        return this.$el.classList.remove(className)
    }

    css(styles = {}) {
        Object.keys(styles)
            .forEach(key => {
                this.$el.style[key] = styles[key]
        })
        return this
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }


}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    classes ? el.classList.add(classes) : false
    return $(el)
}