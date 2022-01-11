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

    text(text) {
        if (typeof text === 'string') {
            return this.$el.textContent = text.trim()
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }

    clear() {
        this.html('')
        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    node() {
        return this.$el
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
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

    id(parse) {
        if(parse) {
            const parsed = this.data.id.split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }

    focus() {
        this.$el.focus()
        return this
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