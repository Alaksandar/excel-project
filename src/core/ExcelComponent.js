import {DOMListener} from "@core/DOMListener";

export class ExcelComponent extends DOMListener {
     constructor($root, options = {}) {
         super($root, options.listeners);
         this.name = options.name || ''

         // component preparation and supporting functionality
         this.prepare()
     }

     prepare() {}

     init() {
         this.initDOMListeners()
     }

    destroy() {
        this.removeDOMListeners()
    }

    // returns the component template
    toHTML() {
        return ``
    }
}

