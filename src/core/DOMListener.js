import {capitalize} from "@core/utils";

export class DOMListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No root for DOMListener`)
        }
        this.$root = $root
        this.listeners = listeners

        // console.log('$root for DOMListener', $root)

    }

    initDOMListeners() {
        const name = this.name
        this.listeners.forEach(listener => {
            // console.log(`initDOMListeners: ${name} listener`, listener)
            const method = toMethodName(listener)
            // console.log('method', method)
            if(!this[method]) {
                throw new Error(
                    `Method ${method} is not implemented in ${name} Component`
                )
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    removeDOMListeners() {
        const name = this.name
        this.listeners.forEach(listener => {
            const method = toMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }

}

function toMethodName(eventName) {
    return 'on' + capitalize(eventName)
}
