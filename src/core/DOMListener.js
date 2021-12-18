export class DOMListener {
    constructor($root) {
        if (!$root) {
            throw new Error(`No root for DOMListener`)
        }
        this.$root = $root
        console.log('$root for DOMListener', $root)

    }
}

