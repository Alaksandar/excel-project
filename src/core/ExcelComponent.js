import {DOMListener} from "@core/DOMListener";

export class ExcelComponent extends DOMListener {
     constructor($root, options = {}) {
         super($root, options.listeners);
         this.name = options.name || ''
         // this.$root = $root
         // console.log('$root for ExcelComponent', $root)
     }

     init() {
         this.initDOMListeners()
     }

    toHTML() {
        return ``
    }
}

